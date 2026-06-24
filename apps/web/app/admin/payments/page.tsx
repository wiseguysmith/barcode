import { PageHeader } from "../../../components/page-header";

export default function AdminPaymentsPage() {
  return (
    <div>
      <PageHeader title="Payments" />
      <div className="rounded-md border border-line bg-white p-5 text-sm text-zinc-600">
        Stripe payment status will appear here.
      </div>
    </div>
  );
}
