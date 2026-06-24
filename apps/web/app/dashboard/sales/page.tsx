import { PageHeader } from "../../../components/page-header";
import { StatGrid } from "../../../components/stat-grid";

const stats = [
  { label: "Direct sales", value: "0", detail: "No referral attribution" },
  { label: "Community sales", value: "0", detail: "Community referral" },
  { label: "Creator payout", value: "$0", detail: "Automatic through Stripe" },
  { label: "Platform fee", value: "$0", detail: "Captured by Barcode" }
];

export default function SalesPage() {
  return (
    <div>
      <PageHeader title="Sales" />
      <StatGrid stats={stats} />
    </div>
  );
}
