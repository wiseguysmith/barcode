import { describe, expect, it } from "vitest";
import { assertValidPointsLedgerEntry, replayPointsBalance } from "../src";

describe("points ledger", () => {
  it("replays a balance from append-only entries", () => {
    expect(
      replayPointsBalance(
        [
          { userId: "user_1", delta: 100 },
          { userId: "user_1", delta: -25 },
          { userId: "user_2", delta: 500 }
        ],
        "user_1"
      )
    ).toBe(75);
  });

  it("requires source metadata for adjustments", () => {
    expect(() =>
      assertValidPointsLedgerEntry({
        userId: "user_1",
        delta: -10,
        reason: "admin_adjustment",
        sourceId: "audit_1",
        createdBy: "admin_1",
        createdAt: new Date()
      })
    ).not.toThrow();
  });
});
