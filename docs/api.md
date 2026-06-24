# API Outline

The API uses NestJS controllers, DTO validation, and generated OpenAPI docs.

## Identity

- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /me`
- `PATCH /me`
- `POST /auth/methods/email`
- `POST /auth/methods/wallet/scaffolded`

## Content

- `POST /creators/profile`
- `GET /creators/me`
- `PATCH /creators/me`
- `GET /creators/:handle/public`
- `POST /products`
- `GET /products/me`
- `PATCH /products/:id`
- `POST /products/:id/publish`
- `POST /products/:id/files`
- `GET /products/:id/download-url`

## Commerce

- `POST /stripe/connect/account`
- `POST /stripe/connect/account-link`
- `GET /stripe/connect/status`
- `POST /checkout/sessions`
- `GET /orders/me`
- `GET /orders/:id`
- `GET /orders/:id/access`
- `POST /webhooks/stripe`

## Community

- `POST /referrals`
- `POST /attribution/track`
- `GET /creators/me/distribution-stats`
- `GET /missions`
- `POST /missions/:id/complete`
- `GET /points/me`
- `GET /points/me/ledger`
- `GET /leaderboard`

## Admin

- `GET /admin/users`
- `GET /admin/creators`
- `PATCH /admin/creators/:id/status`
- `GET /admin/products`
- `PATCH /admin/products/:id/status`
- `GET /admin/orders`
- `GET /admin/payments`
- `GET /admin/referrals`
- `GET /admin/revenue`
- `POST /admin/missions`
- `PATCH /admin/missions/:id`
- `POST /admin/points/adjust`
- `GET /admin/points/ledger`
- `GET /admin/audit-logs`
