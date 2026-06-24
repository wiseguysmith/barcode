import { PageHeader } from "../../../components/page-header";

export default function AdminOrdersPage() {
  return (
    <div>
      <PageHeader title="Orders" />
      <div className="overflow-hidden rounded-md border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-zinc-50 text-zinc-500">
            <tr>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Buyer</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-4 text-zinc-500" colSpan={4}>No orders yet.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
