"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../../components/button";
import { PageHeader } from "../../components/page-header";
import { apiGet } from "../../lib/api";

type Order = {
  id: string;
  status: string;
  paidAt: string;
  product: { id: string; title: string; priceCents: number };
};

export default function LibraryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<Order[]>("/api/orders/me")
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const paidOrders = orders.filter((o) => o.status === "PAID");

  return (
    <div>
      <PageHeader title="My Library" />

      {loading ? (
        <div className="text-center text-muted">Loading...</div>
      ) : paidOrders.length === 0 ? (
        <div className="rounded-md border border-copper/40 bg-brown p-8 text-center">
          <p className="text-muted">You haven't purchased anything yet.</p>
          <Link href="/" className="mt-4 inline-block">
            <Button>Browse Creators</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {paidOrders.map((order) => (
            <div key={order.id} className="rounded-md border border-copper/40 bg-brown p-4">
              <h3 className="font-semibold text-white">{order.product.title}</h3>
              <p className="mt-1 text-sm text-muted">${(order.product.priceCents / 100).toFixed(2)}</p>
              <p className="mt-1 text-xs text-muted">
                Purchased {new Date(order.paidAt).toLocaleDateString()}
              </p>
              <Link href={`/library/orders/${order.id}`} className="mt-4 block">
                <Button variant="secondary" className="w-full">
                  Download
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
