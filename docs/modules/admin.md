# AdminModule

Owns admin workflows and audit logging.

## Public Interface

- `auditAction`
- `moderateCreator`
- `moderateProduct`
- `adjustPoints`
- `viewRevenueReports`

## Rules

Every admin action affecting money, access, creator status, product moderation, or points must be audit logged.
