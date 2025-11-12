// app/layout.tsx
import { cookies } from "next/headers";
import { I18nProvider, type Lang } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import "./globals.css";

export const metadata = {
  title: "DonetsFit Calculator",
  description: "Personalized fitness calculator",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ⬇️ await cookies()
  const cookieStore = await cookies();
  const cookieLang = (cookieStore.get("lang")?.value ?? "en") as Lang;
  const initialLang: Lang =
    cookieLang === "sk" || cookieLang === "ua" ? cookieLang : "en";

  return (
    <html lang={initialLang} suppressHydrationWarning>
      <body>
        <I18nProvider key={initialLang} initialLang={initialLang}>
          <LanguageSwitcher />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
