# Architecture

Barcode DAO uses a modular monolith API so a small team can move quickly without losing ownership boundaries.

## Module Boundaries

Modules communicate through public services and DTOs. A module may write its own tables only. Cross-module operations are exposed as methods on public service interfaces.

## Modules

- Identity: users, auth methods, account status.
- Content: creator profiles, products, files, content access.
- Commerce: Stripe Connect, checkout, orders, payment events.
- Community: referrals, attribution, missions, points, leaderboard.
- Admin: moderation, audit logs, reports, admin points adjustments.

## Data Flow

1. Identity creates the canonical user.
2. Content creates and publishes creator profiles and products.
3. Commerce checks product eligibility through Content public services.
4. Commerce creates Stripe Checkout Sessions with Connect application fees.
5. Stripe webhooks are queued, then processed by workers.
6. Community resolves referral attribution and writes points ledger entries.
7. Admin actions go through audit logging before state changes.
