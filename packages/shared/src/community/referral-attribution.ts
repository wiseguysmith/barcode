import type { AttributionInput, ReferralSourceType } from "../types/community";

export function resolveReferralSource(input: AttributionInput): ReferralSourceType {
  if (input.referralCode && input.referrerUserId) {
    return "COMMUNITY_REFERRAL";
  }

  if (input.referralCode || input.creatorId) {
    return "CREATOR_LINK";
  }

  return "DIRECT";
}
