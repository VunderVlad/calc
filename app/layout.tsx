// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { LanguageSelect } from "@/components/i18n/LanguageSelect";
import Link from "next/link";

export const metadata = {
  title: "DonetsFit Calculator",
  description: "Personalized nutrition and meal plan calculator.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-primary text-primary">
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <header className="border-b border-white/10 p-4 md:p-6">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <Link href="/" className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    <span className="text-white">Donets</span>
                    <span className="text-[#FF4D4D]">FIT</span>
                  </h1>
                </Link>
                
                <nav className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
                  <Link 
                    href="/user" 
                    className="text-secondary hover:text-white transition-colors text-sm md:text-base"
                  >
                    User Calculator
                  </Link>
                  <Link 
                    href="/trainer" 
                    className="text-secondary hover:text-white transition-colors text-sm md:text-base"
                  >
                    Trainer Calculator
                  </Link>
                  <Link 
                    href="https://donetsfit.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-white transition-colors text-sm md:text-base"
                  >
                    DonetsFit.com
                  </Link>
              <LanguageSelect />
                </nav>
              </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t border-white/10 p-4 text-xs text-secondary text-center">
              © {new Date().getFullYear()} DonetsFit
            </footer>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
