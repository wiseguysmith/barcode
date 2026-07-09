"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../../../components/button";
import { PageHeader } from "../../../../components/page-header";
import { apiPost } from "../../../../lib/api";

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("file", file);

    try {
      const result = await fetch("/api/products/upload", {
        method: "POST",
        credentials: "include",
        body: formData
      }).then((r) => r.json());

      // Redirect to product detail
      router.push(`/dashboard/products/${result.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <PageHeader title="Create Product" />

      <form onSubmit={handleSubmit} className="grid gap-6 rounded-md border border-copper/40 bg-brown p-6">
        <label className="grid gap-2 text-sm font-medium">
          Title
          <input
            name="title"
            required
            className="h-10 rounded-md border border-copper/40 bg-paper px-3 text-white"
            placeholder="My course, template, design..."
          />
        </label>

        <label className="grid gap-2 text-sm font-medium">
          Description
          <textarea
            name="description"
            required
            rows={4}
            className="rounded-md border border-copper/40 bg-paper px-3 py-2 text-white"
            placeholder="What will buyers get? What problem does this solve?"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium">
          Price (USD)
          <input
            name="priceCents"
            type="number"
            required
            min="1"
            step="1"
            className="h-10 rounded-md border border-copper/40 bg-paper px-3 text-white"
            placeholder="19"
          />
          <p className="text-xs text-muted">Price in dollars. You'll keep 85% after platform fees.</p>
        </label>

        <label className="grid gap-2 text-sm font-medium">
          Product File
          <input
            type="file"
            required
            onChange={(e) => setFile(e.currentTarget.files?.[0] ?? null)}
            className="rounded-md border border-copper/40 bg-paper px-3 py-2 text-white file:mr-4 file:rounded file:border file:border-copper/40 file:bg-copper/10 file:px-3 file:py-1 file:text-sm file:text-white"
          />
          <p className="text-xs text-muted">
            {file ? `Selected: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)` : "Upload your digital product (PDF, ZIP, etc.)"}
          </p>
        </label>

        {error && <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}

        <div className="flex gap-3">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? "Uploading…" : "Create Product"}
          </Button>
          <Link href="/dashboard/products">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
