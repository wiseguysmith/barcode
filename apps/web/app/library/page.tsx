import { PageHeader } from "../../components/page-header";

export default function LibraryPage() {
  return (
    <div>
      <PageHeader title="Library" />
      <div className="rounded-md border border-line bg-white p-5 text-sm text-zinc-600">
        No paid products yet.
      </div>
    </div>
  );
}
