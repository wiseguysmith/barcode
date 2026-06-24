import { PageHeader } from "../../../components/page-header";

export default function AdminProductsPage() {
  return (
    <div>
      <PageHeader title="Products" />
      <div className="overflow-hidden rounded-md border border-line bg-brown">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-paper text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Creator</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-4 text-muted" colSpan={4}>No products yet.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
