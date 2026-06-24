import type { ReactNode } from "react";

export function PageHeader({
  title,
  eyebrow,
  actions
}: {
  title: string;
  eyebrow?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-line pb-5 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? <p className="mb-1 text-sm font-medium text-mint">{eyebrow}</p> : null}
        <h1 className="text-2xl font-semibold tracking-normal text-ink md:text-3xl">{title}</h1>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
