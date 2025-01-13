// Defining a type for the possible language values in the application.
// The language can either be "ES" for Spanish or "EN" for English.
export type Language = "ES" | "EN";

// Interface for the structure of the LanguageContext's value.
// It contains:
// - `language`: the current language in the application (either "ES" or "EN")
// - `setLanguage`: a function to change the current language to either "ES" or "EN"
export interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}
