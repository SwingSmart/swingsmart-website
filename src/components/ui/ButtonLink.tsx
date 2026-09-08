import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex min-h-11 items-center justify-center rounded-tight px-5 text-sm font-medium tracking-[0.04em] transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-green text-on-green hover:bg-green-mid",
  secondary:
    "border border-cream/35 bg-transparent text-cream hover:border-green-soft hover:text-green-soft",
};

export function ButtonLink({
  href,
  children,
  style = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  style?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[style]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={`${base} ${variants[variant]} disabled:opacity-60 ${className}`} {...props}>
      {children}
    </button>
  );
}
