import type { Metadata } from "next";
import { LazyHeader, LazyFooter, LazyPageSection } from "@/components/Lazy";
import contentPl from "../../../../data/content.pl.json";
import contentEn from "../../../../data/content.en.json";
import contentUk from "../../../../data/content.uk.json";
import contentRu from "../../../../data/content.ru.json";

export const dynamic = "force-static";

const CONTENT: Record<string, typeof contentPl> = {
  pl: contentPl,
  en: contentEn,
  uk: contentUk,
  ru: contentRu,
};

const LOCALES = ["pl", "en", "uk", "ru"] as const;


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const data = CONTENT[locale] || CONTENT.pl;
  const baseUrl = data.siteConfig.url;

  const alternatesLanguages: Record<string, string> = {};
  for (const loc of LOCALES) {
    alternatesLanguages[loc] = `${baseUrl}/${loc}/contacts`;
  }
  alternatesLanguages["x-default"] = `${baseUrl}/pl/contacts`;

  return {
    title: data.contacts.title,
    description: data.contacts.meta_description,
    alternates: {
      canonical: `${baseUrl}/${locale}/contacts`,
      languages: alternatesLanguages,
    },
    openGraph: {
      title: data.contacts.title,
      description: data.contacts.meta_description,
      url: `${baseUrl}/${locale}/contacts`,
      siteName: data.siteConfig.brandFull,
      locale: locale === "pl" ? "pl_PL" : locale === "en" ? "en_US" : locale === "uk" ? "uk_UA" : "ru_RU",
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/og/og-default.webp`,
          width: 1200,
          height: 630,
          alt: data.siteConfig.brandFull,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.contacts.title,
      description: data.contacts.meta_description,
      images: [`${baseUrl}/images/og/og-default.webp`],
    },
  };
}


export default async function ContactsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = CONTENT[locale] || CONTENT.pl;
  const { siteConfig } = data;

  return (
    <>
      <LazyHeader locale={locale} brandName={siteConfig.brandName} phone={siteConfig.phone} />
      <LazyPageSection html={data.contacts.jsx} />
      <LazyFooter
        locale={locale}
        brandFull={siteConfig.brandFull}
        address={siteConfig.address}
        phone={siteConfig.phone}
        email={siteConfig.email}
        hoursWeekday={siteConfig.hoursWeekday}
        hoursWeekend={siteConfig.hoursWeekend}
        facebook={siteConfig.facebook}
        linkedin={siteConfig.linkedin}
      />

    </>
  );
}
