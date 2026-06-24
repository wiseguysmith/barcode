import { PageHeader } from "../../../components/page-header";

export default function AdminReferralsPage() {
  return (
    <div>
      <PageHeader title="Referral attribution" />
      <div className="rounded-md border border-line bg-white p-5 text-sm text-zinc-600">
        No attribution records yet.
      </div>
    </div>
  );
}
