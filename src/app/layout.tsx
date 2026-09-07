import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { LivePreview } from "@/components/sanity/LivePreview";
import { getSettings } from "@/lib/content";
import { siteUrl } from "@/sanity/env";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings.defaultSeo.title || settings.siteName,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.defaultSeo.description,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink font-sans text-mist">
        {children}
        <LivePreview />
      </body>
    </html>
  );
}
