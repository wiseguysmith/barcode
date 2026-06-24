# CommerceModule

Owns checkout, orders, Stripe Connect status, and payment event processing.

## Public Interface

- `createStripeConnectAccount`
- `createStripeConnectAccountLink`
- `createCheckoutSession`
- `handleStripeEventQueued`
- `getOrderAccess`
- `getCreatorSalesStats`

## Rules

- Use Stripe Connect Express.
- Use `application_fee_amount`.
- Queue webhook processing through BullMQ.
- Do not grant access until payment is confirmed.
