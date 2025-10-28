// src/app/[locale]/page.tsx
import { getDictionary } from "@/contenti18n/get-dictionary";
import type { HomeDictionary } from "@/types/dictionaries";
import HeroSection from "@/components/home/HeroSection";
import HomeSections from "@/components/home/HomeSections";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: "es" | "en" }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale, "home") as HomeDictionary;

  return (
    <main className="overflow-visible">
      <HeroSection t={t.hero} />
      <HomeSections t={t} />
    </main>
  );
}
