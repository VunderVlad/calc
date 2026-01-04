// app/api/calc/route.ts
import { NextResponse } from "next/server";

import { userSchema } from "@/lib/validators/userSchema";
import { trainerSchema } from "@/lib/validators/trainerSchema";

import { calcMacros } from "@/lib/calc/calcMacros";
import { calcTrainerMacros } from "@/lib/calc/calcTrainerMacros";

import { generateWeekPlan } from "@/lib/meals/generateWeekPlan";
import { generateTrainerWeekPlan } from "@/lib/meals/generateTrainerWeekPlan";

import { resend } from "@/lib/resend/resendClient";

import { buildUserEmailHtml } from "@/lib/email/mainTemplate";
import { buildTrainerEmailHtml } from "@/lib/email/trainerTemplate";

import { normalizeLanguage, t } from "@/lib/i18n/i18n";
import { ZodError } from "zod";
import { generateNutritionPlanPdf } from "@/lib/pdf/generatePdf";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const mode: "user" | "trainer" =
      body.mode === "trainer" ? "trainer" : "user";

    const language = normalizeLanguage(body.language);

    /* ================= TRAINER MODE ================= */
    if (mode === "trainer") {
      const input = trainerSchema.parse(body);

      const macros = calcTrainerMacros({
        manualCalories: input.manualCalories,
        manualProtein: input.manualProtein,
        manualCarbs: input.manualCarbs,
        manualFat: input.manualFat,
        // ❗ weightKg УБРАН — его нет в trainer-форме
      });

      const week = generateTrainerWeekPlan({
        allergens: input.allergens,
        dislikes: input.dislikes ?? [],
      });

      const html = buildTrainerEmailHtml({
        language,
        name: input.name,
        macros,
        week,
        coachNotes: input.coachNotes,
        allergens: input.allergens,
        dislikes: input.dislikes ?? [],
      });

      if (resend) {
        // Generate PDF with error handling
        let pdfBuffer: Buffer | null = null;
        try {
          pdfBuffer = await generateNutritionPlanPdf({
            language,
            name: input.name,
            email: input.email,
            macros,
            week,
          });
        } catch (pdfError) {
          console.error("PDF generation failed:", pdfError);
          // Continue without PDF - email will still be sent
        }

        const emailOptions: any = {
          from: "DonetsFit <coach@donetsfit.com>",
          to: input.email,
          subject: t(language, "email.trainerSubject"),
          html,
        };

        // Attach PDF if generation was successful
        if (pdfBuffer) {
          emailOptions.attachments = [
            {
              filename: `DonetsFit-Plan-${input.name || "Trainer"}.pdf`,
              content: pdfBuffer, // Resend accepts Buffer directly
            },
          ];
          console.log(`✅ PDF generated and attached to email: ${pdfBuffer.length} bytes`);
        } else {
          console.warn("⚠️ PDF buffer is null, email sent without attachment");
        }

        await resend.emails.send(emailOptions);
      }

      return NextResponse.json({ success: true });
    }

    /* ================= USER MODE ================= */
    const input = userSchema.parse(body);

    const macros = calcMacros({
      age: input.age,
      gender: input.gender,
      heightCm: input.heightCm,
      weightKg: input.weightKg,
      activity: input.activity,
      goal: input.goal,
    });

    const week = generateWeekPlan({
      allergens: input.allergens,
      dislikes: input.dislikes ?? [],
    });

    const html = buildUserEmailHtml({
      language,
      name: input.name,
      macros,
      week,
      allergens: input.allergens,
      dislikes: input.dislikes,
    });

    if (resend) {
      // Generate PDF with error handling
      let pdfBuffer: Buffer | null = null;
      try {
        pdfBuffer = await generateNutritionPlanPdf({
          language,
          name: input.name,
          email: input.email,
          activity: input.activity,
          goal: input.goal,
          macros,
          week,
        });
      } catch (pdfError) {
        console.error("PDF generation failed:", pdfError);
        // Continue without PDF - email will still be sent
      }

      const emailOptions: any = {
        from: "DonetsFit <coach@donetsfit.com>",
        to: input.email,
        subject: t(language, "email.userSubject"),
        html,
      };

      // Attach PDF if generation was successful
      if (pdfBuffer) {
        emailOptions.attachments = [
          {
            filename: `DonetsFit-Plan-${input.name || "User"}.pdf`,
            content: pdfBuffer, // Resend accepts Buffer directly
          },
        ];
        console.log(`✅ PDF generated and attached to email: ${pdfBuffer.length} bytes`);
      } else {
        console.warn("⚠️ PDF buffer is null, email sent without attachment");
      }

      await resend.emails.send(emailOptions);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API /calc error:", error);
    
    // User input validation errors (Zod) or meal generation errors should be 400
    if (error instanceof ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: error.errors.map(e => e.message).join(", ") 
        },
        { status: 400 }
      );
    }
    
    // Meal generation errors (not enough meals) are user mistakes
    if (error instanceof Error && error.message.includes("Not enough meals")) {
      return NextResponse.json(
        { 
          success: false, 
          message: error.message 
        },
        { status: 400 }
      );
    }
    
    // All other errors are server errors
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
