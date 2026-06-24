export type ReferralSourceType = "DIRECT" | "CREATOR_LINK" | "COMMUNITY_REFERRAL";

export type PointsLedgerReplayEntry = {
  userId: string;
  delta: number;
};

export type PointsLedgerRequiredFields = {
  userId: string;
  delta: number;
  reason: string;
  sourceId: string;
  createdBy: string;
  createdAt: Date;
};

export type AttributionInput = {
  referralCode?: string | null;
  referrerUserId?: string | null;
  creatorId?: string | null;
};
