import type { ReactNode } from "react";

export function generateStaticParams() {
  return [{ locale: "pl" }, { locale: "en" }, { locale: "uk" }, { locale: "ru" }];
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale }: { locale: string } = await params;
  void locale;

  return <div className="font-body flex flex-col min-h-full">{children}</div>;
}
