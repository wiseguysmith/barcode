import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "../common/auth.guard";
import { SessionUser } from "../common/session-user.decorator";
import { CreateMissionDto } from "./dto/create-mission.dto";
import { CreateReferralDto } from "./dto/create-referral.dto";
import { TrackAttributionDto } from "./dto/track-attribution.dto";
import { LeaderboardService } from "./leaderboard.service";
import { MissionsService } from "./missions.service";
import { PointsLedgerService } from "./points-ledger.service";
import { ReferralsService } from "./referrals.service";

@ApiTags("community")
@Controller()
export class CommunityController {
  constructor(
    private readonly referralsService: ReferralsService,
    private readonly missionsService: MissionsService,
    private readonly pointsLedgerService: PointsLedgerService,
    private readonly leaderboardService: LeaderboardService
  ) {}

  @Post("referrals")
  createReferral(@Body() dto: CreateReferralDto) {
    return this.referralsService.createReferral(dto);
  }

  @Public()
  @Post("attribution/track")
  trackAttribution(@Body() dto: TrackAttributionDto) {
    return this.referralsService.resolveAttribution(dto);
  }

  @Public()
  @Get("missions")
  listMissions() {
    return this.missionsService.listActiveMissions();
  }

  @Post("missions")
  createMission(@Body() dto: CreateMissionDto) {
    return this.missionsService.createMission(dto);
  }

  @Post("missions/:missionId/complete")
  completeMission(
    @Param("missionId") missionId: string,
    @SessionUser() { userId }: { userId: string }
  ) {
    return this.missionsService.completeMission(missionId, userId);
  }

  @Get("points/me/ledger")
  getMyPointsLedger(@SessionUser() { userId }: { userId: string }) {
    return this.pointsLedgerService.searchLedger(userId);
  }

  @Get("points/ledger")
  searchPointsLedger(@Query("userId") userId?: string) {
    return this.pointsLedgerService.searchLedger(userId);
  }

  @Public()
  @Get("leaderboard")
  getLeaderboard() {
    return this.leaderboardService.getLeaderboard();
  }
}
