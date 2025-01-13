export type Language = "ES" | "EN";

export interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}
