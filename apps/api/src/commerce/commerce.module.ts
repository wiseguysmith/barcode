import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { STRIPE_EVENTS_QUEUE } from "../common/queues";
import { redisConnectionFromUrl } from "../common/redis";
import { ContentModule } from "../content/content.module";
import { CheckoutService } from "./checkout.service";
import { CommerceController } from "./commerce.controller";
import { OrdersService } from "./orders.service";
import { StripeConnectService } from "./stripe-connect.service";
import { StripeWebhookService } from "./stripe-webhook.service";

@Module({
  imports: [
    ContentModule,
    BullModule.registerQueue({
      name: STRIPE_EVENTS_QUEUE,
      connection: redisConnectionFromUrl(process.env.REDIS_URL ?? "redis://localhost:6379")
    })
  ],
  controllers: [CommerceController],
  providers: [CheckoutService, OrdersService, StripeConnectService, StripeWebhookService],
  exports: [CheckoutService, OrdersService, StripeConnectService, StripeWebhookService]
})
export class CommerceModule {}
