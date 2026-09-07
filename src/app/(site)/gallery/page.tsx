import { CmsPage, generateCmsMetadata } from "@/lib/cms-page";

export const generateMetadata = () => generateCmsMetadata("gallery", "/gallery");

export default function GalleryPage() {
  return <CmsPage slug="gallery" />;
}
