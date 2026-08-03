"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FloatingContactProps = {
  phone: string;
  whatsapp: string;
  telegram: string;
};

export default function FloatingContact({ phone, whatsapp, telegram }: FloatingContactProps) {
  const [open, setOpen] = useState(false);
  const telHref = `tel:${phone.replace(/\s/g, "")}`;
  const waHref = `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`;
  const tgHref = `https://t.me/${telegram.replace(/^@/, "")}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-end gap-3"
          >
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.92 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15h-.01a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 01-1.26-4.38c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 012.42 5.83c0 4.55-3.7 8.23-8.26 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.24-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.36-.77-1.86-.2-.48-.4-.42-.56-.42-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.24-.86.85-.86 2.07 0 1.21.88 2.39 1 2.55.12.17 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.14-1.19-.06-.11-.23-.17-.48-.29z" />
              </svg>
            </a>
            <a
              href={tgHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="w-12 h-12 rounded-full bg-[#229ED9] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.94 4.3c.24-1.03-.72-1.86-1.62-1.5L2.4 9.98c-.98.38-.97 1.85.02 2.2l4.35 1.55 1.7 5.53c.2.65 1.03.83 1.5.32l2.42-2.6 4.32 3.24c.75.56 1.83.14 2.02-.79L21.94 4.3zm-3.5 2.44l-8.03 7.24-.25 3.4-1.44-4.7 9.4-6.5c.2-.14.42.12.32.3z" />
              </svg>
            </a>
            <a
              href={telHref}
              aria-label="Call"
              className="w-12 h-12 rounded-full bg-[#B92D2D] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Contact menu"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-14 h-14 rounded-full bg-[#B92D2D] hover:bg-[#D63838] flex items-center justify-center shadow-xl transition-colors duration-300"
      >
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
