// lib/email/trainerTemplate.ts
import type { TrainerMacroResult } from "@/lib/calc/calcTrainerMacros";
import type { WeekPlan } from "@/lib/meals/generateWeekPlan";
import type { Language } from "@/lib/i18n/i18n";
import { t } from "@/lib/i18n/i18n";

/* =========================
   HELPERS
========================= */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================
   MAIN TEMPLATE (TRAINER)
========================= */

export function buildTrainerEmailHtml(args: {
  language: Language;
  name?: string;
  macros: TrainerMacroResult;
  week: WeekPlan;
  coachNotes?: string;
  allergens?: string[];
  dislikes?: string[];
}) {
  const {
    language,
    name,
    macros,
    week,
    coachNotes = "",
    allergens = [],
    dislikes = [],
  } = args;

  return `
  <div style="font-family:system-ui;color:#0f172a;max-width:680px;margin:auto">

    <h1>
      ${t(language, "email.trainerTitle", undefined, { forName: name ? ` ${name}` : "" })}
    </h1>

    <p>
      ${t(language, "email.trainerIntro")}
    </p>

    <div style="background:#e0f2fe;border-radius:12px;padding:16px;margin:20px 0;border-left:4px solid #0ea5e9;">
      <p style="margin:0;color:#0c4a6e;font-size:16px;font-weight:500;">
        ${t(language, "email.pdfAttached", "📎 Your complete 7-day nutrition plan with detailed recipes and grocery list is attached as a PDF file.")}
      </p>
    </div>

    <div style="background:#f1f5f9;border-radius:12px;padding:16px;margin:20px 0;">
      <h3>${t(language, "email.targetsTitle")}</h3>
      <ul>
        <li>${t(language, "email.calories")}: ${macros.calories} kcal</li>
        <li>${t(language, "email.protein")}: ${macros.protein} g</li>
        <li>${t(language, "email.carbs")}: ${macros.carbs} g</li>
        <li>${t(language, "email.fat")}: ${macros.fat} g</li>
      </ul>
    </div>

    ${
      allergens.length || dislikes.length
        ? `
      <div style="background:#fff7ed;border-radius:12px;padding:16px;margin:20px 0;">
        <h3>${t(language, "email.preferencesTitle")}</h3>

        ${
          allergens.length
            ? `<p><strong>${t(language, "email.allergensAvoided")}:</strong>
               ${allergens
                 .map((a) => t(language, `filters.allergens.${a}`))
                 .join(", ")}</p>`
            : ""
        }

        ${
          dislikes.length
            ? `<p><strong>${t(language, "email.dislikesAvoided")}:</strong>
               ${dislikes
                 .map((d) => t(language, `filters.dislikes.${d}`))
                 .join(", ")}</p>`
            : ""
        }
      </div>
      `
        : ""
    }

    ${
      coachNotes
        ? `
      <div style="background:#ecfeff;border-radius:12px;padding:16px;margin:20px 0;">
        <h3>${t(language, "email.coachNotesTitle")}</h3>
        <p style="white-space:pre-line;">${escapeHtml(coachNotes)}</p>
      </div>
      `
        : ""
    }

    <div style="background:#f8fafc;border-radius:12px;padding:20px;margin:20px 0;">
      <h3 style="margin-top:0;">${t(language, "email.weekTitle", "Weekly Plan")}</h3>
      <p style="color:#475569;line-height:1.6;">
        ${t(language, "email.planInPdf", "Your complete 7-day meal plan with breakfast, lunch, dinner, and snacks for each day is included in the attached PDF. The PDF also contains detailed recipes, cooking instructions, and a complete grocery list for the week.")}
      </p>
    </div>

    <p style="margin-top:32px;">
      ${t(language, "email.footer")}
    </p>

  </div>
  `;
}
