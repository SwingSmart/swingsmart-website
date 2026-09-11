import { CmsPage, generateCmsMetadata } from "@/lib/cms-page";
import { getPageSlugs } from "@/lib/content";
import { notFound, redirect } from "next/navigation";

const reserved = new Set([
  "packages",
  "gallery",
  "about",
  "contact",
  "partnerships",
  "studio",
]);

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPageSlugs();
  return slugs
    .filter((slug) => slug !== "home" && !slug.includes("/") && !reserved.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (slug === "home") {
    return generateCmsMetadata("home", "/");
  }
  if (reserved.has(slug)) {
    return {};
  }
  return generateCmsMetadata(slug, `/${slug}`);
}

export default async function DynamicCmsPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "home") redirect("/");
  if (reserved.has(slug)) notFound();
  return <CmsPage slug={slug} />;
}
