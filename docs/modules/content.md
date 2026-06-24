# ContentModule

Owns creator profiles, products, product files, and signed download access.

## Public Interface

- `createCreatorProfile`
- `approveCreatorProfile`
- `createProduct`
- `publishProduct`
- `getPublicCreatorPage`
- `getProductForCheckout`
- `createSignedDownloadUrl`

## Rules

- Paid content files are never public.
- Download URLs must expire.
- Product access depends on valid paid orders.
