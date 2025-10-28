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
        enabled ? "bg-purple-600" : "bg-gray-400 dark:bg-[#323232]"
      } relative inline-flex p-1 flex gap-2 items-center rounded-lg transition min-w-[80px]`}
    >
      <span
        className={`
          ${enabled ? "translate-x-[30px] bg-white" : "translate-x-.5 bg-[#666]"} 
          absolute inline-block h-[90%] w-[50%] transform rounded-lg transition -z-0`}
      />
      <span className="flex-1 relative">ES</span>
      <span className="flex-1 relative">EN</span>
    </Switch>
  );
}
