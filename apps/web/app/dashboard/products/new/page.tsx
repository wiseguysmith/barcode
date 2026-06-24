import { Upload } from "lucide-react";
import { Button } from "../../../../components/button";
import { PageHeader } from "../../../../components/page-header";

export default function NewProductPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader title="New product" />
      <form className="grid gap-4 rounded-md border border-line bg-brown p-5">
        <label className="grid gap-2 text-sm font-medium">
          Title
          <input className="h-10 rounded-md border border-line px-3" />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Description
          <textarea className="min-h-36 rounded-md border border-line px-3 py-2" />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            Price
            <input className="h-10 rounded-md border border-line px-3" type="number" min="1" />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Currency
            <select className="h-10 rounded-md border border-line px-3">
              <option>USD</option>
            </select>
          </label>
        </div>
        <button
          type="button"
          className="flex h-32 items-center justify-center gap-2 rounded-md border border-dashed border-copper/40 bg-paper text-sm font-medium text-muted"
        >
          <Upload size={18} aria-hidden />
          Upload paid file
        </button>
        <Button type="button">Save draft</Button>
      </form>
    </div>
  );
}
