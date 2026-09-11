import type { ReactNode } from "react";
import { PinMark } from "@/components/brand/PinMark";

export function Container({
  children,
  className = "",
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 ${narrow ? "max-w-copy" : "max-w-shell"} ${className}`}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-24 lg:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-green-soft">
      <PinMark className="h-3.5 w-2.5 text-green-mid" />
      {children}
    </p>
  );
}

export function DisplayHeading({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag
      className={`font-display text-4xl leading-[1.06] tracking-tight text-cream sm:text-5xl ${className}`}
    >
      {children}
    </Tag>
  );
}

export function SectionIntro({
  heading,
  intro,
  eyebrow,
  className = "",
}: {
  heading?: string;
  intro?: string;
  eyebrow?: string;
  className?: string;
}) {
  if (!heading && !intro && !eyebrow) return null;
  return (
    <div className={`mb-10 max-w-2xl sm:mb-14 ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {heading ? <DisplayHeading>{heading}</DisplayHeading> : null}
      {intro ? (
        <p className={`max-w-xl text-base leading-7 text-muted sm:text-lg ${heading ? "mt-4" : ""}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
