"use client";

// Language switcher removed - only showing static PL indicator

type LanguageSwitcherProps = {
  locale: string;
  className?: string;
};

export default function LanguageSwitcher({ locale, className = "" }: LanguageSwitcherProps) {
  // Only show PL language indicator (no switching functionality)
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="px-1.5 py-1 text-xs font-semibold uppercase tracking-wider text-white">
        PL
      </span>
    </div>
  );
}