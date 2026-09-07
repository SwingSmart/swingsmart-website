import { CmsPage, generateCmsMetadata } from "@/lib/cms-page";

export const generateMetadata = () => generateCmsMetadata("about", "/about");

export default function AboutPage() {
  return <CmsPage slug="about" />;
}
