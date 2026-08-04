import type { Metadata } from "next";
import { LazyHeader, LazyFooter, LazyPageSection, LazyCtaCall, LazyLeadForm } from "@/components/Lazy";

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
    alternatesLanguages[loc] = `${baseUrl}/${loc}/about`;
  }
  alternatesLanguages["x-default"] = `${baseUrl}/pl/about`;

  return {
    title: data.about.title,
    description: data.about.meta_description,
    alternates: {
      canonical: `${baseUrl}/${locale}/about`,
      languages: alternatesLanguages,
    },
    openGraph: {
      title: data.about.title,
      description: data.about.meta_description,
      url: `${baseUrl}/${locale}/about`,
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
      title: data.about.title,
      description: data.about.meta_description,
      images: [`${baseUrl}/images/og/og-default.webp`],
    },
  };
}


// Split the about jsx so the lead form can be placed right after the portrait section.
function splitAboutJsx(jsx: string): [string, string] {
  const portraitStart = jsx.indexOf('<section class="bg-white py-16 md:py-24">');
  const careerStart = jsx.indexOf('<section class="bg-[#FAFAFA] py-16 md:py-24">', portraitStart);
  if (portraitStart === -1 || careerStart === -1) {
    return [jsx, ""];
  }
  return [jsx.slice(0, careerStart), jsx.slice(careerStart)];
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = CONTENT[locale] || CONTENT.pl;
  const { siteConfig } = data;
  const [aboutTop, aboutRest] = splitAboutJsx(data.about.jsx);

  return (
    <>
      <LazyHeader locale={locale} brandName={siteConfig.brandName} phone={siteConfig.phone} />
      <LazyPageSection html={aboutTop} />
      <LazyLeadForm locale={locale} />
      {aboutRest && <LazyPageSection html={aboutRest} />}
      <LazyCtaCall locale={locale} phone={siteConfig.phone} />

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
