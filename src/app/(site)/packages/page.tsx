import { CmsPage, generateCmsMetadata } from "@/lib/cms-page";

export const generateMetadata = () => generateCmsMetadata("packages", "/packages");

export default function PackagesPage() {
  return <CmsPage slug="packages" />;
}
