import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSection from "@/components/PageSection";
import contentPl from "../../../../data/content.pl.json";
import contentEn from "../../../../data/content.en.json";
import contentUk from "../../../../data/content.uk.json";
import contentRu from "../../../../data/content.ru.json";

const CONTENT: Record<string, typeof contentPl> = {
  pl: contentPl,
  en: contentEn,
  uk: contentUk,
  ru: contentRu,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const data = CONTENT[locale] || CONTENT.pl;
  return {
    title: data.faq.title,
    description: data.faq.meta_description,
  };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = CONTENT[locale] || CONTENT.pl;
  const { siteConfig } = data;

  return (
    <>
      <Header locale={locale} brandName={siteConfig.brandName} phone={siteConfig.phone} />
      <PageSection html={data.faq.jsx} />
      <Footer
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
