"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { PageHeader } from "../../../components/page-header";
import { apiGet } from "../../../lib/api";

type Product = {
  id: string;
  title: string;
  priceCents: number;
  status: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<Product[]>("/api/creators/me/products")
      .then(setProducts)
      .catch((err) => console.error("Failed to load products:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader
        title="Products"
        actions={
          <Link href="/dashboard/products/create">
            <Button>
              <Plus size={16} aria-hidden />
              New product
            </Button>
          </Link>
        }
      />
      <div className="overflow-hidden rounded-md border border-line bg-brown">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-paper text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-4 text-muted" colSpan={4}>
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td className="px-4 py-4 text-muted" colSpan={4}>
                  No products yet. Create one to start selling!
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-line/50 hover:bg-paper/30">
                  <td className="px-4 py-4 font-medium">{product.title}</td>
                  <td className="px-4 py-4">${(product.priceCents / 100).toFixed(2)}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-md bg-copper/10 px-2 py-1 text-xs font-semibold text-copper uppercase">
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <Link href={`/dashboard/products/${product.id}`} className="text-copper hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
