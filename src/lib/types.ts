export type SeoFields = {
  title?: string;
  description?: string;
  ogImage?: CmsImage;
};

export type CmsImage = {
  asset?: { _ref?: string; _id?: string };
  alt?: string;
  url?: string;
  hotspot?: { x: number; y: number };
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type Navigation = {
  items: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

export type ContactDetails = {
  email: string;
  phones: string[];
  location?: string;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type SiteSettings = {
  siteName: string;
  tagline: string;
  footerNote?: string;
  contact: ContactDetails;
  socials: SocialLink[];
  defaultSeo: SeoFields;
};

export type PortableSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks?: string[];
};

export type PortableBlock = {
  _type: "block";
  _key: string;
  style?: string;
  listItem?: "bullet" | "number";
  children: PortableSpan[];
  markDefs?: { _key: string; _type: string; href?: string }[];
};

export type CtaButton = {
  label: string;
  href: string;
  style?: "primary" | "secondary";
};

export type FeatureItem = {
  _key: string;
  title: string;
  text: string;
};

export type StatItem = {
  _key: string;
  value: string;
  label: string;
};

export type FaqItem = {
  _key: string;
  question: string;
  answer: string;
};

export type HeroSection = {
  _type: "hero";
  _key: string;
  eyebrow?: string;
  heading: string;
  subheading?: string;
  image?: CmsImage;
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
};

export type RichTextSection = {
  _type: "richText";
  _key: string;
  heading?: string;
  body: PortableBlock[];
};

export type TextAndImageSection = {
  _type: "textAndImage";
  _key: string;
  heading?: string;
  body: PortableBlock[];
  image?: CmsImage;
  imagePosition?: "left" | "right";
};

export type ImageSection = {
  _type: "imageBlock";
  _key: string;
  image?: CmsImage;
  caption?: string;
};

export type GallerySection = {
  _type: "gallery";
  _key: string;
  heading?: string;
  categorySlug?: string;
  limit?: number;
};

export type PartnerGridSection = {
  _type: "partnerGrid";
  _key: string;
  heading?: string;
  intro?: string;
};

export type PackageGridSection = {
  _type: "packageGrid";
  _key: string;
  heading?: string;
  intro?: string;
  featuredOnly?: boolean;
};

export type FeatureGridSection = {
  _type: "featureGrid";
  _key: string;
  heading?: string;
  items: FeatureItem[];
};

export type TestimonialsSection = {
  _type: "testimonials";
  _key: string;
  heading?: string;
};

export type StatisticsSection = {
  _type: "statistics";
  _key: string;
  items: StatItem[];
};

export type FaqSection = {
  _type: "faq";
  _key: string;
  heading?: string;
  items: FaqItem[];
};

export type CtaSection = {
  _type: "cta";
  _key: string;
  heading: string;
  text?: string;
  button?: CtaButton;
};

export type ContactBlockSection = {
  _type: "contactBlock";
  _key: string;
  heading?: string;
  text?: string;
};

export type PageSection =
  | HeroSection
  | RichTextSection
  | TextAndImageSection
  | ImageSection
  | GallerySection
  | PartnerGridSection
  | PackageGridSection
  | FeatureGridSection
  | TestimonialsSection
  | StatisticsSection
  | FaqSection
  | CtaSection
  | ContactBlockSection;

export type PageDoc = {
  _id?: string;
  title: string;
  slug: string;
  seo?: SeoFields;
  sections: PageSection[];
};

export type EventPackage = {
  _id?: string;
  title: string;
  shortName: string;
  slug: string;
  subtitle?: string;
  summary: string;
  priceLabel: string;
  durationLabel?: string;
  includes: string[];
  extras?: string[];
  featured?: boolean;
  seo?: SeoFields;
  sections?: PageSection[];
};

export type GalleryCategory = {
  title: string;
  slug: string;
};

export type GalleryItem = {
  _id?: string;
  title: string;
  image: CmsImage;
  categories: string[];
};

export type Partner = {
  _id?: string;
  name: string;
  summary?: string;
  url?: string;
  logo?: CmsImage;
};

export type Testimonial = {
  _id?: string;
  quote: string;
  attribution: string;
  role?: string;
};

export type SiteContent = {
  settings: SiteSettings;
  navigation: Navigation;
  pages: Record<string, PageDoc>;
  packages: EventPackage[];
  gallery: GalleryItem[];
  galleryCategories: GalleryCategory[];
  partners: Partner[];
  testimonials: Testimonial[];
};
