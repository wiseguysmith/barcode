import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "../../../components/button";
import { PageHeader } from "../../../components/page-header";

export default function StripeOnboardingPage() {
  return (
    <div>
      <PageHeader title="Stripe Connect" eyebrow="Onboarding" />
      <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="rounded-md border border-line bg-brown p-5">
          <h2 className="text-lg font-semibold">Express account</h2>
          <dl className="mt-5 grid gap-4 text-sm">
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-muted">Status</dt>
              <dd className="font-medium text-gold">Pending</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="text-muted">Creator share</dt>
              <dd className="font-medium">85%</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Platform fee</dt>
              <dd className="font-medium">15%</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-md border border-line bg-brown p-5">
          <Link href="/dashboard/products/new">
            <Button className="w-full">
              Open onboarding
              <ExternalLink size={16} aria-hidden />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
