import { PageSections } from "@/components/sections/PageSections";
import {
  getGallery,
  getGalleryCategories,
  getPackages,
  getPage,
  getPartners,
  getSettings,
  getTestimonials,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export async function generateCmsMetadata(slug: string, path: string) {
  const [page, settings] = await Promise.all([getPage(slug), getSettings()]);
  return buildMetadata(page?.seo, settings, path);
}

export async function CmsPage({ slug }: { slug: string }) {
  const [page, settings, packages, gallery, galleryCategories, partners, testimonials] =
    await Promise.all([
      getPage(slug),
      getSettings(),
      getPackages(),
      getGallery(),
      getGalleryCategories(),
      getPartners(),
      getTestimonials(),
    ]);
  if (!page) notFound();
  return (
    <PageSections
      sections={page.sections}
      settings={settings}
      packages={packages}
      gallery={gallery}
      galleryCategories={galleryCategories}
      partners={partners}
      testimonials={testimonials}
    />
  );
}
