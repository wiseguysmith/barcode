import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import type { CreateMissionDto } from "./dto/create-mission.dto";

@Injectable()
export class MissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async createMission(dto: CreateMissionDto) {
    return this.prisma.mission.create({
      data: {
        title: dto.title,
        description: dto.description,
        pointsReward: dto.pointsReward,
        createdBy: dto.createdBy,
        status: "DRAFT"
      }
    });
  }

  async listActiveMissions() {
    return this.prisma.mission.findMany({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "desc" }
    });
  }

  async completeMission(missionId: string, userId: string) {
    return this.prisma.missionCompletion.create({
      data: {
        missionId,
        userId,
        status: "PENDING"
      }
    });
  }
}
