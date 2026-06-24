import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class LeaderboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getLeaderboard() {
    return this.prisma.pointsBalance.findMany({
      orderBy: { balance: "desc" },
      take: 100,
      include: { user: true }
    });
  }
}
