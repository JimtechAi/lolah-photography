"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const storageKey = "lolah-loader-seen";

export default function BrandLoader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const hasSeenLoader = window.sessionStorage.getItem(storageKey) === "true";

    if (hasSeenLoader) {
      return false;
    }

    window.sessionStorage.setItem(storageKey, "true");
    return true;
  });

  useEffect(() => {
    if (!visible) {
      return;
    }

    const timer = window.setTimeout(() => setVisible(false), 1800);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#050403] px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_35%,rgba(228,186,93,0.16)_0%,rgba(228,186,93,0)_72%)]" />
          <motion.div
            className="relative text-center text-[#f5dfb2]"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.p
              className="font-serif text-[4rem] leading-none tracking-[0.08em] md:text-[5.5rem]"
              initial={{ letterSpacing: "0.22em", opacity: 0 }}
              animate={{ letterSpacing: "0.08em", opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              LP
            </motion.p>
            <motion.p
              className="mt-4 text-3xl tracking-[0.45em] md:text-5xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              LOLAH
            </motion.p>
            <motion.div
              className="mx-auto mt-4 h-px w-28 bg-gradient-to-r from-transparent via-[#f0cf84] to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.55, ease: "easeOut" }}
            />
            <motion.p
              className="mt-4 text-xs tracking-[0.72em] text-[#d8bb78] md:text-sm"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: "easeOut" }}
            >
              PHOTOGRAPHY
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}