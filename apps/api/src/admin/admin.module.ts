import { Module } from "@nestjs/common";
import { CommerceModule } from "../commerce/commerce.module";
import { CommunityModule } from "../community/community.module";
import { ContentModule } from "../content/content.module";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AuditLogService } from "./audit-log.service";

@Module({
  imports: [ContentModule, CommerceModule, CommunityModule],
  controllers: [AdminController],
  providers: [AdminService, AuditLogService],
  exports: [AdminService, AuditLogService]
})
export class AdminModule {}
