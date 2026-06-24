import { Copy } from "lucide-react";
import { Button } from "../../../components/button";
import { PageHeader } from "../../../components/page-header";
import { StatGrid } from "../../../components/stat-grid";

const stats = [
  { label: "Referral sales", value: "0", detail: "Tracked orders" },
  { label: "Community sales", value: "0", detail: "Member referrals" },
  { label: "Direct sales", value: "0", detail: "No referral" },
  { label: "Points earned", value: "0", detail: "Ledger-backed" }
];

export default function ReferralsPage() {
  return (
    <div>
      <PageHeader title="Referrals" />
      <StatGrid stats={stats} />
      <section className="mt-6 rounded-md border border-line bg-white p-5">
        <label className="grid gap-2 text-sm font-medium">
          Referral link
          <div className="flex gap-2">
            <input
              readOnly
              value="https://barcode.local/r/example"
              className="h-10 min-w-0 flex-1 rounded-md border border-line px-3 text-sm"
            />
            <Button type="button" variant="secondary">
              <Copy size={16} aria-hidden />
            </Button>
          </div>
        </label>
      </section>
    </div>
  );
}
