import { describe, expect, it } from "vitest";
import { resolveReferralSource } from "../src";

describe("resolveReferralSource", () => {
  it("identifies direct sales", () => {
    expect(resolveReferralSource({})).toBe("DIRECT");
  });

  it("identifies creator link sales", () => {
    expect(resolveReferralSource({ referralCode: "creator_abc" })).toBe("CREATOR_LINK");
  });

  it("identifies community referral sales", () => {
    expect(
      resolveReferralSource({
        referralCode: "community_abc",
        referrerUserId: "user_1"
      })
    ).toBe("COMMUNITY_REFERRAL");
  });
});
