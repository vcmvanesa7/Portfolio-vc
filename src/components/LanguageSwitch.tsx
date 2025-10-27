"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Switch } from "@headlessui/react";

export default function LanguageSwitch({
  currentLang,
}: {
  currentLang: "es" | "en";
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Switch state based on current language prop
  const [enabled, setEnabled] = useState(currentLang === "en");

  // Keep visual switch in sync when the server prop changes
  useEffect(() => {
    setEnabled(currentLang === "en");
  }, [currentLang]);

  const toggleLanguage = () => {
    // Get the current locale from the pathname (more reliable)
    // Match leading segment like "/es" or "/en"
    const match = pathname.match(/^\/(es|en)(\/|$)/);
    const pathLocale = match ? (match[1] as "es" | "en") : currentLang;

    // Decide the new locale
    const newLocale = pathLocale === "es" ? "en" : "es";

    // Replace only the leading locale segment, preserving rest of path and query
    // If no locale found in path, prefix it
    const newPath = match
      ? pathname.replace(/^\/(es|en)/, `/${newLocale}`)
      : `/${newLocale}${pathname}`;

    // update visual state optimistically
    setEnabled(newLocale === "en");

    // Navigate to the new path (client-side)
    router.push(newPath);
  };

  return (
    <Switch
      checked={enabled}
      onChange={toggleLanguage}
      className={`${
        enabled ? "bg-purple-600" : "bg-gray-400"
      } relative inline-flex h-7 w-14 items-center rounded-full transition`}
    >
      <span
        className={`${
          enabled ? "translate-x-7" : "translate-x-1"
        } inline-block h-5 w-5 transform rounded-full bg-white transition`}
      />
      <span className="absolute left-1 text-[10px]">ES</span>
      <span className="absolute right-1 text-[10px]">EN</span>
    </Switch>
  );
}
