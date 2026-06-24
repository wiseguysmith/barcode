import {
  BASIS_POINTS_DENOMINATOR,
  PLATFORM_FEE_BASIS_POINTS
} from "../constants/platform";
import type { PaymentSplit } from "../types/commerce";

export function calculatePaymentSplit(
  amountCents: number,
  platformFeeBasisPoints = PLATFORM_FEE_BASIS_POINTS
): PaymentSplit {
  if (!Number.isInteger(amountCents) || amountCents < 0) {
    throw new Error("amountCents must be a non-negative integer");
  }

  if (
    !Number.isInteger(platformFeeBasisPoints) ||
    platformFeeBasisPoints < 0 ||
    platformFeeBasisPoints > BASIS_POINTS_DENOMINATOR
  ) {
    throw new Error("platformFeeBasisPoints must be between 0 and 10000");
  }

  const platformFeeCents = Math.floor(
    (amountCents * platformFeeBasisPoints) / BASIS_POINTS_DENOMINATOR
  );

  return {
    amountCents,
    platformFeeCents,
    creatorAmountCents: amountCents - platformFeeCents,
    platformFeeBasisPoints
  };
}
