"use client";
import { motion } from "framer-motion";
import styles from "./HomeSection.module.css";


type SkillsStack = {
  frontend: string[];
  animations: string[];
  "3D": string[];
};

type SkillsProps = {
  t: {
    title: string;
    stack: SkillsStack;
  };
};

export default function SkillsSection({ t }: SkillsProps): JSX.Element {
  return (
    <section id="skills" className={styles.section}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-8"
      >
        {t.title}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["frontend", "animations", "3D"].map((key) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="font-semibold mb-2 capitalize">{key}</h3>
            <ul>
              {(t.stack as SkillsStack)[key as keyof SkillsStack].map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
