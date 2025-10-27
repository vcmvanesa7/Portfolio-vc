import Link from "next/link";
import LanguageSwitch from "@/components/LanguageSwitch";
import { getDictionary } from "@/contenti18n/get-dictionary";

// Navbar component receives the current locale from the page layout or page params
export default async function Navbar({
  locale,
}: {
  locale: "es" | "en";
}) {
  // Load translations for the navigation links
  const t = await getDictionary(locale, "nav");

  return (
    <nav className="w-full flex justify-between items-center p-4 border-b">
      {/* Navigation links with current locale in the URL */}
      <div className="flex gap-4">
        <Link href={`/${locale}`}>{t.home}</Link>
        <Link href={`/${locale}/projects`}>{t.projects}</Link>
        <Link href={`/${locale}/contact`}>{t.contact}</Link>
      </div>

      {/* Language switcher receives the current locale */}
      <LanguageSwitch currentLang={locale} />
    </nav>
  );
}
