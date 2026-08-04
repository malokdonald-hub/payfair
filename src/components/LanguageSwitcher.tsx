"use client";

import { usePathname, useRouter } from "next/navigation";

const LOCALES = ["pl", "en", "uk", "ru"] as const;

type LanguageSwitcherProps = {
  locale: string;
  className?: string;
};

export default function LanguageSwitcher({ locale, className = "" }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (nextLocale: string) => {
    if (nextLocale === locale) return;
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && LOCALES.includes(segments[0] as (typeof LOCALES)[number])) {
      segments[0] = nextLocale;
    } else {
      segments.unshift(nextLocale);
    }
    router.push(`/${segments.join("/")}`);
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            aria-current={active ? "true" : undefined}
            className={`px-1.5 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
              active
                ? "text-white underline underline-offset-4 decoration-[#B92D2D] decoration-2"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
