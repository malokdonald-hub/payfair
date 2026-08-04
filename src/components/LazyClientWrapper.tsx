"use client";

import dynamic from "next/dynamic";
import type { ComponentType, ReactNode } from "react";

// LazyClientWrapper is a generic wrapper that uses next/dynamic with
// { ssr: false } to defer loading of heavy / below-the-fold components
// (forms, widgets, footer) until they are needed on the client.
// This reduces the initial server-rendered bundle and improves
// time-to-interactive.
export default function LazyClientWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

// Helper to create a lazy client-only component from any component.
export function lazyClient<T extends ComponentType<any>>(
  loader: () => Promise<{ default: T }>
) {
  return dynamic(loader, { ssr: false });
}
