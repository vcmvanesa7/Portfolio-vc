"use client";
import { motion } from "framer-motion";

export default function HeroSection({ t }: { t: { title: string; subtitle: string; description: string; button: string } }) {
  return (
    <section id="hero" className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-black to-gray-900 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-4"
      >
        {t.title}
      </motion.h1>

      <motion.h2
    
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-2xl mb-6"
      >
        {t.subtitle}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="max-w-xl mb-6"
      >
        {t.description}
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        {t.button}
      </motion.button>
    </section>
  );
}
