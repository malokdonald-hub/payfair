import { readFileSync, writeFileSync } from "node:fs";

// Process pl, en, uk content files (NOT ru).
const files = ["pl", "en", "uk"];

for (const locale of files) {
  const path = `data/content.${locale}.json`;
  const data = JSON.parse(readFileSync(path, "utf8"));

  for (const key of Object.keys(data)) {
    const section = data[key];
    if (!section || typeof section.jsx !== "string") continue;

    section.jsx = section.jsx.replace(/<img\s([^>]*?)\/?>/g, (match, attrs) => {
      // Skip if already processed
      if (/\bwidth=/.test(attrs) && /\bheight=/.test(attrs)) return match;

      const isHero = /hero-bg\.webp/.test(attrs);

      // Add width/height
      let newAttrs = attrs;
      if (!/\bwidth=/.test(newAttrs)) newAttrs += ` width="1200"`;
      if (!/\bheight=/.test(newAttrs)) newAttrs += ` height="800"`;

      // Add loading
      if (!/\bloading=/.test(newAttrs)) {
        newAttrs += isHero ? ` loading="eager"` : ` loading="lazy"`;
      }

      // Add priority for hero
      if (isHero && !/\bpriority\b/.test(newAttrs)) {
        newAttrs += ` priority`;
      }

      return `<img ${newAttrs} />`;
    });
  }

  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  console.log(`Updated ${path}`);
}
