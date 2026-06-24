import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
};

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-ink text-white hover:bg-zinc-700",
        variant === "secondary" && "border border-line bg-white text-ink hover:bg-zinc-50",
        variant === "danger" && "bg-berry text-white hover:bg-rose-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
