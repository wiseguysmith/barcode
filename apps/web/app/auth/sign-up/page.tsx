import Link from "next/link";
import { ArrowRight, UserPlus } from "lucide-react";
import { Button } from "../../../components/button";
import { PageHeader } from "../../../components/page-header";

export default function SignUpPage() {
  return (
    <div className="max-w-xl">
      <PageHeader title="Create account" />
      <form className="grid gap-4 rounded-md border border-line bg-white p-5">
        <label className="grid gap-2 text-sm font-medium">
          Display name
          <input className="h-10 rounded-md border border-line px-3" />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Email
          <input className="h-10 rounded-md border border-line px-3" type="email" />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Password
          <input className="h-10 rounded-md border border-line px-3" type="password" />
        </label>
        <Link href="/onboarding/creator">
          <Button type="button" className="w-full">
            <UserPlus size={16} aria-hidden />
            Continue
            <ArrowRight size={16} aria-hidden />
          </Button>
        </Link>
      </form>
    </div>
  );
}
