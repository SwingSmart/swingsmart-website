export function EmptyState({
  title,
  text,
}: {
  title: string;
  text?: string;
}) {
  return (
    <div className="px-1 py-10 sm:py-14">
      <p className="font-display text-2xl font-medium text-cream sm:text-3xl">{title}</p>
      {text ? (
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">{text}</p>
      ) : null}
    </div>
  );
}
