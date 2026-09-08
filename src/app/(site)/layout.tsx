import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { getNavigation, getSettings } from "@/lib/content";
import { localBusinessJsonLd } from "@/lib/structured-data";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, navigation] = await Promise.all([getSettings(), getNavigation()]);

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
    </>
  );
}
