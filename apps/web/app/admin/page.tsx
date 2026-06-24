import Link from "next/link";
import {
  BadgeDollarSign,
  Boxes,
  ClipboardCheck,
  Receipt,
  ShieldCheck,
  UsersRound
} from "lucide-react";
import { PageHeader } from "../../components/page-header";
import { StatGrid } from "../../components/stat-grid";

const stats = [
  { label: "Pending creators", value: "0", detail: "Review queue" },
  { label: "Pending products", value: "0", detail: "Moderation queue" },
  { label: "Paid orders", value: "0", detail: "Stripe confirmed" },
  { label: "Platform revenue", value: "$0", detail: "15% fees" }
];

const links = [
  { href: "/admin/users", label: "Users", icon: UsersRound },
  { href: "/admin/creators", label: "Creators", icon: ShieldCheck },
  { href: "/admin/products", label: "Products", icon: Boxes },
  { href: "/admin/orders", label: "Orders", icon: Receipt },
  { href: "/admin/points", label: "Points", icon: ClipboardCheck },
  { href: "/admin/revenue", label: "Revenue", icon: BadgeDollarSign }
];

export default function AdminPage() {
  return (
    <div>
      <PageHeader title="Admin" />
      <StatGrid stats={stats} />
      <section className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className="flex items-center gap-3 rounded-md border border-line bg-brown p-4 text-sm font-medium hover:border-copper"
          >
            <link.icon size={18} className="text-copper" aria-hidden />
            {link.label}
          </Link>
        ))}
      </section>
    </div>
  );
}
