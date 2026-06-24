# CommunityModule

Owns referrals, attribution, missions, points, and leaderboard data.

## Public Interface

- `createReferral`
- `resolveAttribution`
- `recordMissionCompletion`
- `addPointsLedgerEntry`
- `rebuildPointsBalance`
- `getLeaderboard`

## Rules

- Points have no monetary value.
- Points use append-only ledger entries.
- Balances must be rebuildable by replaying ledger entries.
