import { Body, Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CheckoutService } from "./checkout.service";
import { CreateCheckoutSessionDto } from "./dto/create-checkout-session.dto";
import {
  CreateConnectAccountDto,
  CreateConnectAccountLinkDto
} from "./dto/connect-account.dto";
import { OrdersService } from "./orders.service";
import { StripeConnectService } from "./stripe-connect.service";
import { StripeWebhookService } from "./stripe-webhook.service";

@ApiTags("commerce")
@Controller()
export class CommerceController {
  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly ordersService: OrdersService,
    private readonly stripeConnectService: StripeConnectService,
    private readonly stripeWebhookService: StripeWebhookService
  ) {}

  @Post("stripe/connect/account")
  createConnectAccount(@Body() dto: CreateConnectAccountDto) {
    return this.stripeConnectService.createStripeConnectAccount(dto.creatorId, dto.email);
  }

  @Post("stripe/connect/account-link")
  createConnectAccountLink(@Body() dto: CreateConnectAccountLinkDto) {
    return this.stripeConnectService.createStripeConnectAccountLink(
      dto.creatorId,
      dto.refreshUrl,
      dto.returnUrl
    );
  }

  @Post("checkout/sessions")
  createCheckoutSession(@Body() dto: CreateCheckoutSessionDto) {
    return this.checkoutService.createCheckoutSession(dto);
  }

  @Get("orders/me")
  listMyOrders(@Headers("x-user-id") userId: string) {
    return this.ordersService.listOrdersForUser(userId);
  }

  @Get("orders/:orderId")
  getOrder(@Param("orderId") orderId: string) {
    return this.ordersService.getOrder(orderId);
  }

  @Get("creators/:creatorId/sales-stats")
  getCreatorSalesStats(@Param("creatorId") creatorId: string) {
    return this.ordersService.getCreatorSalesStats(creatorId);
  }

  @Post("webhooks/stripe")
  enqueueStripeWebhook(@Body() event: { id: string; type: string; data: { object: Record<string, unknown> } }) {
    return this.stripeWebhookService.enqueueStripeEvent(event);
  }
}
