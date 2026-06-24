import { Minus, Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { PageHeader } from "../../../components/page-header";

export default function AdminPointsPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <section>
        <PageHeader title="Adjust points" />
        <form className="grid gap-4 rounded-md border border-line bg-white p-5">
          <label className="grid gap-2 text-sm font-medium">
            User ID
            <input className="h-10 rounded-md border border-line px-3" />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Delta
            <input className="h-10 rounded-md border border-line px-3" type="number" />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Reason
            <input className="h-10 rounded-md border border-line px-3" />
          </label>
          <div className="flex gap-2">
            <Button type="button">
              <Plus size={16} aria-hidden />
              Award
            </Button>
            <Button type="button" variant="danger">
              <Minus size={16} aria-hidden />
              Remove
            </Button>
          </div>
        </form>
      </section>
      <section>
        <PageHeader title="Points ledger" />
        <div className="rounded-md border border-line bg-white p-5 text-sm text-zinc-600">
          No ledger entries yet.
        </div>
      </section>
    </div>
  );
}
