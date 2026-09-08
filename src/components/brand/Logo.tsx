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
        className="h-[3.7rem] w-[3.7rem] object-contain object-left sm:h-[4.4rem] sm:w-[4.4rem]"
        priority={priority}
      />
    </Link>
  );
}
