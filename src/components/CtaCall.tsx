"use client";

import { motion } from "framer-motion";

type CtaCallProps = {
  locale: string;
  phone: string;
};

const LABELS: Record<string, { title: string; subtitle: string; button: string }> = {
  pl: {
    title: "Masz pytania dotyczące Twojej sprawy?",
    subtitle: "Skontaktuj się z nami — pierwsza konsultacja telefoniczna do 30 minut bezpłatna.",
    button: "Zadzwoń teraz",
  },
  en: {
    title: "Have questions about your case?",
    subtitle: "Get in touch with us — the first telephone consultation (up to 30 minutes) is free of charge.",
    button: "Call Now",
  },
  uk: {
    title: "Маєте питання щодо вашої справи?",
    subtitle: "Зв'яжіться з нами — перша телефонна консультація до 30 хвилин безкоштовна.",
    button: "Зателефонувати зараз",
  },
  ru: {
    title: "Есть вопросы по вашему делу?",
    subtitle: "Свяжитесь с нами — первая телефонная консультация до 30 минут бесплатна.",
    button: "Позвонить сейчас",
  },
};

export default function CtaCall({ locale, phone }: CtaCallProps) {
  const t = LABELS[locale] || LABELS.pl;
  const telHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <section className="bg-[#0A0A0A] py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="font-[Playfair_Display] text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
          {t.title}
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">{t.subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={telHref}
            className="px-8 py-4 bg-[#B92D2D] text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#D63838] transition-colors duration-300 inline-flex items-center justify-center"
          >
            {t.button} — {phone}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
