import { Injectable } from "@nestjs/common";
import { CreatorProfilesService } from "../content/creator-profiles.service";

@Injectable()
export class StripeConnectService {
  constructor(private readonly creatorProfilesService: CreatorProfilesService) {}

  async createStripeConnectAccount(creatorId: string, email: string) {
    const stripeAccountId = `acct_pending_${creatorId.replaceAll("-", "")}`;

    await this.creatorProfilesService.attachStripeAccount(creatorId, stripeAccountId);

    return {
      creatorId,
      email,
      stripeAccountId,
      onboardingStatus: "PENDING"
    };
  }

  async createStripeConnectAccountLink(
    creatorId: string,
    refreshUrl: string,
    returnUrl: string
  ) {
    const creator = await this.creatorProfilesService.getCreatorById(creatorId);

    return {
      creatorId,
      stripeAccountId: creator.stripeAccountId,
      url: `https://connect.stripe.com/express/onboarding/${creatorId}?refresh_url=${encodeURIComponent(
        refreshUrl
      )}&return_url=${encodeURIComponent(returnUrl)}`
    };
  }

  async updateOnboardingStatus(
    stripeAccountId: string,
    status: "NOT_STARTED" | "PENDING" | "COMPLETE" | "RESTRICTED"
  ) {
    return this.creatorProfilesService.updateStripeOnboardingStatus(stripeAccountId, status);
  }
}
