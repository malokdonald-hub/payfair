"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

type LeadFormProps = {
  locale: string;
  withSelect?: boolean;
};

const LABELS: Record<
  string,
  { title: string; subtitle: string; name: string; phone: string; service: string; button: string; success: string }
> = {
  pl: {
    title: "Zamów rozmowę telefoniczną",
    subtitle: "Zostaw swoje dane, a skontaktujemy się z Tobą w ciągu 30 minut w godzinach pracy.",
    name: "Imię",
    phone: "Telefon",
    service: "Wybierz usługę",
    button: "Zamów rozmowę",
    success: "Dziękujemy! Oddzwonimy wkrótce.",
  },
  en: {
    title: "Request a Callback",
    subtitle: "Leave your details and we will get back to you within 30 minutes during business hours.",
    name: "Name",
    phone: "Phone",
    service: "Select a service",
    button: "Request a Call",
    success: "Thank you! We will call you back soon.",
  },
  uk: {
    title: "Замовити дзвінок",
    subtitle: "Залиште свої дані, і ми зв'яжемося з вами протягом 30 хвилин у робочий час.",
    name: "Ім'я",
    phone: "Телефон",
    service: "Оберіть послугу",
    button: "Замовити дзвінок",
    success: "Дякуємо! Ми скоро вам зателефонуємо.",
  },
  ru: {
    title: "Заказать звонок",
    subtitle: "Оставьте свои данные, и мы свяжемся с вами в течение 30 минут в рабочее время.",
    name: "Имя",
    phone: "Телефон",
    service: "Выберите услугу",
    button: "Заказать звонок",
    success: "Спасибо! Мы скоро вам перезвоним.",
  },
};

const SERVICES: Record<string, string[]> = {
  pl: ["Prawo karne", "Prawo cywilne", "Prawo rodzinne", "Prawo gospodarcze", "Prawo administracyjne", "ETPCz"],
  en: ["Criminal Defense", "Civil Litigation", "Family Law", "Corporate Law", "Administrative Law", "ECtHR"],
  uk: ["Кримінальне право", "Цивільне право", "Сімейне право", "Господарське право", "Адміністративне право", "ЄСПЛ"],
  ru: ["Уголовное право", "Гражданское право", "Семейное право", "Хозяйственное право", "Административное право", "ЕСПЧ"],
};

export default function LeadForm({ locale, withSelect = false }: LeadFormProps) {
  const t = LABELS[locale] || LABELS.pl;
  const services = SERVICES[locale] || SERVICES.pl;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-[#0A0A0A] py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="font-[Playfair_Display] text-xl sm:text-2xl font-bold text-white mb-2">
          {t.title}
        </h2>
        <p className="text-gray-400 text-sm mb-6">{t.subtitle}</p>
        {submitted ? (
          <p className="text-[#B92D2D] font-semibold">{t.success}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              name="name"
              placeholder={t.name}
              aria-label={t.name}
              required
              className="w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#B92D2D] transition-colors"
            />
            <input
              type="tel"
              name="phone"
              placeholder={t.phone}
              aria-label={t.phone}
              required
              className="w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#B92D2D] transition-colors"
            />
            {withSelect && (
              <select
                name="service"
                aria-label={t.service}
                className="w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#B92D2D] transition-colors"
              >
                <option value="" className="text-[#0A0A0A]">{t.service}</option>
                {services.map((s) => (
                  <option key={s} value={s} className="text-[#0A0A0A]">{s}</option>
                ))}
              </select>
            )}
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
