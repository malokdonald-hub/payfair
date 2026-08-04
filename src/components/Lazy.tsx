"use client";

import dynamic from "next/dynamic";
import LazyClientWrapper, { lazyClient } from "@/components/LazyClientWrapper";

// Heavy / widget components are lazy-loaded on the client to reduce the
// initial server-rendered bundle and improve time-to-interactive.
// Only below-the-fold components (forms, widget, footer) are wrapped in
// LazyClientWrapper — components visible immediately (header, page section)
// are kept eager to avoid layout shift.

export const LazyHeader = dynamic(() => import("@/components/Header"), {
  ssr: false,
  loading: () => <div className="h-16 md:h-20 bg-[#0A0A0A]" aria-hidden="true" />,
});

export const LazyPageSection = dynamic(() => import("@/components/PageSection"));

// Below-the-fold components wrapped in LazyClientWrapper (ssr: false)
export const LazyFooter = lazyClient(() => import("@/components/Footer"));

export const LazyLeadForm = lazyClient(() => import("@/components/LeadForm"));

export const LazyCtaCall = lazyClient(() => import("@/components/CtaCall"));

export const LazyFloatingContact = lazyClient(() => import("@/components/FloatingContact"));

// Re-export the wrapper for use in pages
export { LazyClientWrapper };
