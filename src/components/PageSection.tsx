"use client";

import { motion } from "framer-motion";

export default function PageSection({ html }: { html: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="page-section flex-1 w-full overflow-x-hidden"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}


