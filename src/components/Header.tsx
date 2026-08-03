"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

type HeaderProps = {
  locale: string;
  brandName: string;
  phone: string;
};

const NAV_ITEMS: Record<string, { home: string; services: string; about: string; prices: string; blog: string; contacts: string; faq: string }> = {
  pl: { home: "Strona główna", services: "Usługi", about: "O kancelarii", prices: "Cennik", blog: "Blog", contacts: "Kontakt", faq: "FAQ" },
  en: { home: "Home", services: "Services", about: "About", prices: "Pricing", blog: "Blog", contacts: "Contact", faq: "FAQ" },
  uk: { home: "Головна", services: "Послуги", about: "Про нас", prices: "Ціни", blog: "Блог", contacts: "Контакти", faq: "FAQ" },
  ru: { home: "Главная", services: "Услуги", about: "О нас", prices: "Цены", blog: "Блог", contacts: "Контакты", faq: "FAQ" },
};

export default function Header({ locale, brandName, phone }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const t = NAV_ITEMS[locale] || NAV_ITEMS.pl;
  const base = `/${locale}`;

  const links = [
    { href: `${base}`, label: t.home },
    { href: `${base}/services`, label: t.services },
    { href: `${base}/about`, label: t.about },
    { href: `${base}/prices`, label: t.prices },
    { href: `${base}/blog`, label: t.blog },
    { href: `${base}/faq`, label: t.faq },
    { href: `${base}/contacts`, label: t.contacts },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href={base} className="font-[Playfair_Display] text-xl md:text-2xl font-bold text-white">
            {brandName}
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="px-5 py-2.5 bg-[#B92D2D] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#D63838] transition-colors duration-300"
            >
              {phone}
            </a>
          </div>

          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="lg:hidden flex flex-col gap-1 pb-6 pt-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-gray-300 hover:text-white transition-colors uppercase tracking-wider py-2"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="mt-3 inline-flex items-center justify-center px-5 py-3 bg-[#B92D2D] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#D63838] transition-colors duration-300"
            >
              {phone}
            </a>
          </div>
        )}
      </div>
    </motion.header>
  );
}
