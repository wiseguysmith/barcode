import { PageHeader } from "../../../components/page-header";
import { StatGrid } from "../../../components/stat-grid";

const stats = [
  { label: "Gross revenue", value: "$0", detail: "Paid orders" },
  { label: "Creator payouts", value: "$0", detail: "85% share" },
  { label: "Platform fees", value: "$0", detail: "15% fee" },
  { label: "Refunds", value: "$0", detail: "Stripe refunds" }
];

export default function AdminRevenuePage() {
  return (
    <div>
      <PageHeader title="Revenue" />
      <StatGrid stats={stats} />
    </div>
  );
}
