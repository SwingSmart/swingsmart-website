import { isSanityConfigured } from "@/sanity/env";
import { Container } from "@/components/ui/Layout";
import { StudioApp } from "./studio-app";
import { metadata as studioMetadata, viewport } from "next-sanity/studio";

export { viewport };

export const metadata = {
  ...studioMetadata,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="min-h-screen bg-bg py-24">
        <Container className="max-w-xl">
          <h1 className="font-display text-4xl text-cream">Connect Sanity</h1>
          <p className="mt-4 text-muted">
            Create a Sanity project, copy the project ID into{" "}
            <code className="text-green">NEXT_PUBLIC_SANITY_PROJECT_ID</code>, and
            restart the app. Full instructions are in{" "}
            <code className="text-green">.env.example</code>.
          </p>
        </Container>
      </div>
    );
  }

  return <StudioApp />;
}
