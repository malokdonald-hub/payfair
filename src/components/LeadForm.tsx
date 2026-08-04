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

type FormState = "idle" | "sending" | "success" | "error";

export default function LeadForm({ locale, withSelect = false }: LeadFormProps) {
  const t = LABELS[locale] || LABELS.pl;
  const services = SERVICES[locale] || SERVICES.pl;
  
  // Form fields state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  
  // Validation errors
  const [errors, setErrors] = useState<{ name?: string; phone?: string; service?: string }>({});
  
  // Form state: idle, sending, success, error
  const [formState, setFormState] = useState<FormState>("idle");
  
  const PHONE_REGEX = /^\+?[\d\s-]{7,15}$/;

  const validateForm = (): boolean => {
    const newErrors: { name?: string; phone?: string; service?: string } = {};
    
    // Name validation - required
    if (!name.trim()) {
      newErrors.name = "Поле обязательно для заполнения";
    }
    
    // Phone validation - required and regex
    if (!phone.trim()) {
      newErrors.phone = "Номер телефона обязателен";
    } else if (!PHONE_REGEX.test(phone)) {
      newErrors.phone = "Некорректный номер телефона (от 7 до 15 символов)";
    }
    
    // Service validation - required when withSelect is true
    if (withSelect && !service) {
      newErrors.service = "Пожалуйста, выберите услугу";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setFormState("error");
      return;
    }
    
    setFormState("sending");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Success
    setFormState("success");
    setName("");
    setPhone("");
    setService("");
    setErrors({});
    
    // Reset after 3 seconds
    setTimeout(() => {
      setFormState("idle");
    }, 3000);
  };

  const handleReset = () => {
    setFormState("idle");
    setName("");
    setPhone("");
    setService("");
    setErrors({});
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
        
        {/* Success Notification */}
        {formState === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 font-semibold"
          >
            {t.success}
          </motion.div>
        )}
        
        {/* Error Notification */}
        {formState === "error" && Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 font-semibold"
          >
            Пожалуйста, исправьте ошибки в форме
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              placeholder={t.name}
              aria-label={t.name}
              disabled={formState === "sending"}
              className={`w-full border ${errors.name ? "border-red-500" : "border-white/15"} bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#B92D2D] transition-colors ${formState === "sending" ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1 text-left pl-1">{errors.name}</p>
            )}
          </div>
          
          <div className="flex-1">
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              placeholder={t.phone}
              aria-label={t.phone}
              disabled={formState === "sending"}
              className={`w-full border ${errors.phone ? "border-red-500" : "border-white/15"} bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#B92D2D] transition-colors ${formState === "sending" ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1 text-left pl-1">{errors.phone}</p>
            )}
          </div>
          
          {withSelect && (
            <div className="flex-1">
              <select
                name="service"
                value={service}
                onChange={(e) => {
                  setService(e.target.value);
                  if (errors.service) setErrors({ ...errors, service: undefined });
                }}
                aria-label={t.service}
                disabled={formState === "sending"}
                className={`w-full border ${errors.service ? "border-red-500" : "border-white/15"} bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#B92D2D] transition-colors ${formState === "sending" ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <option value="" className="text-[#0A0A0A]">{t.service}</option>
                {services.map((s) => (
                  <option key={s} value={s} className="text-[#0A0A0A]">{s}</option>
                ))}
              </select>
              {errors.service && (
                <p className="text-red-400 text-xs mt-1 text-left pl-1">{errors.service}</p>
              )}
            </div>
          )}
          
          <button
            type="submit"
            disabled={formState === "sending"}
            className="px-8 py-3 bg-[#B92D2D] text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#D63838] transition-colors duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formState === "sending" ? "Отправка..." : t.button}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
