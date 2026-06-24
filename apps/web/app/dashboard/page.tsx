import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "../../components/button";
import { PageHeader } from "../../components/page-header";
import { StatGrid } from "../../components/stat-grid";

const stats = [
  { label: "Revenue", value: "$0", detail: "Paid orders" },
  { label: "Creator payout", value: "$0", detail: "85% share" },
  { label: "Platform fee", value: "$0", detail: "15% fee" },
  { label: "Community sales", value: "0", detail: "Referral orders" }
];

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Creator dashboard"
        actions={
          <Link href="/dashboard/products/new">
            <Button>
              <Plus size={16} aria-hidden />
              New product
            </Button>
          </Link>
        }
      />
      <StatGrid stats={stats} />
    </div>
  );
}
