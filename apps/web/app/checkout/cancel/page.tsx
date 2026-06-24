import Link from "next/link";
import { Button } from "../../../components/button";
import { PageHeader } from "../../../components/page-header";

export default function CheckoutCancelPage() {
  return (
    <div className="max-w-xl">
      <PageHeader title="Checkout canceled" />
      <Link href="/">
        <Button variant="secondary">Return home</Button>
      </Link>
    </div>
  );
}
