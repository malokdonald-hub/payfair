import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, "..", "data");

// Image dimensions discovered from the actual files in public/images
const IMAGE_DIMS = {
  "/images/home/hero-bg.webp": { w: 5376, h: 3072 },
  "/images/home/hero-portrait.webp": { w: 1376, h: 768 },
  "/images/home/about-teaser.webp": { w: 5376, h: 3072 },
  "/images/home/blog-teaser-1.webp": { w: 1376, h: 768 },
  "/images/home/blog-teaser-2.webp": { w: 1376, h: 768 },
  "/images/home/blog-teaser-3.webp": { w: 1376, h: 768 },
  "/images/services/service-karne.webp": { w: 1376, h: 768 },
  "/images/services/service-cywilne.webp": { w: 1376, h: 768 },
  "/images/services/service-rodzinne.webp": { w: 1376, h: 768 },
  "/images/services/service-gospodarcze.webp": { w: 1376, h: 768 },
  "/images/services/service-administracyjne.webp": { w: 1376, h: 768 },
  "/images/services/service-etpcz.webp": { w: 1376, h: 768 },
  "/images/about/portrait-main.webp": { w: 1376, h: 768 },
  "/images/about/office-1.webp": { w: 1376, h: 768 },
  "/images/about/office-2.webp": { w: 1376, h: 768 },
  "/images/blog/blog-1.webp": { w: 1376, h: 768 },
  "/images/blog/blog-2.webp": { w: 1376, h: 768 },
  "/images/blog/blog-3.webp": { w: 1376, h: 768 },
};

// Hero images get priority (fetchpriority=high, eager), everything else lazy
const HERO_IMAGES = new Set([
  "/images/home/hero-bg.webp",
  "/images/home/hero-portrait.webp",
]);

// sizes attribute per image based on typical layout
function sizesFor(src) {
  if (src.includes("hero-bg")) return "100vw";
  if (src.includes("hero-portrait")) return "(min-width: 768px) 50vw, 100vw";
  if (src.includes("about-teaser")) return "(min-width: 768px) 50vw, 100vw";
  if (src.includes("about/portrait-main")) return "(min-width: 768px) 50vw, 100vw";
  if (src.includes("about/office")) return "25vw";
  if (src.includes("services/")) return "(min-width: 768px) 50vw, 100vw";
  if (src.includes("blog/")) return "100vw";
  return "100vw";
}

function processFile(file) {
  const path = join(dataDir, file);
  let content = readFileSync(path, "utf8");

  // Match <img ... /> tags (self-closing) in the raw JSON string.
  // Note: inside JSON the attribute quotes are escaped as \"
  const imgRegex = /<img\s+([^>]*?)\/>/g;
  let match;
  let changed = false;

  while ((match = imgRegex.exec(content)) !== null) {
    const fullTag = match[0];
    const attrs = match[1];

    // Extract src (handles both " and \" quoting)
    const srcMatch = attrs.match(/src=\\?"([^"]+)\\?"/);
    if (!srcMatch) continue;
    const src = srcMatch[1];


    const dims = IMAGE_DIMS[src];
    if (!dims) continue; // skip images we don't have dimensions for (e.g. ru-only)

    const isHero = HERO_IMAGES.has(src);
    const loading = isHero ? 'loading="eager"' : 'loading="lazy"';
    const fetchpriority = isHero ? 'fetchpriority="high"' : "";
    const width = `width="${dims.w}"`;
    const height = `height="${dims.h}"`;
    const srcset = `srcset="${src} ${dims.w}w"`;
    const sizes = `sizes="${sizesFor(src)}"`;

    // Build new attrs, preserving existing ones
    let newAttrs = attrs;
    // Remove any existing loading/fetchpriority/width/height/srcset/sizes to avoid duplicates
    newAttrs = newAttrs
      .replace(/\s+loading="[^"]*"/g, "")
      .replace(/\s+fetchpriority="[^"]*"/g, "")
      .replace(/\s+width="[^"]*"/g, "")
      .replace(/\s+height="[^"]*"/g, "")
      .replace(/\s+srcset="[^"]*"/g, "")
      .replace(/\s+sizes="[^"]*"/g, "");

    const additions = [loading, fetchpriority, width, height, srcset, sizes]
      .filter(Boolean)
      .join(" ");

    // The HTML lives inside a JSON string, so attribute quotes must be escaped
    const escapedAdditions = additions.replace(/"/g, '\\"');

    const newTag = `<img ${newAttrs} ${escapedAdditions} />`;
    content = content.replace(fullTag, newTag);
    changed = true;

  }

  if (changed) {
    writeFileSync(path, content, "utf8");
    console.log(`Updated: ${file}`);
  } else {
    console.log(`No changes: ${file}`);
  }
}

["content.pl.json", "content.en.json", "content.uk.json"].forEach(processFile);
console.log("Done.");
