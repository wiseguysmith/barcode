import { PageHeader } from "../../../components/page-header";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <PageHeader title="Settings" />
      <form className="grid gap-4 rounded-md border border-line bg-brown p-5">
        <label className="grid gap-2 text-sm font-medium">
          Public name
          <input className="h-10 rounded-md border border-line px-3" />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Email
          <input className="h-10 rounded-md border border-line px-3" type="email" />
        </label>
      </form>
    </div>
  );
}
