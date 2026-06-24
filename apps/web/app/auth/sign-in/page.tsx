import Link from "next/link";
import { LogIn } from "lucide-react";
import { Button } from "../../../components/button";
import { PageHeader } from "../../../components/page-header";

export default function SignInPage() {
  return (
    <div className="max-w-xl">
      <PageHeader title="Sign in" />
      <form className="grid gap-4 rounded-md border border-line bg-white p-5">
        <label className="grid gap-2 text-sm font-medium">
          Email
          <input className="h-10 rounded-md border border-line px-3" type="email" />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Password
          <input className="h-10 rounded-md border border-line px-3" type="password" />
        </label>
        <Button type="button">
          <LogIn size={16} aria-hidden />
          Sign in
        </Button>
        <Link href="/auth/sign-up" className="text-sm font-medium text-mint">
          Create account
        </Link>
      </form>
    </div>
  );
}
