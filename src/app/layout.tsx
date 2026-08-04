import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";


const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const SITE_URL = "https://payfair.pl";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {

  metadataBase: new URL(SITE_URL),
  title: {
    default: "Payfair Kancelaria Adwokacka",
    template: "%s | Payfair Kancelaria Adwokacka",
  },
  description: "Payfair Kancelaria Adwokacka — Adwokat Artur Witkowski, Warszawa",
  applicationName: "Payfair Kancelaria Adwokacka",
  authors: [{ name: "Payfair Kancelaria Adwokacka" }],
  formatDetection: { telephone: true },
  icons: {
    icon: [
      { url: "/images/logo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/logo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/images/logo/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/images/logo/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Payfair Kancelaria Adwokacka",
    images: [
      {
        url: `${SITE_URL}/images/og/og-default.webp`,
        width: 1200,
        height: 630,
        alt: "Payfair Kancelaria Adwokacka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_URL}/images/og/og-default.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
        {/* Google Fonts preconnect — establish early connections before font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href={SITE_URL} />
        <link rel="dns-prefetch" href={SITE_URL} />
      </head>

      <body className={`${playfair.variable} ${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );

}
