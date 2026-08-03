import type { ReactNode } from "react";
import FloatingContact from "@/components/FloatingContact";
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

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale }: { locale: string } = await params;
  const content = contentByLocale[locale] ?? contentPl;
  const { siteConfig } = content;

  return (
    <div className="font-body flex flex-col min-h-full">
      {children}
      <FloatingContact
        phone={siteConfig.phone}
        whatsapp={siteConfig.whatsapp}
        telegram={siteConfig.telegram}
      />
    </div>
  );
}