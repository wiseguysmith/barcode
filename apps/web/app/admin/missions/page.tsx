import { Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { PageHeader } from "../../../components/page-header";

export default function AdminMissionsPage() {
  return (
    <div>
      <PageHeader
        title="Missions"
        actions={
          <Button>
            <Plus size={16} aria-hidden />
            New mission
          </Button>
        }
      />
      <div className="rounded-md border border-line bg-brown p-5 text-sm text-muted">
        No missions yet.
      </div>
    </div>
  );
}
