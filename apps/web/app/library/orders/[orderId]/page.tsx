"use client";

import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../../../components/button";
import { PageHeader } from "../../../../components/page-header";
import { apiGet } from "../../../../lib/api";

type OrderDetail = {
  id: string;
  status: string;
  paidAt: string;
  product: {
    id: string;
    title: string;
    description: string;
  };
  creator: { name: string; handle: string };
};

export default function OrderPage({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloadUrls, setDownloadUrls] = useState<Array<{ filename: string; url: string }>>([]);

  useEffect(() => {
    Promise.all([
      apiGet<OrderDetail>(`/api/orders/${params.orderId}`),
      apiGet<Array<{ filename: string; url: string }>>(`/api/products/[productId]/download-url`)
        .catch(() => [])
    ])
      .then(([orderData, urls]) => {
        setOrder(orderData);
        setDownloadUrls(urls || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.orderId]);

  if (loading) return <PageHeader title="Order" />;
  if (!order) return <PageHeader title="Order not found" />;

  return (
    <div className="max-w-2xl">
      <PageHeader title={order.product.title} eyebrow={order.id.slice(0, 8)} />
      <section className="rounded-md border border-line bg-brown p-5">
        <div className="mb-4">
          <p className="text-sm text-muted">Status: {order.status}</p>
          <p className="text-sm text-muted">Purchased: {new Date(order.paidAt).toLocaleDateString()}</p>
        </div>

        <div className="space-y-2">
          {downloadUrls.length > 0 ? (
            downloadUrls.map((item) => (
              <a key={item.filename} href={item.url} download className="block">
                <Button type="button" className="w-full">
                  <Download size={16} aria-hidden />
                  Download: {item.filename}
                </Button>
              </a>
            ))
          ) : (
            <p className="text-sm text-muted">No files available</p>
          )}
        </div>

        <div className="mt-6 border-t border-line pt-4">
          <p className="text-sm text-muted">{order.product.description}</p>
        </div>
      </section>
    </div>
  );
}
