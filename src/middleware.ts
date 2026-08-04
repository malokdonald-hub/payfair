import { NextRequest, NextResponse } from "next/server";

/**
 * Locales that use the translated (English) slugs for their routes.
 * The Polish locale (pl) keeps its native slugs, so it is excluded.
 */
const TRANSLATED_LOCALES = ["en", "uk", "ru"] as const;

/**
 * Mapping of legacy Polish slugs to the canonical English slugs
 * used by the route structure (src/app/[locale]/<slug>/page.tsx).
 */
const SLUG_MAP: Record<string, string> = {
  uslugi: "services",
  "o-kancelarii": "about",
  cennik: "prices",
  blog: "blog",
  kontakt: "contacts",
  "polityka-prywatnosci": "privacy",
  faq: "faq",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Split path into segments: ["", locale, slug, ...rest]
  const segments = pathname.split("/").filter(Boolean);
  const [locale, slug, ...rest] = segments;

  // Only rewrite paths that start with a translated locale and have a slug
  if (
    !locale ||
    !slug ||
    !(TRANSLATED_LOCALES as readonly string[]).includes(locale)
  ) {
    return NextResponse.next();
  }

  const targetSlug = SLUG_MAP[slug];
  if (!targetSlug || targetSlug === slug) {
    return NextResponse.next();
  }

  // Rebuild the path with the canonical slug, preserving any trailing segments
  // (e.g. hash anchors are not part of the path, but sub-paths are preserved).
  const newPath = `/${locale}/${targetSlug}${rest.length ? "/" + rest.join("/") : ""}`;

  const url = request.nextUrl.clone();
  url.pathname = newPath;

  return NextResponse.redirect(url, 308);
}

export const config = {
  // Run on all paths except static assets, images, and API routes
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)$).*)",
  ],
};
