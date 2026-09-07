import { CmsPage, generateCmsMetadata } from "@/lib/cms-page";

export const generateMetadata = () => generateCmsMetadata("contact", "/contact");

export default function ContactPage() {
  return <CmsPage slug="contact" />;
}
