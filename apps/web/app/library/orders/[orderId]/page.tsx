import { Download } from "lucide-react";
import { Button } from "../../../../components/button";
import { PageHeader } from "../../../../components/page-header";

export default async function OrderPage({
  params
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  return (
    <div className="max-w-2xl">
      <PageHeader title="Order" eyebrow={orderId} />
      <section className="rounded-md border border-line bg-white p-5">
        <Button type="button">
          <Download size={16} aria-hidden />
          Download
        </Button>
      </section>
    </div>
  );
}
