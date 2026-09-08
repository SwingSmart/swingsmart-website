import { PageSections } from "@/components/sections/PageSections";
import { PackageCards } from "@/components/packages/PackageCards";
import { PackageView } from "@/components/packages/PackageView";
import { Container, DisplayHeading, Section } from "@/components/ui/Layout";
import {
  getGallery,
  getGalleryCategories,
  getPackage,
  getPackages,
  getPage,
  getPartners,
  getSettings,
  getTestimonials,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { packageJsonLd } from "@/lib/structured-data";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const packages = await getPackages();
  return packages.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const [pkg, page, settings] = await Promise.all([
    getPackage(slug),
    getPage(`packages/${slug}`),
    getSettings(),
  ]);
  return buildMetadata(page?.seo || pkg?.seo, settings, `/packages/${slug}`);
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const [pkg, page, settings, packages, gallery, galleryCategories, partners, testimonials] =
    await Promise.all([
      getPackage(slug),
      getPage(`packages/${slug}`),
      getSettings(),
      getPackages(),
      getGallery(),
      getGalleryCategories(),
      getPartners(),
      getTestimonials(),
    ]);

  if (!pkg && !page) notFound();

  const fromCms = Boolean(pkg?._id);
  const extraSections = fromCms ? pkg?.sections || [] : [];
  const fallbackSections = !fromCms && page?.sections?.length ? page.sections : [];
  const sections = extraSections.length ? extraSections : fallbackSections;
  const sectionDocumentId = extraSections.length ? pkg?._id : page?._id;
  const sectionDocumentType = extraSections.length ? pkg?._type || "eventPackage" : "page";

  return (
    <>
      {pkg ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(packageJsonLd(pkg)) }}
        />
      ) : null}
      {fromCms && pkg ? <PackageView pkg={pkg} /> : null}
      {sections.length ? (
        <PageSections
          documentId={sectionDocumentId}
          documentType={sectionDocumentType}
          sections={sections}
          settings={settings}
          packages={packages}
          gallery={gallery}
          galleryCategories={galleryCategories}
          partners={partners}
          testimonials={testimonials}
        />
      ) : null}
      {pkg ? (
        <Section>
          <Container>
            <DisplayHeading className="mb-8 text-3xl">Other packages</DisplayHeading>
            <PackageCards packages={packages.filter((item) => item.slug !== slug)} />
          </Container>
        </Section>
      ) : null}
    </>
  );
}
