import { PageHeader } from "../../../components/page-header";

export default function MissionsPage() {
  return (
    <div>
      <PageHeader title="Missions" />
      <div className="grid gap-3">
        <article className="rounded-md border border-line bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold">Share a creator</h2>
              <p className="mt-1 text-sm text-zinc-600">100 points</p>
            </div>
            <span className="rounded-md bg-mint/10 px-2 py-1 text-xs font-medium text-mint">
              Active
            </span>
          </div>
        </article>
      </div>
    </div>
  );
}
