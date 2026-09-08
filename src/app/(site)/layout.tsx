import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { DisableDraftMode } from "@/components/sanity/DisableDraftMode";
import { getNavigation, getSettings } from "@/lib/content";
import { localBusinessJsonLd } from "@/lib/structured-data";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { isSanityConfigured } from "@/sanity/env";
import { SanityLive } from "@/sanity/live";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, navigation] = await Promise.all([getSettings(), getNavigation()]);
  const { isEnabled } = await draftMode();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(settings)) }}
      />
      <SkipLink />
      <Header navigation={navigation} settings={settings} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer settings={settings} navigation={navigation} />
      {isSanityConfigured ? <SanityLive /> : null}
      {isEnabled ? (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      ) : null}
    </>
  );
}
