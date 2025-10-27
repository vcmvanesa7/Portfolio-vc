"use client";
import { motion } from "framer-motion";
import styles from "./HomeSection.module.css";

export default function ValuesSection({ t }: { t: { title: string; text: string } }) {
  return (
    <section id="values" className={styles.section}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-4"
      >
        {t.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-xl"
      >
        {t.text}
      </motion.p>
    </section>
  );
}
