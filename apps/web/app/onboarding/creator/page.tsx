import Link from "next/link";
import { ArrowRight, ImageUp } from "lucide-react";
import { Button } from "../../../components/button";
import { PageHeader } from "../../../components/page-header";

export default function CreatorOnboardingPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader title="Creator profile" eyebrow="Onboarding" />
      <form className="grid gap-4 rounded-md border border-line bg-white p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            Handle
            <input className="h-10 rounded-md border border-line px-3" placeholder="creator-name" />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Public name
            <input className="h-10 rounded-md border border-line px-3" />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-medium">
          Bio
          <textarea className="min-h-32 rounded-md border border-line px-3 py-2" />
        </label>
        <button
          type="button"
          className="flex h-28 items-center justify-center gap-2 rounded-md border border-dashed border-zinc-300 bg-zinc-50 text-sm font-medium text-zinc-600"
        >
          <ImageUp size={18} aria-hidden />
          Upload profile media
        </button>
        <Link href="/onboarding/stripe">
          <Button type="button">
            Continue
            <ArrowRight size={16} aria-hidden />
          </Button>
        </Link>
      </form>
    </div>
  );
}
