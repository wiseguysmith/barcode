import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../database/prisma.service";

type AuditActionInput = {
  adminUserId: string;
  action: string;
  entityType: string;
  entityId: string;
  beforeJson?: Prisma.InputJsonValue;
  afterJson?: Prisma.InputJsonValue;
  reason?: string;
};

@Injectable()
export class AuditLogService {
  constructor(private readonly prisma: PrismaService) {}

  async auditAction(input: AuditActionInput) {
    return this.prisma.adminAuditLog.create({
      data: {
        adminUserId: input.adminUserId,
        action: input.action,
        entityType: input.entityType,
        entityId: input.entityId,
        ...(input.beforeJson ? { beforeJson: input.beforeJson } : {}),
        ...(input.afterJson ? { afterJson: input.afterJson } : {}),
        ...(input.reason ? { reason: input.reason } : {})
      }
    });
  }

  async listAuditLogs() {
    return this.prisma.adminAuditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 200
    });
  }
}
