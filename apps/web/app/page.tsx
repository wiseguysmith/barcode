import Link from "next/link";
import { ArrowRight, BadgeDollarSign, Boxes, Compass, LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "../components/button";
import { StatGrid } from "../components/stat-grid";

const stats = [
  { label: "Creator revenue", value: "$0", detail: "Demand captured" },
  { label: "Community revenue", value: "$0", detail: "Distribution lift" },
  { label: "Published products", value: "0", detail: "Ready for checkout" },
  { label: "Pending reviews", value: "0", detail: "Admin queue" }
];

export default function HomePage() {
  return (
    <div>
      <section className="mb-6 border-b border-copper/40 pb-6">
        <p className="text-sm font-semibold uppercase text-copper">Phase 1 / Get on code</p>
        <div className="mt-3 grid gap-4 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold uppercase tracking-normal text-white md:text-6xl">
              Creator distribution engine
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">
              BARCODE gives builders a shared operating layer for products, checkout, referrals, and
              community-backed demand.
            </p>
          </div>
          <div className="rounded-md border border-copper/40 bg-brown p-4">
            <p className="text-xs font-semibold uppercase text-copper">Brand north star</p>
            <p className="mt-2 text-sm text-muted">
              Industrializing culture and shaping the future of technology and community.
            </p>
            <Link href="/auth/sign-up" className="mt-4 inline-flex">
              <Button>
                Start signup
                <ArrowRight size={16} aria-hidden />
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
            className="rounded-md border border-line bg-brown p-5 transition hover:border-copper"
          >
            <item.icon className="mb-4 text-copper" size={22} aria-hidden />
            <h2 className="text-lg font-semibold uppercase text-white">{item.title}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.items.map((label) => (
                <span key={label} className="rounded-md border border-copper/30 px-2 py-1 text-xs text-muted">
                  {label}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <article className="rounded-md border border-line bg-paper p-5">
          <ShieldCheck className="text-copper" size={22} aria-hidden />
          <h2 className="mt-4 text-lg font-semibold uppercase text-white">Protect the build</h2>
          <p className="mt-2 text-sm text-muted">
            V1 keeps IP, product files, and customer access organized off-chain while preserving the path
            toward future on-chain protection.
          </p>
        </article>
        <article className="rounded-md border border-line bg-paper p-5">
          <LockKeyhole className="text-copper" size={22} aria-hidden />
          <h2 className="mt-4 text-lg font-semibold uppercase text-white">$CODE readiness</h2>
          <p className="mt-2 text-sm text-muted">
            Rewards, treasury, and token-gated activations stay planned extension points until the commerce
            loop is stable.
          </p>
        </article>
      </section>
    </div>
  );
}
