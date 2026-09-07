import Link from "next/link";

export function SkipLink() {
  return (
    <Link
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-green focus:px-4 focus:py-2 focus:text-ink"
    >
      Skip to content
    </Link>
  );
}
