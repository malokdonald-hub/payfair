import type { ReactNode } from "react";
import type { Metadata } from "next";
import { LazyFloatingContact } from "@/components/Lazy";
import ScrollAnimator from "@/components/ScrollAnimator";
import contentPl from "../../../data/content.pl.json";
import contentEn from "../../../data/content.en.json";
import contentUk from "../../../data/content.uk.json";
import contentRu from "../../../data/content.ru.json";


export function generateStaticParams() {
  return [{ locale: "pl" }, { locale: "en" }, { locale: "uk" }, { locale: "ru" }];
}

const contentByLocale: Record<string, typeof contentPl> = {
  pl: contentPl,
  en: contentEn,
  uk: contentUk,
  ru: contentRu,
};

const LOCALES = ["pl", "en", "uk", "ru"] as const;

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const content = contentByLocale[locale] ?? contentPl;
  const { siteConfig } = content;
  const baseUrl = siteConfig.url;

  // Build hreflang alternates for every locale
  const alternatesLanguages: Record<string, string> = {};
  for (const loc of LOCALES) {
    alternatesLanguages[loc] = `${baseUrl}/${loc}`;
  }
  // x-default points to the default (Polish) version
  alternatesLanguages["x-default"] = `${baseUrl}/pl`;

  return {
    title: {
      default: content.home.title,
      template: `%s | ${siteConfig.brandFull}`,
    },
    description: content.home.meta_description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: alternatesLanguages,
    },
    openGraph: {
      title: content.home.title,
      description: content.home.meta_description,
      url: `${baseUrl}/${locale}`,
      siteName: siteConfig.brandFull,
      locale: locale === "pl" ? "pl_PL" : locale === "en" ? "en_US" : locale === "uk" ? "uk_UA" : "ru_RU",
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/og/og-default.webp`,
          width: 1200,
          height: 630,
          alt: siteConfig.brandFull,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.home.title,
      description: content.home.meta_description,
      images: [`${baseUrl}/images/og/og-default.webp`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale }: { locale: string } = await params;
  const content = contentByLocale[locale] ?? contentPl;
  const { siteConfig } = content;

  return (
    <div className="font-body flex flex-col min-h-full">
      <ScrollAnimator />
      {children}
      <LazyFloatingContact
        phone={siteConfig.phone}
        whatsapp={siteConfig.whatsapp}
        telegram={siteConfig.telegram}
      />

    </div>
  );
}
