import { PageHeader } from "../../../components/page-header";

export default function AdminProductsPage() {
  return (
    <div>
      <PageHeader title="Products" />
      <div className="overflow-hidden rounded-md border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-zinc-50 text-zinc-500">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Creator</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-4 text-zinc-500" colSpan={4}>No products yet.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
