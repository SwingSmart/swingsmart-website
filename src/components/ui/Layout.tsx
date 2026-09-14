import type { ReactNode } from "react";

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
      className={`mx-auto w-full px-5 sm:px-8 lg:px-10 xl:px-12 ${narrow ? "max-w-copy" : "max-w-shell"} ${className}`}
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
    <section id={id} className={`py-20 sm:py-28 lg:py-32 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-cream/55">
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
      className={`font-display font-medium leading-[1.08] tracking-[-0.02em] text-cream text-[2.15rem] sm:text-5xl lg:text-[3.25rem] ${className}`}
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
    <div className={`mb-12 max-w-2xl sm:mb-16 ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {heading ? <DisplayHeading>{heading}</DisplayHeading> : null}
      {intro ? (
        <p className={`max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8 ${heading ? "mt-5" : ""}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
