// lib/email/mainTemplate.ts
import { t } from "@/lib/i18n/i18n";
import type { Language } from "@/lib/i18n/i18n";
import type { WeekPlan } from "@/lib/meals/generateWeekPlan";
import type { AutoMacroResult } from "@/lib/calc/calcMacros";
import type { Allergen, DislikedProduct } from "@/lib/validators/userSchema";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


export function buildUserEmailHtml(args: {
  language: Language;
  name?: string;
  macros: AutoMacroResult;
  week: WeekPlan;
  allergens?: Allergen[];
  dislikes?: DislikedProduct[];
}): string {
  const {
    language,
    name,
    macros,
    week,
    allergens = [],
    dislikes = [],
  } = args;

  const forName = name ? ` ${name}` : "";
  const title = t(language, "email.userTitle", undefined, { forName });

  return `
  <div style="font-family:system-ui;color:#0f172a;max-width:680px;margin:auto">

    <h1>${escapeHtml(title)}</h1>

    <p>
      ${t(language, "email.thanks")}
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

    <div style="background:#f8fafc;border-radius:12px;padding:20px;margin:20px 0;">
      <h3 style="margin-top:0;">${t(language, "email.weeklyPlanTitle", "Your Weekly Plan")}</h3>
      <p style="color:#475569;line-height:1.6;">
        ${t(language, "email.planInPdf", "Your complete 7-day meal plan with breakfast, lunch, dinner, and snacks for each day is included in the attached PDF. The PDF also contains detailed recipes, cooking instructions, and a complete grocery list for the week.")}
      </p>
    </div>

    <p style="margin-top:32px;">
      ${t(language, "email.bestWishes")},<br/>
      ${t(language, "email.team")}
    </p>

  </div>
  `;
}
