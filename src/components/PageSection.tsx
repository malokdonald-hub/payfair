"use client";

import { motion } from "framer-motion";

export default function PageSection({ html }: { html: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 w-full overflow-x-hidden"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
