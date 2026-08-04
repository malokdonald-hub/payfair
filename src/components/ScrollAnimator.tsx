"use client";

import { useEffect, useRef } from "react";

/**
 * Client-only helper that observes all page sections and adds the
 * `fade-in-up` class (see globals.css @keyframes fade-in-up) once a
 * section enters the viewport.
 */
export default function ScrollAnimator() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      ".page-section, section"
    );

    if (!sections.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    sections.forEach((section) => observerRef.current?.observe(section));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return null;
}
