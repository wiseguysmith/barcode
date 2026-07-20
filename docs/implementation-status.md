# Implementation Status

Last verified against actual code on 2026-07-13. Do not trust older status notes below this line without re-checking the code — this file has drifted from reality before.

## What Is Actually Real (verified by reading the code, not inferred)

- **Database schema** (`packages/database/prisma/schema.prisma`) — complete for all V1 entities. Not a blocker for anything below.
- **Auth** — real. Session-based (not JWT), `express-session` + `connect-redis`, bcrypt password hashing (12 rounds), signup/signin/signout all working against the database. Global `AuthGuard` blocks all routes except those marked `@Public()`.
- **Community/points/referral logic** — real. `CommunityModule` (referrals, attribution, missions, points ledger, leaderboard) does genuine Prisma reads/writes. No mocking needed here since there's no third-party dependency.
- **Product upload** — real end to end. `POST /products/upload` saves the file and creates the DB rows. Frontend `dashboard/products/create` calls it correctly.
- **Sales dashboard / order history** — real. `dashboard/sales`, `library`, `library/orders/[orderId]` all call working endpoints backed by real data.
- **Payment split math** (`packages/shared/src/commerce/payment-split.ts`) — real, tested, correct.

## What Is Mocked and Must Become Real

### 1. Stripe — currently 100% fake, zero SDK usage anywhere in `apps/api`

- `apps/api/src/commerce/stripe-connect.service.ts` — `createStripeConnectAccount` generates a string `acct_pending_${creatorId}`. Does not call Stripe.
- Same file, `createStripeConnectAccountLink` — hand-builds a URL string, never asks Stripe for a real onboarding link.
- `apps/api/src/commerce/checkout.service.ts` — `createCheckoutSession` creates an `Order` row with a fake `cs_test_${randomUUID()}` session ID. The `checkoutUrl` returned points back at our own `/api/checkout/confirm`, not Stripe.
- `apps/api/src/commerce/commerce.controller.ts` — `GET /checkout/confirm` is explicitly commented as a test-only endpoint: hitting it marks any order PAID with no payment having happened. **Remove or lock this down before Stripe is wired for real** — right now anyone can mark any order as paid by hitting this URL.
- `POST /webhooks/stripe` — accepts any POST body, no `stripe.webhooks.constructEvent()` signature check. Spoofable.

**Task:** Install `stripe` SDK usage (package is already in `package.json`, just unused). Replace the four items above with real Stripe Connect Express account creation, real Account Link generation, real Checkout Session creation with `application_fee_amount` set to the platform fee, and real webhook signature verification using `STRIPE_WEBHOOK_SECRET`. Requires real Stripe test API keys in `.env` (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`) before this can be built or tested.

### 2. File storage — currently local disk only

- `apps/api/src/storage/storage.service.ts` — writes uploaded files to `.storage/` on the API server's local filesystem. Will not survive a redeploy and does not scale.
- `createSignedReadUrl` returns a fake token: `` `/api/files/${key}?expires=...&token=mock_${randomUUID()}` `` — the token is never verified by anything. Any guessed/leaked storage key is downloadable forever.

**Task:** Swap for Cloudflare R2 (S3-compatible SDK). Requires real R2 credentials (`R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`) in `.env`. Implement real time-limited signed URLs (S3 `getSignedUrl` equivalent) so download links actually expire and are actually verified.

### 3. Missing entirely — no code exists

- **Email verification.** `AuthMethod.verifiedAt` field exists in the schema but nothing ever sets it. No verification email, no token, no confirm endpoint.
- **Password reset.** No endpoint, no service method, nothing.

## Security Gap — Fixed In Current Local Changes

`apps/api/src/admin/admin.controller.ts` is now protected with `@Roles("ADMIN")`, backed by `apps/api/src/common/roles.guard.ts`.

The same local change removes client-supplied `adminUserId` / `createdBy` from admin moderation and point-adjustment requests. Those actions now use the signed-in session user for audit logs and ledger entries.

## Frontend — Wired vs. Static Mockup

**Actually calls the API (real):** `auth/sign-in`, `auth/sign-up`, `dashboard/products/create`, `dashboard/products`, `dashboard/sales`, `library`, `library/orders/[orderId]`, `products/[productId]`.

**Static placeholder only — hardcoded numbers/text, zero `apiGet`/`apiPost`/`fetch` calls, even though the backend endpoint already exists and works:**
- `dashboard/page.tsx` (main dashboard landing — stats hardcoded to 0)
- `creators/[handle]/page.tsx` (public creator storefront — shows one fake product card regardless of the real handle)
- `checkout/[productId]/page.tsx` — **the buy button does nothing.** This is the highest-priority frontend gap: even with everything else mocked, a buyer cannot currently complete a purchase through the UI at all.
- `checkout/success`, `checkout/cancel`
- `onboarding/creator`, `onboarding/stripe` (hardcoded "Pending" text)
- All 9 pages under `admin/*`
- All of `community/*` (missions, referrals, leaderboard) — the backend for all three is real and working, these screens just aren't calling it

## Recommended Build Order For This Handoff

Ordered so each step is independently testable and doesn't block on external credentials unless noted.

1. **Add creator ownership checks.** No new credentials needed. Protect profile/product/upload/Stripe/sales-stat routes from cross-creator access.
2. **Restrict `GET /orders/:orderId`** to the buyer, owning creator, or admin.
3. **Wire `dashboard/page.tsx`** to pull real aggregate stats (can reuse `sales-stats` endpoint).
4. **Wire the three `community/*` pages** to their already-working backend endpoints (`GET /missions`, `GET /leaderboard`, referral endpoints). No new credentials needed.
5. **Wire the 9 `admin/*` pages** to their already-working backend endpoints. The API side is now role-protected; the frontend still needs admin-only route handling.
6. **Real Stripe integration** — Connect onboarding, real Checkout Sessions with `application_fee_amount`, real webhook signature verification. **Blocked on real Stripe test API keys from the user.** Once keys are added to `.env`, remove the `checkout/confirm` test endpoint or gate it behind a non-production flag.
7. **Real file storage (Cloudflare R2)** — swap `storage.service.ts` implementation, implement real signed URLs. **Blocked on real R2 credentials from the user.**
8. **Email verification + password reset** — net-new feature, no blockers, lowest urgency of what's listed here.

## What NOT To Build Yet

Per `CODEX.md`: no DAO voting, token rewards, NFTs, treasury systems, on-chain rewards, equity, investment features, or token conversion logic. This still applies — do not start $CODE token work until the above is done and the user explicitly asks for it.
