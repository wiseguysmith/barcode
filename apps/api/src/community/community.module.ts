import { Module } from "@nestjs/common";
import { CommunityController } from "./community.controller";
import { LeaderboardService } from "./leaderboard.service";
import { MissionsService } from "./missions.service";
import { PointsLedgerService } from "./points-ledger.service";
import { ReferralsService } from "./referrals.service";

@Module({
  controllers: [CommunityController],
  providers: [ReferralsService, MissionsService, PointsLedgerService, LeaderboardService],
  exports: [ReferralsService, MissionsService, PointsLedgerService, LeaderboardService]
})
export class CommunityModule {}
