import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex min-h-12 items-center justify-center px-7 text-[0.8rem] font-medium tracking-[0.14em] transition-colors duration-300";

const variants: Record<Variant, string> = {
  primary: "bg-green text-on-green hover:bg-green-mid",
  secondary:
    "border border-cream/40 bg-transparent text-cream hover:border-cream hover:bg-cream/5",
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
