import type {
  PointsLedgerReplayEntry,
  PointsLedgerRequiredFields
} from "../types/community";

export function assertValidPointsLedgerEntry(
  entry: PointsLedgerRequiredFields
): void {
  if (!entry.userId) throw new Error("userId is required");
  if (!Number.isInteger(entry.delta) || entry.delta === 0) {
    throw new Error("delta must be a non-zero integer");
  }
  if (!entry.reason) throw new Error("reason is required");
  if (!entry.sourceId) throw new Error("sourceId is required");
  if (!entry.createdBy) throw new Error("createdBy is required");
  if (!(entry.createdAt instanceof Date)) throw new Error("createdAt is required");
}

export function replayPointsBalance(
  entries: readonly PointsLedgerReplayEntry[],
  userId: string
): number {
  return entries
    .filter((entry) => entry.userId === userId)
    .reduce((balance, entry) => balance + entry.delta, 0);
}
