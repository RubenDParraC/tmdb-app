import "./globals.css";

// Types
import type { Metadata } from "next";

// Context
import { LanguageProvider } from "@/context/language-context/language-context";

// Components
import Header from "@/components/header/header";

/**
 * Metadata for the TMDB application layout.
 * Includes default SEO values.
 */
export const metadata: Metadata = {
  title: "TMDB",
  description: "Prueba técnica INLAZE",
};

/**
 * RootLayout - The main layout component for the TMDB app.
 * Provides global context and structure for the app.
 *
 * @param {React.ReactNode} children - The content to render inside the layout.
 * @returns JSX.Element
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Language context provider */}
      <LanguageProvider>
        <body className="bg-zinc-800 max-w-[1456px] justify-self-center">
          {/* Global header */}
          <Header />
          {/* Page content */}
          {children}
        </body>
      </LanguageProvider>
    </html>
  );
}
