import { CreditCard } from "lucide-react";
import { Button } from "../../../components/button";
import { PageHeader } from "../../../components/page-header";

export default async function CheckoutPage({
  params
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  return (
    <div className="max-w-2xl">
      <PageHeader title="Checkout" eyebrow={productId} />
      <section className="rounded-md border border-line bg-white p-5">
        <dl className="grid gap-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-zinc-500">Product</dt>
            <dd className="font-medium">Digital product</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-zinc-500">Total</dt>
            <dd className="font-medium">$10.00</dd>
          </div>
        </dl>
        <Button className="mt-5 w-full" type="button">
          <CreditCard size={16} aria-hidden />
          Pay with Stripe
        </Button>
      </section>
    </div>
  );
}
