import type { Metadata } from "next";
import { LazyHeader, LazyFooter, LazyPageSection, LazyLeadForm } from "@/components/Lazy";
import contentPl from "../../../data/content.pl.json";
import contentEn from "../../../data/content.en.json";
import contentUk from "../../../data/content.uk.json";
import contentRu from "../../../data/content.ru.json";

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
    alternatesLanguages[loc] = `${baseUrl}/${loc}`;
  }
  alternatesLanguages["x-default"] = `${baseUrl}/pl`;

  return {
    title: data.home.title,
    description: data.home.meta_description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: alternatesLanguages,
    },
    openGraph: {
      title: data.home.title,
      description: data.home.meta_description,
      url: `${baseUrl}/${locale}`,
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
      title: data.home.title,
      description: data.home.meta_description,
      images: [`${baseUrl}/images/og/og-default.webp`],
    },
  };
}


// Split the home jsx so the lead form can be placed right after the statistics block.
function splitHomeJsx(jsx: string): [string, string] {
  const statsStart = jsx.indexOf('<section class="bg-[#0A0A0A] border-t border-white/10 py-16">');
  const aboutStart = jsx.indexOf('<section class="bg-white py-16 md:py-24">', statsStart);
  if (statsStart === -1 || aboutStart === -1) {
    return [jsx, ""];
  }
  return [jsx.slice(0, aboutStart), jsx.slice(aboutStart)];
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = CONTENT[locale] || CONTENT.pl;
  const { siteConfig } = data;
  const baseUrl = siteConfig.url;
  const [homeTop, homeRest] = splitHomeJsx(data.home.jsx);


  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteConfig.brandFull,
    url: `${baseUrl}/${locale}`,
    image: `${baseUrl}/images/og/og-default.webp`,
    logo: `${baseUrl}/images/logo/logo-main.svg`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "PLN",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Warszawa",
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.lat,
      longitude: siteConfig.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    sameAs: [siteConfig.facebook, siteConfig.linkedin],
    founder: {
      "@type": "Person",
      name: `${siteConfig.lawyerFirstName} ${siteConfig.lawyerLastName}`,
      jobTitle: siteConfig.lawyerTitle,
    },
    areaServed: "PL",
    availableLanguage: ["pl", "en", "de"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LazyHeader locale={locale} brandName={siteConfig.brandName} phone={siteConfig.phone} />
      <LazyPageSection html={homeTop} />
      <LazyLeadForm locale={locale} />
      {homeRest && <LazyPageSection html={homeRest} />}
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


