import Link from "next/link";
import type { ReactNode } from "react";
import {
  BadgeDollarSign,
  Boxes,
  ChartNoAxesCombined,
  ClipboardCheck,
  Compass,
  LayoutDashboard,
  ShieldCheck,
  Trophy,
  UserRound
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Boxes },
  { href: "/dashboard/sales", label: "Sales", icon: BadgeDollarSign },
  { href: "/community/missions", label: "Missions", icon: ClipboardCheck },
  { href: "/community/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/community/referrals", label: "Referrals", icon: Compass },
  { href: "/admin", label: "Admin", icon: ShieldCheck }
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-white px-4 py-5 lg:block">
        <Link href="/" className="flex items-center gap-3 px-2 text-lg font-semibold">
          <span className="flex size-9 items-center justify-center rounded-md bg-ink text-white">
            <ChartNoAxesCombined size={18} aria-hidden />
          </span>
          Barcode DAO
        </Link>

        <nav className="mt-8 grid gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-ink"
            >
              <item.icon size={17} aria-hidden />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-line bg-white/95 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-3 lg:hidden">
            <span className="flex size-9 items-center justify-center rounded-md bg-ink text-white">
              <ChartNoAxesCombined size={18} aria-hidden />
            </span>
            <span className="font-semibold">Barcode DAO</span>
          </div>
          <div className="hidden text-sm text-zinc-600 lg:block">Creator distribution engine</div>
          <Link
            href="/auth/sign-in"
            className="flex h-9 items-center gap-2 rounded-md border border-line bg-white px-3 text-sm font-medium hover:bg-zinc-50"
          >
            <UserRound size={16} aria-hidden />
            Sign in
          </Link>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">{children}</main>
      </div>
    </div>
  );
}
