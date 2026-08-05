"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";


type HeaderProps = {
  locale: string;
  brandName: string;
  phone: string;
};

const NAV_LINKS = [
  { href: '/', labelKey: 'home' },
  { href: '/uslugi', labelKey: 'services' },
  { href: '/o-kancelarii', labelKey: 'about' },
  { href: '/cennik', labelKey: 'prices' },
  { href: '/blog', labelKey: 'blog' },
  { href: '/czeste-pytania', labelKey: 'faq' },
  { href: '/kontakt', labelKey: 'contacts' },
];

const NAV_ITEMS: Record<string, { home: string; services: string; about: string; prices: string; blog: string; contacts: string; faq: string }> = {
  pl: { home: "Strona główna", services: "Usługi", about: "O kancelarii", prices: "Cennik", blog: "Blog", contacts: "Kontakt", faq: "FAQ" },
  en: { home: "Home", services: "Services", about: "About", prices: "Pricing", blog: "Blog", contacts: "Contact", faq: "FAQ" },
  uk: { home: "Головна", services: "Послуги", about: "Про нас", prices: "Ціни", blog: "Блог", contacts: "Контакти", faq: "FAQ" },
  ru: { home: "Главная", services: "Услуги", about: "О нас", prices: "Цены", blog: "Блог", contacts: "Контакты", faq: "FAQ" },
};

export default function Header({ locale, brandName, phone }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = NAV_ITEMS[locale] || NAV_ITEMS.pl;

  const links = NAV_LINKS.map(link => ({
    href: link.href,
    label: t[link.labelKey as keyof typeof t]
  }));

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 bg-[#0A0A0A]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="font-[Playfair_Display] text-xl md:text-2xl font-bold text-white">
            {brandName}
          </Link>

          <nav aria-label={t.home} className="hidden lg:flex items-center gap-6">
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
            <LanguageSwitcher locale={locale} />
            <a
              href={`tel:${phone.replace(/[^\d+]/g, "")}`}
              aria-label={phone}
              className="px-5 py-2.5 bg-[#B92D2D] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#D63838] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              {phone}
            </a>
          </div>


          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white p-2"
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.25 }}
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </motion.svg>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1 pb-6 pt-2">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block text-sm text-gray-300 hover:text-white transition-colors uppercase tracking-wider py-2"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: links.length * 0.04 }}
                  className="mt-4"
                >
                  <LanguageSwitcher locale={locale} />
                </motion.div>
                <motion.a
                  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                  aria-label={phone}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: (links.length + 1) * 0.04 }}
                  className="mt-3 inline-flex items-center justify-center px-5 py-3 bg-[#B92D2D] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#D63838] transition-colors duration-300"
                >
                  {phone}
                </motion.a>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}