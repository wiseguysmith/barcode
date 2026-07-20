import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreatorProfilesService } from "../content/creator-profiles.service";
import { ProductsService } from "../content/products.service";
import { OrdersService } from "../commerce/orders.service";
import { PointsLedgerService } from "../community/points-ledger.service";
import { PrismaService } from "../database/prisma.service";
import { AuditLogService } from "./audit-log.service";
import type {
  AdminPointsAdjustmentDto,
  CreatorStatusDto,
  ProductStatusDto
} from "./dto/admin-status.dto";

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly creatorProfilesService: CreatorProfilesService,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
    private readonly pointsLedgerService: PointsLedgerService,
    private readonly auditLogService: AuditLogService
  ) {}

  async listUsers() {
    return this.prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 200
    });
  }

  async listCreators() {
    return this.prisma.creatorProfile.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      include: { user: true }
    });
  }

  async moderateCreator(creatorId: string, dto: CreatorStatusDto, adminUserId: string) {
    const before = await this.creatorProfilesService.getCreatorById(creatorId);
    const after =
      dto.status === "APPROVED"
        ? await this.creatorProfilesService.approveCreatorProfile(creatorId)
        : await this.creatorProfilesService.suspendCreatorProfile(creatorId);

    await this.auditLogService.auditAction({
      adminUserId,
      action: `creator.${dto.status.toLowerCase()}`,
      entityType: "creator_profile",
      entityId: creatorId,
      beforeJson: toAuditJson(before),
      afterJson: toAuditJson(after),
      ...(dto.reason ? { reason: dto.reason } : {})
    });

    return after;
  }

  async listProducts() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      include: { creator: true }
    });
  }

  async moderateProduct(productId: string, dto: ProductStatusDto, adminUserId: string) {
    const before = await this.prisma.product.findUniqueOrThrow({
      where: { id: productId }
    });
    const after = await this.productsService.moderateProduct(productId, dto.status);

    await this.auditLogService.auditAction({
      adminUserId,
      action: `product.${dto.status.toLowerCase()}`,
      entityType: "product",
      entityId: productId,
      beforeJson: toAuditJson(before),
      afterJson: toAuditJson(after),
      ...(dto.reason ? { reason: dto.reason } : {})
    });

    return after;
  }

  async listOrders() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      include: { product: true, creator: true, attribution: true }
    });
  }

  async getPaymentStatus(orderId: string) {
    return this.ordersService.getOrder(orderId);
  }

  async listReferralAttribution() {
    return this.prisma.attribution.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      include: { referral: true, orders: true }
    });
  }

  async adjustPoints(dto: AdminPointsAdjustmentDto, adminUserId: string) {
    const auditLog = await this.auditLogService.auditAction({
      adminUserId,
      action: "points.adjust",
      entityType: "user",
      entityId: dto.userId,
      afterJson: {
        delta: dto.delta,
        reason: dto.reason
      },
      reason: dto.reason
    });

    return this.pointsLedgerService.addPointsLedgerEntry({
      ...dto,
      sourceId: auditLog.id,
      createdBy: adminUserId
    });
  }

  async revenueReports() {
    return this.prisma.order.aggregate({
      where: { status: "PAID" },
      _sum: {
        amountCents: true,
        platformFeeCents: true,
        creatorAmountCents: true
      },
      _count: { id: true }
    });
  }
}

function toAuditJson(value: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}
