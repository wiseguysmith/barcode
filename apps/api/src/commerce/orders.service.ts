import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async listOrdersForUser(userId: string) {
    return this.prisma.order.findMany({
      where: { buyerUserId: userId },
      orderBy: { createdAt: "desc" },
      include: { product: true }
    });
  }

  async getOrder(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { product: true, creator: true, attribution: true }
    });

    if (!order) throw new NotFoundException("Order not found");
    return order;
  }

  async markCheckoutSessionPaid(
    stripeCheckoutSessionId: string,
    stripePaymentIntentId: string | null
  ) {
    return this.prisma.order.update({
      where: { stripeCheckoutSessionId },
      data: {
        status: "PAID",
        stripePaymentIntentId,
        paidAt: new Date()
      }
    });
  }

  async markCheckoutSessionFailed(stripeCheckoutSessionId: string) {
    return this.prisma.order.update({
      where: { stripeCheckoutSessionId },
      data: { status: "FAILED" }
    });
  }

  async getCreatorSalesStats(creatorId: string) {
    const grouped = await this.prisma.order.groupBy({
      by: ["status"],
      where: { creatorId },
      _count: { id: true },
      _sum: {
        amountCents: true,
        platformFeeCents: true,
        creatorAmountCents: true
      }
    });

    const paidOrders = await this.prisma.order.findMany({
      where: { creatorId, status: "PAID" },
      include: { attribution: true }
    });

    const directSales = paidOrders.filter(
      (order) => order.attribution?.sourceType === "DIRECT" || !order.attribution
    ).length;
    const communityReferredSales = paidOrders.filter(
      (order) => order.attribution?.sourceType === "COMMUNITY_REFERRAL"
    ).length;

    return {
      grouped,
      directSales,
      communityReferredSales
    };
  }
}
