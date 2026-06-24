import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../../../components/button";
import { PageHeader } from "../../../components/page-header";

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-xl">
      <PageHeader title="Purchase complete" />
      <section className="rounded-md border border-line bg-white p-5">
        <CheckCircle2 className="text-mint" size={28} aria-hidden />
        <Link href="/library" className="mt-5 inline-flex">
          <Button>Open library</Button>
        </Link>
      </section>
    </div>
  );
}
