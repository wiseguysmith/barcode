import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "../../../../../components/button";
import { PageHeader } from "../../../../../components/page-header";

export default async function PublicProductPage({
  params
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  return (
    <div className="max-w-3xl">
      <PageHeader title="Digital product" eyebrow={productId} />
      <section className="rounded-md border border-line bg-white p-5">
        <p className="text-sm text-zinc-600">$10.00</p>
        <Link href={`/checkout/${productId}`} className="mt-5 inline-flex">
          <Button>
            <ShoppingCart size={16} aria-hidden />
            Checkout
          </Button>
        </Link>
      </section>
    </div>
  );
}
