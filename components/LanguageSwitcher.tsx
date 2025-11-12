"use client";
import { useI18n } from "@/lib/i18n"; // ✅ correct import (uppercase I)

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n(); // ✅ correct capitalization
  
  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        right: 50,
        display: "flex",
        gap: "8px",
        zIndex: 1000,
      }}
    >
      {(["en", "sk", "ua"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            padding: "6px 12px",
            borderRadius: "12px",
            background: lang === l ? "#ef4444" : "transparent",
            color: lang === l ? "#fff" : "#aaa",
            border: "1px solid #555",
            fontWeight: lang === l ? "bold" : "normal",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
