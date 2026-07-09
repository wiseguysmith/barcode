"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "../../../components/page-header";
import { StatGrid } from "../../../components/stat-grid";
import { apiGet } from "../../../lib/api";

type SalesStats = {
  grouped: Array<{
    status: string;
    _count: { id: number };
    _sum: { amountCents: number; platformFeeCents: number; creatorAmountCents: number };
  }>;
  directSales: number;
  communityReferredSales: number;
};

type Order = {
  id: string;
  product: { title: string };
  buyer?: { displayName: string };
  creatorAmountCents: number;
  status: string;
  paidAt?: string;
};

export default function SalesPage() {
  const [stats, setStats] = useState<SalesStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const creator = await apiGet<{ id: string }>("/api/creators/me/profile");
        const [statsData, ordersData] = await Promise.all([
          apiGet<SalesStats>(`/api/creators/${creator.id}/sales-stats`),
          apiGet<Order[]>(`/api/creators/${creator.id}/orders`)
        ]);
        setStats(statsData);
        setOrders(ordersData);
      } catch (err) {
        console.error("Failed to load sales data:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const paidOrders = stats?.grouped.find((g) => g.status === "PAID");
  const totalRevenue = paidOrders?._sum.amountCents ?? 0;
  const creatorEarnings = paidOrders?._sum.creatorAmountCents ?? 0;

  const statItems = [
    { label: "Direct sales", value: String(stats?.directSales ?? 0), detail: "No referral" },
    { label: "Community sales", value: String(stats?.communityReferredSales ?? 0), detail: "Referred buyers" },
    { label: "Creator payout", value: `$${(creatorEarnings / 100).toFixed(2)}`, detail: "Your earnings" },
    { label: "Platform fee", value: `$${((totalRevenue - creatorEarnings) / 100).toFixed(2)}`, detail: "15% of sales" }
  ];

  return (
    <div>
      <PageHeader title="Sales" />
      {loading ? <div className="text-muted">Loading...</div> : <StatGrid stats={statItems} />}

      {!loading && orders.length > 0 && (
        <div className="mt-8 overflow-hidden rounded-md border border-line">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-paper text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Buyer</th>
                <th className="px-4 py-3 font-medium">Your Earnings</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-line/50 hover:bg-paper/30">
                  <td className="px-4 py-4">{order.product.title}</td>
                  <td className="px-4 py-4 text-muted">{order.buyer?.displayName ?? "—"}</td>
                  <td className="px-4 py-4 font-semibold text-copper">
                    ${(order.creatorAmountCents / 100).toFixed(2)}
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-md bg-copper/10 px-2 py-1 text-xs font-semibold text-copper uppercase">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
