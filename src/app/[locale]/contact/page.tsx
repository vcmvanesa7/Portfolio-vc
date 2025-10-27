import { getDictionary } from "@/contenti18n/get-dictionary";
import ContactForm from "@/app/[locale]/contact/ContactForm";

// Props type for dynamic route parameter (locale)
type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  //  Await params because it's a Promise in async Server Components
  const { locale } = await params;

  //  Safely restrict locale to supported values
  if (locale !== "es" && locale !== "en") {
    throw new Error(`Invalid locale: ${locale}`);
  }

  // Load the translation JSON for the "contact" section based on locale
  const t = await getDictionary(locale, "contact");

  return (
    <main>
      {/* Pass translated content as props to ContactForm */}
      <ContactForm translations={t} />
    </main>
  );
}
