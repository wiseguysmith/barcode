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
    <div className="overflow-hidden rounded-md border border-line bg-brown">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-line bg-paper text-muted">
          <tr>{columns.map((column) => <th key={column} className="px-4 py-3 font-medium">{column}</th>)}</tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-4 text-muted" colSpan={columns.length}>{empty}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
