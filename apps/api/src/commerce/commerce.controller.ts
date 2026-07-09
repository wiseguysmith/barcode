import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "../common/auth.guard";
import { SessionUser } from "../common/session-user.decorator";
import { CheckoutService } from "./checkout.service";
import { CreateCheckoutSessionDto } from "./dto/create-checkout-session.dto";
import { CreateConnectAccountDto, CreateConnectAccountLinkDto } from "./dto/connect-account.dto";
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
  createCheckoutSession(
    @Body() dto: CreateCheckoutSessionDto,
    @SessionUser() { userId }: { userId: string }
  ) {
    return this.checkoutService.createCheckoutSession({ ...dto, buyerUserId: userId });
  }

  @Get("orders/me")
  listMyOrders(@SessionUser() { userId }: { userId: string }) {
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

  @Get("creators/:creatorId/orders")
  getCreatorOrders(@Param("creatorId") creatorId: string) {
    return this.ordersService.getCreatorOrders(creatorId);
  }

  @Public()
  @Get("checkout/confirm")
  async confirmCheckout(@Query() query: { sessionId: string; orderId: string }) {
    // Mock confirmation — in real flow, this comes from Stripe webhook
    // For testing, hitting this URL marks the order as PAID
    await this.ordersService.markCheckoutSessionPaid(query.sessionId, `pi_mock_${query.orderId}`);
    return { success: true, message: "Payment confirmed", orderId: query.orderId };
  }

  @Public()
  @Post("webhooks/stripe")
  enqueueStripeWebhook(
    @Body() event: { id: string; type: string; data: { object: Record<string, unknown> } }
  ) {
    return this.stripeWebhookService.enqueueStripeEvent(event);
  }
}
