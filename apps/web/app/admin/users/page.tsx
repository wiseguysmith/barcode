import { PageHeader } from "../../../components/page-header";

export default function AdminUsersPage() {
  return (
    <div>
      <PageHeader title="Users" />
      <AdminTable columns={["Name", "Email", "Role", "Status"]} empty="No users yet." />
    </div>
  );
}

function AdminTable({ columns, empty }: { columns: string[]; empty: string }) {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-line bg-zinc-50 text-zinc-500">
          <tr>{columns.map((column) => <th key={column} className="px-4 py-3 font-medium">{column}</th>)}</tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-4 text-zinc-500" colSpan={columns.length}>{empty}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
