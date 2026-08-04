"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

type LeadFormProps = {
  locale: string;
};

const LABELS: Record<
  string,
  { title: string; subtitle: string; name: string; phone: string; button: string; success: string }
> = {
  pl: {
    title: "Zamów rozmowę telefoniczną",
    subtitle: "Zostaw swoje dane, a skontaktujemy się z Tobą w ciągu 30 minut w godzinach pracy.",
    name: "Imię",
    phone: "Telefon",
    button: "Zamów rozmowę",
    success: "Dziękujemy! Oddzwonimy wkrótce.",
  },
  en: {
    title: "Request a Callback",
    subtitle: "Leave your details and we will get back to you within 30 minutes during business hours.",
    name: "Name",
    phone: "Phone",
    button: "Request a Call",
    success: "Thank you! We will call you back soon.",
  },
  uk: {
    title: "Замовити дзвінок",
    subtitle: "Залиште свої дані, і ми зв'яжемося з вами протягом 30 хвилин у робочий час.",
    name: "Ім'я",
    phone: "Телефон",
    button: "Замовити дзвінок",
    success: "Дякуємо! Ми скоро вам зателефонуємо.",
  },
  ru: {
    title: "Заказать звонок",
    subtitle: "Оставьте свои данные, и мы свяжемся с вами в течение 30 минут в рабочее время.",
    name: "Имя",
    phone: "Телефон",
    button: "Заказать звонок",
    success: "Спасибо! Мы скоро вам перезвоним.",
  },
};

export default function LeadForm({ locale }: LeadFormProps) {
  const t = LABELS[locale] || LABELS.pl;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-[#FAF0F0] py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="font-[Playfair_Display] text-2xl sm:text-3xl font-bold text-[#0A0A0A] mb-4">
          {t.title}
        </h2>
        <p className="text-gray-600 mb-8">{t.subtitle}</p>
        {submitted ? (
          <p className="text-[#B92D2D] font-semibold">{t.success}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
             <input
               type="text"
               name="name"
               placeholder={t.name}
               aria-label={t.name}
               required
               className="w-full border border-[#E5E5E5] px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#B92D2D] transition-colors"
             />
             <input
               type="tel"
               name="phone"
               placeholder={t.phone}
               aria-label={t.phone}
               required
               className="w-full border border-[#E5E5E5] px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#B92D2D] transition-colors"
             />
            <button
              type="submit"
              className="px-8 py-3 bg-[#B92D2D] text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#D63838] transition-colors duration-300 whitespace-nowrap"
            >
              {t.button}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
