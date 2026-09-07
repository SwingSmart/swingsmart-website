import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  style?: "primary" | "secondary";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  style = "primary",
  className = "",
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition";
  const styles =
    style === "secondary"
      ? "border border-mist/25 text-mist hover:border-green hover:text-green"
      : "bg-green text-ink hover:bg-green-bright";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
