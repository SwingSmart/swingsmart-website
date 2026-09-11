export function EmptyState({
  title,
  text,
}: {
  title: string;
  text?: string;
}) {
  return (
    <div className="border border-dashed border-rule px-6 py-12 text-center sm:py-16">
      <p className="font-display text-2xl text-cream sm:text-3xl">{title}</p>
      {text ? (
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">{text}</p>
      ) : null}
    </div>
  );
}
