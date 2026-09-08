import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableBlock } from "@/lib/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display mt-10 mb-4 text-3xl text-cream">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold text-cream">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-7 text-muted last:mb-0">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-cream">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-green underline-offset-4 hover:underline"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pl-5 text-muted">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-5 text-muted">{children}</ol>
    ),
  },
};

export function RichBody({ value }: { value?: PortableBlock[] }) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}
