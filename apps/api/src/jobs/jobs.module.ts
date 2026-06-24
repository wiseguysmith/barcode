import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { STRIPE_EVENTS_QUEUE } from "../common/queues";
import { CommerceModule } from "../commerce/commerce.module";
import { StripeEventsProcessor } from "./queues/stripe-events.processor";

@Module({
  imports: [
    CommerceModule,
    BullModule.forRoot({
      connection: { url: process.env.REDIS_URL ?? "redis://localhost:6379" } as never
    }),
    BullModule.registerQueue({ name: STRIPE_EVENTS_QUEUE })
  ],
  providers: [StripeEventsProcessor]
})
export class JobsModule {}
