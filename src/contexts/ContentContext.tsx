"use client";

import { createContext, useContext } from "react";

type Content = {
  siteConfig: {
    brandFull: string;
    brandName: string;
    url: string;
    phone: string;
    whatsapp: string;
    telegram: string;
    email: string;
    address: string;
    facebook: string;
    linkedin: string;
    hoursWeekday: string;
    hoursWeekend: string;
    lawyerFirstName: string;
    lawyerLastName: string;
    lawyerTitle: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  home: {
    title: string;
    meta_description: string;
    jsx: string;
  };
  [key: string]: unknown;
};

const ContentContext = createContext<Content | null>(null);

export function ContentProvider({ children, content }: { children: React.ReactNode; content: Content }) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}