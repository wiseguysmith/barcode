import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import type { Queue } from "bullmq";
import { Prisma } from "@prisma/client";
import { STRIPE_EVENTS_QUEUE } from "../common/queues";
import { PrismaService } from "../database/prisma.service";
import { OrdersService } from "./orders.service";
import { StripeConnectService } from "./stripe-connect.service";

type StripeEventPayload = {
  id: string;
  type: string;
  data: {
    object: Record<string, unknown>;
  };
};

@Injectable()
export class StripeWebhookService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ordersService: OrdersService,
    private readonly stripeConnectService: StripeConnectService,
    @InjectQueue(STRIPE_EVENTS_QUEUE) private readonly stripeEventsQueue: Queue
  ) {}

  async enqueueStripeEvent(event: StripeEventPayload) {
    const stripeEvent = await this.prisma.stripeEvent.upsert({
      where: { stripeEventId: event.id },
      create: {
        stripeEventId: event.id,
        eventType: event.type,
        payloadJson: event as unknown as Prisma.InputJsonValue
      },
      update: {
        eventType: event.type,
        payloadJson: event as unknown as Prisma.InputJsonValue,
        processingStatus: "PENDING"
      }
    });

    await this.stripeEventsQueue.add("process", { stripeEventId: stripeEvent.id });

    return { queued: true, stripeEventId: stripeEvent.id };
  }

  async processQueuedStripeEvent(stripeEventId: string) {
    const stripeEvent = await this.prisma.stripeEvent.findUniqueOrThrow({
      where: { id: stripeEventId }
    });
    const payload = stripeEvent.payloadJson as StripeEventPayload;

    if (payload.type === "checkout.session.completed") {
      await this.ordersService.markCheckoutSessionPaid(
        String(payload.data.object.id),
        typeof payload.data.object.payment_intent === "string"
          ? payload.data.object.payment_intent
          : null
      );
    }

    if (payload.type === "payment_intent.payment_failed") {
      const metadata = payload.data.object.metadata;
      const checkoutSessionId =
        metadata && typeof metadata === "object" && "checkout_session_id" in metadata
          ? metadata.checkout_session_id
          : null;

      if (typeof checkoutSessionId === "string") {
        await this.ordersService.markCheckoutSessionFailed(checkoutSessionId);
      }
    }

    if (payload.type === "account.updated") {
      const accountId = String(payload.data.object.id);
      const chargesEnabled = Boolean(payload.data.object.charges_enabled);
      const payoutsEnabled = Boolean(payload.data.object.payouts_enabled);
      const status = chargesEnabled && payoutsEnabled ? "COMPLETE" : "RESTRICTED";
      await this.stripeConnectService.updateOnboardingStatus(accountId, status);
    }

    return this.prisma.stripeEvent.update({
      where: { id: stripeEventId },
      data: {
        processingStatus: "PROCESSED",
        processedAt: new Date()
      }
    });
  }
}
