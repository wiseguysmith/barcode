import { Trophy } from "lucide-react";
import { PageHeader } from "../../../components/page-header";

export default function LeaderboardPage() {
  return (
    <div>
      <PageHeader title="Leaderboard" />
      <div className="overflow-hidden rounded-md border border-line bg-brown">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-paper text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Rank</th>
              <th className="px-4 py-3 font-medium">Member</th>
              <th className="px-4 py-3 font-medium">Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-4">
                <Trophy size={16} className="text-gold" aria-hidden />
              </td>
              <td className="px-4 py-4 text-muted" colSpan={2}>
                No points yet.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
