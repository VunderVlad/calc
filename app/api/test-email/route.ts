// calcba1/app/api/test-email/route.ts
import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import * as React from "react";

import PlanEmail from "../../../emails/PlanEmail";
import type { CalcResult } from "@/lib/calc";

export async function GET() {
  const calc: CalcResult = {
    bmr: 1500,
    tdee: 2000,
    targetCalories: 1800,
    proteinG: 120,
    fatG: 60,
    carbsG: 180,
  };

  // Typed without any
  const weekPlan: Array<Record<string, unknown>> = [];
  const grocery: string[] = [];

  // Render email to string
  const emailHtml: string = await render(
    React.createElement(PlanEmail, {
      calc,
      weekPlan,
      grocery,
      lang: "en",
    })
  );

  return new NextResponse(emailHtml, {
    headers: { "Content-Type": "text/html" },
  });
}
