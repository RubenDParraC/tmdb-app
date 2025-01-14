"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Importing types to improve type safety and code clarity
import type React from "react";
import type { Language, LanguageContextProps } from "./types";

// Creating a context to manage the language in the application.
// The default value is 'undefined', meaning the context is initially empty.
const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

// LanguageProvider is the component that wraps the entire app to provide the language context.
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Using useState hook to manage the current language state in the app. The initial language is set to 'ES' (Spanish).
  const [language, setLanguage] = useState<Language>("ES");

  useEffect(() => {
    const languageStorage = localStorage.getItem("language");
    setLanguage(languageStorage === "EN" ? "EN" : "ES");
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    // Provides the context to child components, passing both the current language and the function to change it.
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// useLanguage is a custom hook used to consume the context and access the current language.
export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);

  // If the context is undefined (e.g., called outside of a LanguageProvider), we throw an error.
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  // Returns the context, which contains both the language and the function to update it.
  return context;
};
