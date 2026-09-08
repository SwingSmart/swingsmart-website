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
  crop?: { top: number; bottom: number; left: number; right: number };
  lqip?: string;
  width?: number;
  height?: number;
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
  cta?: CtaButton;
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
  primaryCta?: CtaButton;
  secondaryCta?: CtaButton;
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
  overlay?: "light" | "medium" | "dark";
  image?: CmsImage;
  videoUrl?: string;
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
  cta?: CtaButton;
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
  intro?: string;
  categorySlug?: string;
  featuredOnly?: boolean;
  limit?: number;
};

export type PartnerGridSection = {
  _type: "partnerGrid";
  _key: string;
  heading?: string;
  intro?: string;
  featuredOnly?: boolean;
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
  intro?: string;
  items: FeatureItem[];
};

export type TestimonialsSection = {
  _type: "testimonials";
  _key: string;
  heading?: string;
  intro?: string;
  featuredOnly?: boolean;
  limit?: number;
};

export type StatisticsSection = {
  _type: "statistics";
  _key: string;
  heading?: string;
  intro?: string;
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
  showForm?: boolean;
  showDetails?: boolean;
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
  _type?: string;
  title: string;
  slug: string;
  seo?: SeoFields;
  sections: PageSection[];
};

export type EventPackage = {
  _id?: string;
  _type?: string;
  title: string;
  shortName: string;
  slug: string;
  subtitle?: string;
  summary: string;
  description?: PortableBlock[];
  priceLabel: string;
  durationLabel?: string;
  includes: string[];
  extras?: string[];
  featured?: boolean;
  heroImage?: CmsImage;
  gallery?: CmsImage[];
  cta?: CtaButton;
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
  alt?: string;
  caption?: string;
  venue?: string;
  date?: string;
  featured?: boolean;
  image: CmsImage;
  categories: string[];
};

export type Partner = {
  _id?: string;
  name: string;
  summary?: string;
  url?: string;
  featured?: boolean;
  sortOrder?: number;
  caseStudyUrl?: string;
  logo?: CmsImage;
};

export type Testimonial = {
  _id?: string;
  quote: string;
  attribution: string;
  person?: string;
  organisation?: string;
  role?: string;
  featured?: boolean;
  image?: CmsImage;
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
