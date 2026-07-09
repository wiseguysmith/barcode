"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../../../components/button";
import { apiGet, apiPost } from "../../../lib/api";

type Product = {
  id: string;
  title: string;
  description: string;
  priceCents: number;
  creator: { id: string; handle: string; name: string };
  files: { id: string; filename: string }[];
};

export default function ProductPage({ params }: { params: { productId: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    apiGet<Product>(`/api/products/${params.productId}`)
      .then(setProduct)
      .catch(() => router.push("/"))
      .finally(() => setLoading(false));
  }, [params.productId, router]);

  async function handleBuy() {
    setCheckingOut(true);
    try {
      const session = await apiPost<{ checkoutUrl: string; orderId: string }>("/api/checkout/sessions", {
        productId: params.productId
      });
      router.push(session.checkoutUrl);
    } catch (err) {
      alert("Checkout failed: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setCheckingOut(false);
    }
  }

  if (loading) return <div className="py-12 text-center">Loading...</div>;
  if (!product) return <div className="py-12 text-center">Product not found</div>;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h1 className="text-4xl font-semibold text-white">{product.title}</h1>
        <Link href={`/creators/${product.creator.handle}`} className="mt-2 block">
          <p className="text-sm text-copper hover:underline">by {product.creator.name}</p>
        </Link>

        <div className="mt-8">
          <p className="text-4xl font-bold text-copper">${(product.priceCents / 100).toFixed(2)}</p>
          <p className="mt-2 text-sm text-muted">You keep {product.files.length} file(s)</p>
        </div>

        <Button onClick={handleBuy} disabled={checkingOut} className="mt-8 w-full">
          {checkingOut ? "Processing…" : "Buy Now"}
        </Button>
      </div>

      <div>
        <div className="rounded-md border border-copper/40 bg-brown p-6">
          <h2 className="font-semibold text-white">About</h2>
          <p className="mt-3 whitespace-pre-wrap text-sm text-muted">{product.description}</p>

          {product.files.length > 0 && (
            <>
              <h3 className="mt-6 font-semibold text-white">Included Files</h3>
              <ul className="mt-3 space-y-2">
                {product.files.map((file) => (
                  <li key={file.id} className="text-sm text-muted">
                    📄 {file.filename}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
