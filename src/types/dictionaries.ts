// Type for any translation section in the project
export interface DictionarySection {
  // Common field in all sections
  title?: string;

  // Contact page extra fields (optional so no other page breaks)
  placeholderFullName?: string;
  placeholderEmail?: string;
  placeholderMessage?: string;
  sending?: string;
  send?: string;

  // Allow additional keys for flexibility in future pages (strings, arrays, or nested objects)
  [key: string]: string | string[] | Record<string, unknown> | undefined;
}

export type HomeDictionary = {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    button: string;
  };
  about: {
    title: string;
    text: string;
  };
  skills: {
    title: string;
    stack: {
      frontend: string[];
      animations: string[];
      "3D": string[];
    };
  };
  projects: {
    title: string;
    button: string;
  };
  values: {
    title: string;
    text: string;
  };
  contact: {
    title: string;
    button: string;
  };
};
