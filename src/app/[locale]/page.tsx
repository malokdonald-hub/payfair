import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSection from "@/components/PageSection";
import contentPl from "../../../data/content.pl.json";
import contentEn from "../../../data/content.en.json";
import contentUk from "../../../data/content.uk.json";
import contentRu from "../../../data/content.ru.json";

const CONTENT: Record<string, typeof contentPl> = {
  pl: contentPl,
  en: contentEn,
  uk: contentUk,
  ru: contentRu,
};

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const data = CONTENT[params.locale] || CONTENT.pl;
  return {
    title: data.home.title,
    description: data.home.meta_description,
  };
}

export default function HomePage({ params }: { params: { locale: string } }) {
  const data = CONTENT[params.locale] || CONTENT.pl;
  const { siteConfig } = data;

  return (
    <>
      <Header locale={params.locale} brandName={siteConfig.brandName} phone={siteConfig.phone} />
      <PageSection html={data.home.jsx} />
      <Footer
        locale={params.locale}
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
