import { describe, expect, it } from "vitest";
import { calculatePaymentSplit } from "../src";

describe("calculatePaymentSplit", () => {
  it("splits 1000 cents into 150 platform cents and 850 creator cents", () => {
    expect(calculatePaymentSplit(1000)).toEqual({
      amountCents: 1000,
      platformFeeCents: 150,
      creatorAmountCents: 850,
      platformFeeBasisPoints: 1500
    });
  });

  it("rounds the platform fee down for uneven cents", () => {
    expect(calculatePaymentSplit(999)).toMatchObject({
      platformFeeCents: 149,
      creatorAmountCents: 850
    });
  });
});
