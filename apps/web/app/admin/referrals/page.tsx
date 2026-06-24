import { PageHeader } from "../../../components/page-header";

export default function AdminReferralsPage() {
  return (
    <div>
      <PageHeader title="Referral attribution" />
      <div className="rounded-md border border-line bg-brown p-5 text-sm text-muted">
        No attribution records yet.
      </div>
    </div>
  );
}
