export type OrderStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export type PaidOrderAccessInput = {
  orderBuyerUserId: string | null;
  requesterUserId: string;
  orderProductId: string;
  requestedProductId: string;
  orderStatus: OrderStatus;
};

export type PaymentSplit = {
  amountCents: number;
  platformFeeCents: number;
  creatorAmountCents: number;
  platformFeeBasisPoints: number;
};
