import Image from "next/image";
import Link from "next/link";

export function Logo({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label="SwingSmart UK home"
    >
      <Image
        src="/brand/wordmark.png"
        alt="SwingSmart — Beyond Golf"
        width={1378}
        height={466}
        className="h-8 w-auto sm:h-9 xl:h-10"
        priority={priority}
      />
    </Link>
  );
}
