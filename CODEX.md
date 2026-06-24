# Barcode DAO Build Instructions

Barcode DAO is a creator distribution engine. V1 helps creators sign up, create public profiles, upload digital products, sell through Stripe Connect, and keep 85% of revenue while Barcode captures a 15% platform fee.

Community members can discover creators, support creators, complete missions, and earn reputation points. Points have no monetary value in V1.

Do not build DAO voting, token rewards, NFTs, treasury systems, on-chain rewards, equity, investment features, or any token conversion logic in V1.

## Build Priority

1. Auth
2. Creator profile
3. Public creator page
4. Product upload
5. Stripe Connect onboarding
6. Checkout with 85/15 split
7. Order history
8. Creator sales dashboard
9. Community referral tracking
10. Admin dashboard
11. Missions
12. Points ledger
13. Leaderboard

## Architecture

Use a NestJS modular monolith and a Next.js App Router frontend.

Backend modules:

- IdentityModule
- CommerceModule
- ContentModule
- CommunityModule
- AdminModule

Each module exposes a public service interface. Modules must not directly manipulate another module's tables.

## Core Rules

- A user has one canonical `User` record and many `AuthMethod` records.
- Wallet auth is scaffolded but inactive until requested.
- Paid content is private and served through signed expiring URLs.
- Stripe Connect Express is required.
- Use `application_fee_amount` for Barcode's 15% platform fee.
- Stripe webhooks are validated in request handlers and processed in BullMQ jobs.
- Points use an append-only ledger and rebuildable balances.
- Admin actions affecting money, access, or points are audit logged.
- V1 must track direct sales, referral sales, and community-referred sales.
