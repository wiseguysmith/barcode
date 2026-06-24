# Payments

Barcode DAO uses Stripe Connect Express. Barcode does not custody creator funds directly.

## Checkout Split

- Creator share: 85%
- Barcode platform fee: 15%
- Stripe mechanism: `application_fee_amount`

The platform fee is calculated with integer cents and rounded down so the platform never takes more than 15%.

## Webhook Processing

Webhook request handlers only verify Stripe signatures, store the raw event, and enqueue a BullMQ job. Payment state changes are processed by workers.

Events to handle first:

- `checkout.session.completed`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `charge.refunded`
- `account.updated`
