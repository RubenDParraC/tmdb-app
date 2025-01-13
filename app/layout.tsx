import "./globals.css";

// type
import type { Metadata } from "next";

// context
import { LanguageProvider } from "@/context/language-context/language-context";

// components
import Header from "@/components/header/header";

export const metadata: Metadata = {
  title: "TMDB",
  description: "Prueba técnica INLAZE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LanguageProvider>
        <body className="bg-zinc-800">
          <Header />
          {children}
        </body>
      </LanguageProvider>
    </html>
  );
}
