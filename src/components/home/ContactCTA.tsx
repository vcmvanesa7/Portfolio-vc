"use client";
import { motion } from "framer-motion";
import styles from "./HomeSection.module.css";

export default function ContactCTA({ t }: { t: { title: string; button: string } }) {
  return (
    <section id="contact" className={styles.section}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-4"
      >
        {t.title}
      </motion.h2>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ delay: 0.3 }}
        className="bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700"
      >
        {t.button}
      </motion.button>
    </section>
  );
}
