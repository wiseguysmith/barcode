import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { PageHeader } from "../../../components/page-header";

export default function ProductsPage() {
  return (
    <div>
      <PageHeader
        title="Products"
        actions={
          <Link href="/dashboard/products/new">
            <Button>
              <Plus size={16} aria-hidden />
              New product
            </Button>
          </Link>
        }
      />
      <div className="overflow-hidden rounded-md border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-zinc-50 text-zinc-500">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Sales</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-4 text-zinc-500" colSpan={4}>
                No products yet.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
