import { CmsPage, generateCmsMetadata } from "@/lib/cms-page";

export const generateMetadata = () => generateCmsMetadata("home", "/");

export default function HomePage() {
  return <CmsPage slug="home" />;
}
