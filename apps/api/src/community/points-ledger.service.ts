import { BadRequestException, Injectable } from "@nestjs/common";
import { assertValidPointsLedgerEntry } from "@barcode/shared";
import { PrismaService } from "../database/prisma.service";
import type { PointsAdjustmentDto } from "./dto/points-adjustment.dto";

@Injectable()
export class PointsLedgerService {
  constructor(private readonly prisma: PrismaService) {}

  async addPointsLedgerEntry(dto: PointsAdjustmentDto) {
    try {
      assertValidPointsLedgerEntry({
        ...dto,
        createdAt: new Date()
      });
    } catch (error) {
      throw new BadRequestException(error instanceof Error ? error.message : "Invalid points entry");
    }

    const entry = await this.prisma.pointsLedgerEntry.create({
      data: {
        userId: dto.userId,
        delta: dto.delta,
        reason: dto.reason,
        sourceId: dto.sourceId,
        createdBy: dto.createdBy
      }
    });

    await this.prisma.pointsBalance.upsert({
      where: { userId: dto.userId },
      create: {
        userId: dto.userId,
        balance: dto.delta
      },
      update: {
        balance: { increment: dto.delta }
      }
    });

    return entry;
  }

  async rebuildPointsBalance(userId: string) {
    const aggregate = await this.prisma.pointsLedgerEntry.aggregate({
      where: { userId },
      _sum: { delta: true }
    });

    return this.prisma.pointsBalance.upsert({
      where: { userId },
      create: {
        userId,
        balance: aggregate._sum.delta ?? 0,
        rebuiltAt: new Date()
      },
      update: {
        balance: aggregate._sum.delta ?? 0,
        rebuiltAt: new Date()
      }
    });
  }

  async searchLedger(userId?: string) {
    return this.prisma.pointsLedgerEntry.findMany({
      where: userId ? { userId } : {},
      orderBy: { createdAt: "desc" },
      take: 100
    });
  }
}
