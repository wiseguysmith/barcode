import { Processor, WorkerHost } from "@nestjs/bullmq";
import type { Job } from "bullmq";
import { STRIPE_EVENTS_QUEUE } from "../../common/queues";
import { StripeWebhookService } from "../../commerce/stripe-webhook.service";

type StripeEventJob = {
  stripeEventId: string;
};

@Processor(STRIPE_EVENTS_QUEUE)
export class StripeEventsProcessor extends WorkerHost {
  constructor(private readonly stripeWebhookService: StripeWebhookService) {
    super();
  }

  async process(job: Job<StripeEventJob>) {
    return this.stripeWebhookService.processQueuedStripeEvent(job.data.stripeEventId);
  }
}
