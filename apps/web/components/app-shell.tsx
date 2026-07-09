"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  BadgeDollarSign,
  Boxes,
  ClipboardCheck,
  Compass,
  LayoutDashboard,
  ShieldCheck,
  Trophy,
  UserRound
} from "lucide-react";
import { cn } from "../lib/utils";

function BarcodeIcon({ size = 18 }: { size?: number }) {
  const bars = [3, 1, 2, 1, 3, 1, 1, 2, 1, 2, 1, 1, 3, 1, 2, 1, 1, 2, 1, 3];
  const total = bars.reduce((a, b) => a + b, 0);
  let x = 0;
  return (
    <svg width={size * 1.4} height={size} viewBox={`0 0 ${total} 10`} aria-hidden>
      {bars.map((w, i) => {
        const rect = i % 2 === 0 ? (
          <rect key={i} x={x} y={0} width={w} height={10} fill="currentColor" />
        ) : null;
        x += w;
        return rect;
      })}
    </svg>
  );
}

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
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-copper/35 bg-paper px-4 py-5 lg:block">
        <Link href="/" className="flex items-center gap-3 px-2 text-lg font-semibold uppercase transition-opacity hover:opacity-80">
          <span className="flex size-9 items-center justify-center rounded-md border border-copper bg-brown text-copper">
            <BarcodeIcon size={18} />
          </span>
          Barcode DAO
        </Link>
        <p className="mt-3 px-2 text-xs font-medium uppercase text-muted">Get on code</p>

        <nav className="mt-8 grid gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-semibold uppercase transition-colors duration-150",
                  isActive
                    ? "bg-copper/15 text-copper"
                    : "text-muted hover:bg-brown hover:text-white"
                )}
              >
                <item.icon size={17} aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute inset-x-4 bottom-5 rounded-md border border-copper/35 bg-brown p-3">
          <p className="text-xs font-semibold uppercase text-copper">V1 build lane</p>
          <p className="mt-1 text-xs text-muted">Distribution, checkout, and creator operations first.</p>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-copper/35 bg-paper/95 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-3 lg:hidden">
            <span className="flex size-9 items-center justify-center rounded-md border border-copper bg-brown text-copper">
              <BarcodeIcon size={18} />
            </span>
            <span className="font-semibold uppercase">Barcode DAO</span>
          </div>
          <div className="hidden text-sm font-semibold uppercase text-muted lg:block">
            Industrializing culture through creator distribution
          </div>
          <Link
            href="/auth/sign-in"
            className="flex h-9 items-center gap-2 rounded-md border border-copper/60 bg-brown px-3 text-sm font-semibold uppercase text-white transition-colors duration-150 hover:border-copper hover:bg-copper/10"
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
