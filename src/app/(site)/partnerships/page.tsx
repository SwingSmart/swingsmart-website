import { CmsPage, generateCmsMetadata } from "@/lib/cms-page";

export const generateMetadata = () =>
  generateCmsMetadata("partnerships", "/partnerships");

export default function PartnershipsPage() {
  return <CmsPage slug="partnerships" />;
}
