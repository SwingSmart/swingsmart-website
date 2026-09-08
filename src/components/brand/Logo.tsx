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
        src="/brand/logo.png"
        alt="SwingSmart — Beyond Golf"
        width={180}
        height={180}
        className="h-14 w-14 object-contain sm:h-16 sm:w-16"
        priority={priority}
      />
    </Link>
  );
}
