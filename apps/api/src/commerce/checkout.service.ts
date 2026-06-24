import { Injectable } from "@nestjs/common";
import { calculatePaymentSplit } from "@barcode/shared";
import { randomUUID } from "node:crypto";
import { PrismaService } from "../database/prisma.service";
import { ProductsService } from "../content/products.service";
import type { CreateCheckoutSessionDto } from "./dto/create-checkout-session.dto";

@Injectable()
export class CheckoutService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productsService: ProductsService
  ) {}

  async createCheckoutSession(dto: CreateCheckoutSessionDto) {
    const product = await this.productsService.getProductForCheckout(dto.productId);
    const split = calculatePaymentSplit(product.priceCents);
    const stripeCheckoutSessionId = `cs_pending_${randomUUID()}`;

    const order = await this.prisma.order.create({
      data: {
        productId: product.id,
        creatorId: product.creatorId,
        stripeCheckoutSessionId,
        amountCents: split.amountCents,
        platformFeeCents: split.platformFeeCents,
        creatorAmountCents: split.creatorAmountCents,
        currency: product.currency,
        status: "PENDING",
        ...(dto.buyerUserId ? { buyerUserId: dto.buyerUserId } : {}),
        ...(dto.attributionId ? { attributionId: dto.attributionId } : {})
      }
    });

    return {
      orderId: order.id,
      checkoutSessionId: stripeCheckoutSessionId,
      checkoutUrl: `https://checkout.stripe.com/pay/${stripeCheckoutSessionId}`,
      split
    };
  }
}
