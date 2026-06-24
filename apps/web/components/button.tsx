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
        "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold uppercase transition focus:outline-none focus:ring-2 focus:ring-copper focus:ring-offset-2 focus:ring-offset-paper disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-white text-paper hover:bg-copper hover:text-white",
        variant === "secondary" && "border border-copper/60 bg-brown text-white hover:border-copper hover:bg-copper/20",
        variant === "danger" && "bg-berry text-white hover:bg-rose-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
