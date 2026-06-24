"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../../components/button";
import { PageHeader } from "../../../components/page-header";
import { apiPost } from "../../../lib/api";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = new FormData(e.currentTarget);

    try {
      await apiPost("/auth/signin", {
        email: form.get("email"),
        password: form.get("password")
      });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl">
      <PageHeader title="Sign in" eyebrow="Get on code" />
      <form onSubmit={handleSubmit} className="grid gap-4 rounded-md border border-line bg-brown p-5">
        <label className="grid gap-2 text-sm font-medium">
          Email
          <input name="email" type="email" required className="h-10 rounded-md border border-line bg-paper px-3 text-white" />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Password
          <input name="password" type="password" required minLength={8} className="h-10 rounded-md border border-line bg-paper px-3 text-white" />
        </label>

        {error && (
          <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
        <Link href="/auth/sign-up" className="text-sm font-semibold uppercase text-copper">
          Create account
        </Link>
      </form>
    </div>
  );
}
