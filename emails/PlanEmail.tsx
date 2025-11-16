// calcba1/emails/PlanEmail.tsx
import * as React from "react";
import en from "@/locales/en";
import sk from "@/locales/sk";
import ua from "@/locales/ua";

export type Lang = "en" | "sk" | "ua";

export interface DayMeal {
  name: string;
  ingredients?: { name: string; amount: number }[];
}

export interface WeekDay {
  day?: string;
  meals?: DayMeal[];
}

export type PlanEmailProps = {
  lang?: Lang;
  calc: {
    targetCalories: number;
    proteinG: number;
    fatG: number;
    carbsG: number;
  };
  weekPlan?: WeekDay[];   // ✅ FIXED — NO "any"
  grocery?: string[];
};

/**
 * Localized email template using translations from /locales
 */
export default function PlanEmail({
  lang = "en",
  calc,
  weekPlan = [],
  grocery = [],
}: PlanEmailProps) {
  const dict = lang === "sk" ? sk : lang === "ua" ? ua : en;
  const t = dict.email;
  const brand = dict.brand;

  return (
    <html>
      <body
        style={{
          fontFamily: "Arial, sans-serif",
          background: "#fafafa",
          color: "#111",
          padding: "20px",
        }}
      >
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{
            maxWidth: 640,
            margin: "0 auto",
            background: "#ffffff",
            borderRadius: 8,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr>
              <td
                style={{
                  background: "#ff4d4d",
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: 700,
                  textAlign: "center",
                  padding: "16px",
                }}
              >
                {t.subjectPreview}
              </td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={{ padding: "24px 32px" }}>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 12,
                  }}
                >
                  {brand}
                </p>

                {/* Daily Targets */}
                <h3
                  style={{
                    fontSize: 18,
                    color: "#ff4d4d",
                    marginTop: 24,
                    marginBottom: 8,
                  }}
                >
                  {t.dailyTargets}
                </h3>

                <ul style={{ fontSize: 15, lineHeight: 1.6, margin: 0 }}>
                  <li>
                    Calories: <strong>{calc.targetCalories} kcal</strong>
                  </li>
                  <li>
                    Protein: <strong>{calc.proteinG} g</strong>
                  </li>
                  <li>
                    Fat: <strong>{calc.fatG} g</strong>
                  </li>
                  <li>
                    Carbs: <strong>{calc.carbsG} g</strong>
                  </li>
                </ul>

                {/* WEEK PLAN */}
                {weekPlan.length > 0 && (
                  <>
                    <h3
                      style={{
                        fontSize: 18,
                        color: "#ff4d4d",
                        marginTop: 24,
                        marginBottom: 8,
                      }}
                    >
                      {t.mealPlan}
                    </h3>

                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: 14,
                      }}
                    >
                      <tbody>
                        {weekPlan.map((day: WeekDay, idx: number) => (
                          <tr key={idx}>
                            <td
                              style={{
                                borderBottom: "1px solid #eee",
                                padding: "6px 0",
                                verticalAlign: "top",
                              }}
                            >
                              <strong>{day.day || `Day ${idx + 1}`}</strong>:{" "}
                              {Array.isArray(day.meals)
                                ? day.meals
                                    .map((m: DayMeal) => m?.name ?? "")
                                    .join(", ")
                                : ""}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}

                {/* GROCERY LIST */}
                {grocery.length > 0 && (
                  <>
                    <h3
                      style={{
                        fontSize: 18,
                        color: "#ff4d4d",
                        marginTop: 24,
                        marginBottom: 8,
                      }}
                    >
                      {t.grocery}
                    </h3>

                    <ul
                      style={{
                        fontSize: 14,
                        lineHeight: 1.6,
                        margin: 0,
                        paddingLeft: 16,
                      }}
                    >
                      {grocery.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}

                {/* TRAINING */}
                <h3
                  style={{
                    fontSize: 18,
                    color: "#ff4d4d",
                    marginTop: 24,
                    marginBottom: 8,
                  }}
                >
                  {t.trainingPlan}
                </h3>
                <p style={{ fontSize: 14, color: "#555" }}>
                  Coming soon — personalized workouts for your plan.
                </p>

                <p
                  style={{
                    fontSize: 13,
                    color: "#777",
                    marginTop: 32,
                    borderTop: "1px solid #eee",
                    paddingTop: 12,
                  }}
                >
                  {t.disclaimer}
                  <br />
                  <strong>{brand}</strong>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
