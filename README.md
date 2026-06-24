# Barcode DAO

Barcode DAO is a creator distribution engine for digital products. The V1 scope is deliberately off-chain: creator profiles, paid product delivery, Stripe Connect payouts, referral attribution, missions, points, and admin review workflows.

## Apps

- `apps/web`: Next.js App Router frontend.
- `apps/api`: NestJS modular monolith API.

## Packages

- `packages/database`: Prisma schema and migrations.
- `packages/shared`: shared DTO-adjacent types, constants, and pure business rules.

## Local Services

```bash
docker compose up -d
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm dev
```

## V1 Boundaries

Do not add token logic, DAO governance, NFTs, treasury systems, on-chain reputation, revenue-sharing tokens, or investment features. Future extension points may be scaffolded only when they do not affect V1 behavior.
