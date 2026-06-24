import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PointsAdjustmentDto } from "../community/dto/points-adjustment.dto";
import { AdminService } from "./admin.service";
import { AuditLogService } from "./audit-log.service";
import { CreatorStatusDto, ProductStatusDto } from "./dto/admin-status.dto";

@ApiTags("admin")
@Controller("admin")
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly auditLogService: AuditLogService
  ) {}

  @Get("users")
  listUsers() {
    return this.adminService.listUsers();
  }

  @Get("creators")
  listCreators() {
    return this.adminService.listCreators();
  }

  @Patch("creators/:creatorId/status")
  moderateCreator(@Param("creatorId") creatorId: string, @Body() dto: CreatorStatusDto) {
    return this.adminService.moderateCreator(creatorId, dto);
  }

  @Get("products")
  listProducts() {
    return this.adminService.listProducts();
  }

  @Patch("products/:productId/status")
  moderateProduct(@Param("productId") productId: string, @Body() dto: ProductStatusDto) {
    return this.adminService.moderateProduct(productId, dto);
  }

  @Get("orders")
  listOrders() {
    return this.adminService.listOrders();
  }

  @Get("payments/:orderId")
  getPaymentStatus(@Param("orderId") orderId: string) {
    return this.adminService.getPaymentStatus(orderId);
  }

  @Get("referrals")
  listReferralAttribution() {
    return this.adminService.listReferralAttribution();
  }

  @Post("points/adjust")
  adjustPoints(@Body() dto: PointsAdjustmentDto) {
    return this.adminService.adjustPoints(dto);
  }

  @Get("revenue")
  revenueReports() {
    return this.adminService.revenueReports();
  }

  @Get("audit-logs")
  listAuditLogs() {
    return this.auditLogService.listAuditLogs();
  }
}
