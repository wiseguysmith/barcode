# IdentityModule

Owns canonical users and auth methods.

## Public Interface

- `createUser`
- `getUserById`
- `getUserByAuthMethod`
- `attachAuthMethod`
- `updateUserStatus`

## Rules

- A user has one canonical `User` record.
- A user can have multiple `AuthMethod` records.
- Wallet auth is scaffolded but inactive until requested.
