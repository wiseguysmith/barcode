import { describe, expect, it } from "vitest";
import { canAccessPaidContent } from "../src";

describe("canAccessPaidContent", () => {
  it("allows the paid buyer to access the purchased product", () => {
    expect(
      canAccessPaidContent({
        orderBuyerUserId: "user_1",
        requesterUserId: "user_1",
        orderProductId: "product_1",
        requestedProductId: "product_1",
        orderStatus: "PAID"
      })
    ).toBe(true);
  });

  it("blocks unpaid orders", () => {
    expect(
      canAccessPaidContent({
        orderBuyerUserId: "user_1",
        requesterUserId: "user_1",
        orderProductId: "product_1",
        requestedProductId: "product_1",
        orderStatus: "PENDING"
      })
    ).toBe(false);
  });
});
