"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type FooterProps = {
  locale: string;
  brandFull: string;
  address: string;
  phone: string;
  email: string;
  hoursWeekday: string;
  hoursWeekend: string;
  facebook: string;
  linkedin: string;
};

const LABELS: Record<string, { rights: string; privacy: string; nav: string }> = {
  pl: { rights: "Wszelkie prawa zastrzeżone.", privacy: "Polityka prywatności", nav: "Nawigacja" },
  en: { rights: "All rights reserved.", privacy: "Privacy Policy", nav: "Navigation" },
  uk: { rights: "Усі права захищено.", privacy: "Політика конфіденційності", nav: "Навігація" },
  ru: { rights: "Все права защищены.", privacy: "Политика конфиденциальности", nav: "Навигация" },
};

export default function Footer({
  locale,
  brandFull,
  address,
  phone,
  email,
  hoursWeekday,
  hoursWeekend,
  facebook,
  linkedin,
}: FooterProps) {
  const t = LABELS[locale] || LABELS.pl;
  const base = `/${locale}`;
  const year = 2026;

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-[#0A0A0A] border-t border-white/10 text-gray-400"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div>
            <p className="font-[Playfair_Display] text-xl font-bold text-white mb-4">{brandFull}</p>
            <p className="text-sm leading-relaxed">{address}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#B92D2D] font-semibold mb-4">{t.nav}</p>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href={`${base}/services`} className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href={`${base}/about`} className="hover:text-white transition-colors">About</Link></li>
              <li><Link href={`${base}/prices`} className="hover:text-white transition-colors">Prices</Link></li>
              <li><Link href={`${base}/blog`} className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href={`${base}/faq`} className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#B92D2D] font-semibold mb-4">Contact</p>
            <ul className="flex flex-col gap-2 text-sm">
              <li><a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">{phone}</a></li>
              <li><a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a></li>
              <li>{hoursWeekday}</li>
              <li>{hoursWeekend}</li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#B92D2D] font-semibold mb-4">Social</p>
            <div className="flex gap-4">
              <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z"/></svg>
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {year} {brandFull}. {t.rights}</p>
          <Link href={`${base}/privacy`} className="hover:text-white transition-colors">{t.privacy}</Link>
        </div>
      </div>
    </motion.footer>
  );
}
