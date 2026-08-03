import type { ReactNode } from "react";

export function generateStaticParams() {
  return [{ locale: "pl" }, { locale: "en" }, { locale: "uk" }, { locale: "ru" }];
}

export default function LocaleLayout({
  children,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return <div className="font-body flex flex-col min-h-full">{children}</div>;
}
