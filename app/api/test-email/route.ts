import { NextResponse } from "next/server";
import PlanEmail from "@/emails/PlanEmail";

export async function GET() {
  const html = PlanEmail({
    lang: "ua", // ✅ use "ua"
    calc: { targetCalories: 2500, proteinG: 160, fatG: 70, carbsG: 320 },
    weekPlan: [
      { day: "Monday", meals: [{ name: "Oatmeal" }, { name: "Chicken & Rice" }] },
    ],
    grocery: ["Oats — 500g", "Chicken breast — 2kg", "Rice — 1kg"],
  });

  return new NextResponse(html as any, {
    headers: { "Content-Type": "text/html" },
  });
}
