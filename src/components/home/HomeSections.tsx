"use client";

import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import type { HomeDictionary } from "@/types/dictionaries";

// Importa tus componentes individuales
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import FeaturedProjects from "./FeaturedProjects";
import ValuesSection from "./ValuesSection";
import ContactCTA from "./ContactCTA";

export default function HomeSections({ t }: { t: HomeDictionary }) {
  useScrollAnimations();

  return (
    <div className="flex flex-col gap-24">
      <AboutSection t={t.about} />
      <SkillsSection t={t.skills} />
      <FeaturedProjects t={t.projects} />
      <ValuesSection t={t.values} />
      <ContactCTA t={t.contact} />
    </div>
  );
}
