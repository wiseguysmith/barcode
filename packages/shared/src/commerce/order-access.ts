import type { PaidOrderAccessInput } from "../types/commerce";

export function canAccessPaidContent(input: PaidOrderAccessInput): boolean {
  return (
    input.orderStatus === "PAID" &&
    input.orderBuyerUserId === input.requesterUserId &&
    input.orderProductId === input.requestedProductId
  );
}
