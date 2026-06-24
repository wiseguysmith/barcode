import { PageHeader } from "../../components/page-header";

export default function LibraryPage() {
  return (
    <div>
      <PageHeader title="Library" />
      <div className="rounded-md border border-line bg-brown p-5 text-sm text-muted">
        No paid products yet.
      </div>
    </div>
  );
}
