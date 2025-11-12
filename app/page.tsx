// app/page.tsx
"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Home() {
  const { t, lang } = useI18n(); // <-- translation hook

  const reset = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { height: 100%; }
  `;

  const red = "#ff4d4d";

  const page: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundColor: "#1a1a1a",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 20px",
    fontFamily:
      "'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    textRendering: "optimizeLegibility",
  };

  const content: React.CSSProperties = {
    maxWidth: 760,
    textAlign: "center",
  };

  const brand: React.CSSProperties = {
    fontSize: 36,
    fontWeight: 800,
    letterSpacing: "0.3px",
  };

  const redSpan: React.CSSProperties = { color: red };

  const sub: React.CSSProperties = {
    margin: "16px auto 28px",
    color: "#cfcfcf",
    lineHeight: 1.65,
    fontSize: 16,
    maxWidth: 640,
  };

  const bar: React.CSSProperties = {
    width: 72,
    height: 4,
    backgroundColor: red,
    borderRadius: 2,
    margin: "16px auto 24px",
  };

  const links: React.CSSProperties = {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const btnBase: React.CSSProperties = {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 800,
  };

  const btnPrimary: React.CSSProperties = {
    ...btnBase,
    background:
      "linear-gradient(180deg, rgba(255,77,77,1) 0%, rgba(255,120,120,1) 100%)",
    color: "#0b0b0b",
  };

  const btnGhost: React.CSSProperties = {
    ...btnBase,
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "#fff",
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{ __html: reset }}
        suppressHydrationWarning
      />

      <main key={lang} style={page}>
        <div style={content}>
          <h1 style={brand}>
            Donets<span style={redSpan}>Fit</span>
          </h1>

          <div style={bar} />

          <p style={sub}>
            {t.home.intro.replace("DonetsFit", "DonetsFit")} 
          </p>

          <div style={links}>
            <a
              href="https://donetsfit.com/"
              style={btnGhost}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.home.back}
            </a>

            <a
              href="https://instagram.com/donets.vlad/"
              style={btnGhost}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.home.instagram}
            </a>

            <Link href="/calculator" style={btnPrimary}>
              {t.home.goCalc}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
