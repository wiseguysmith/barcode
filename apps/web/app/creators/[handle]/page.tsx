import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "../../../components/button";

export default async function PublicCreatorPage({
  params
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  return (
    <div>
      <section className="border-b border-line pb-6">
        <p className="text-sm font-medium text-mint">@{handle}</p>
        <h1 className="mt-2 text-3xl font-semibold">Creator storefront</h1>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-md border border-line bg-white p-5">
          <h2 className="text-lg font-semibold">Digital product</h2>
          <p className="mt-2 text-sm text-zinc-600">$10.00</p>
          <Link href="/checkout/example-product" className="mt-5 block">
            <Button className="w-full">
              <ShoppingCart size={16} aria-hidden />
              Buy
            </Button>
          </Link>
        </article>
      </section>
    </div>
  );
}
