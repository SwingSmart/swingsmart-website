import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Layout";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-end pb-24 pt-32">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-green">
          404
        </p>
        <h1 className="font-display mt-4 text-5xl text-cream">That hole doesn’t exist.</h1>
        <p className="mt-4 max-w-md text-muted">
          The page you’re looking for has been moved or never made the cut.
        </p>
        <div className="mt-8">
          <ButtonLink href="/">Back to the clubhouse</ButtonLink>
        </div>
      </Container>
    </div>
  );
}
