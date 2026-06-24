import Link from "next/link";
import { ArrowRight, BadgeDollarSign, Boxes, Compass } from "lucide-react";
import { Button } from "../components/button";
import { PageHeader } from "../components/page-header";
import { StatGrid } from "../components/stat-grid";

const stats = [
  { label: "Creator revenue", value: "$0", detail: "Primary KPI" },
  { label: "Community revenue", value: "$0", detail: "Secondary KPI" },
  { label: "Published products", value: "0", detail: "Ready for checkout" },
  { label: "Pending reviews", value: "0", detail: "Admin queue" }
];

export default function HomePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Phase 1"
        title="Creator revenue workspace"
        actions={
          <Link href="/auth/sign-up">
            <Button>
              Start signup
              <ArrowRight size={16} aria-hidden />
            </Button>
          </Link>
        }
      />

      <StatGrid stats={stats} />

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "Creator setup",
            href: "/onboarding/creator",
            icon: Boxes,
            items: ["Profile", "Product", "Stripe Connect"]
          },
          {
            title: "Distribution",
            href: "/community/referrals",
            icon: Compass,
            items: ["Direct sales", "Referral sales", "Community sales"]
          },
          {
            title: "Revenue",
            href: "/dashboard/sales",
            icon: BadgeDollarSign,
            items: ["Orders", "Platform fee", "Creator payout"]
          }
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-md border border-line bg-white p-5 transition hover:border-zinc-400"
          >
            <item.icon className="mb-4 text-mint" size={22} aria-hidden />
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.items.map((label) => (
                <span key={label} className="rounded-md bg-zinc-100 px-2 py-1 text-xs text-zinc-700">
                  {label}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
