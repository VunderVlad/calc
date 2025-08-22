// emails/PlanEmail.tsx
import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Img,
  Link,
} from "@react-email/components";

type Meal = { name: string; calories: number };
interface DayPlan { day: string; meals: Meal[]; total: number }
interface TrainingDay { day: string; title: string; exercises: string[] }

interface Props {
  name?: string;
  sex: "male" | "female";
  age: number;
  heightCm: number;
  weightKg: number;
  activity: string;
  goal: string;
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinG: number;
  fatG: number;
  carbsG: number;
  weekPlan: DayPlan[];
  grocery: string[];
  training: TrainingDay[];
  /**
   * Optional: absolute URL to coach image shown in the header.
   * If you don’t pass it, a sensible default is used.
   */
  coachImageUrl?: string;
  /**
   * Optional: Instagram profile link. Defaults to DonetsFit.
   */
  instagramUrl?: string;
}

export default function PlanEmail(props: Props) {
  const {
    name = "athlete",
    sex,
    age,
    heightCm,
    weightKg,
    activity,
    goal,
    bmr,
    tdee,
    targetCalories,
    proteinG,
    fatG,
    carbsG,
    weekPlan,
    grocery,
    training,
    coachImageUrl = "https://donetsfit.com/Assets/coach.webp",
    instagramUrl = "https://instagram.com/donetsfit",
  } = props;

  // palette
  const red = "#ff4d4d";
  const dark = "#0f0f10";
  const gray = "#f6f9fc";
  const text = "#111827";
  const subtle = "#6b7280";
  const cardBorder = "1px solid #e5e7eb";

  return (
    <Html>
      <Head />
      <Preview>Your DonetsFit weekly plan is ready 💪</Preview>

      <Body style={{ margin: 0, backgroundColor: gray, fontFamily: "Arial, sans-serif", color: text }}>
        <Container style={{ width: "100%", maxWidth: 720, padding: "0 12px", margin: "0 auto" }}>

          {/* Header / Hero */}
          <Section
            style={{
              backgroundColor: dark,
              color: "#ffffff",
              borderRadius: "14px",
              marginTop: 20,
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", gap: 16, padding: 20, alignItems: "center" }}>
              <div>
                <Img
                  src={coachImageUrl}
                  alt="Your coach"
                  width="72"
                  height="72"
                  style={{
                    display: "block",
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    border: `2px solid ${red}`,
                    objectFit: "cover",
                    backgroundColor: "#1a1a1a",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Heading as="h2" style={{ margin: 0, color: "#ffffff", fontSize: 22, lineHeight: "28px" }}>
                  Hey {name}, your personal Donets<span style={{ color: red }}>Fit</span> plan is here 🎯
                </Heading>
                <Text style={{ margin: "6px 0 0", color: "#d1d5db", fontSize: 14, lineHeight: "20px" }}>
                  If you have any questions, reply to this email or DM me on{" "}
                  <Link href={instagramUrl} style={{ color: red, textDecoration: "underline" }}>
                    Instagram
                  </Link>
                  . I’m happy to help.
                </Text>
              </div>
            </div>
          </Section>

          {/* Profile snapshot */}
          <Section
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              padding: 16,
              marginTop: 14,
              border: cardBorder,
            }}
          >
            <Text style={{ margin: 0, fontSize: 14, color: subtle }}>
              Goal: <b style={{ color: text }}>{goal}</b> &nbsp;•&nbsp; Activity: <b style={{ color: text }}>{activity}</b> &nbsp;•&nbsp; Sex: <b style={{ color: text }}>{sex}</b> &nbsp;•&nbsp; Age:{" "}
              <b style={{ color: text }}>{age}</b>
            </Text>
            <Text style={{ margin: "6px 0 0", fontSize: 14, color: subtle }}>
              Height: <b style={{ color: text }}>{heightCm} cm</b> &nbsp;•&nbsp; Weight: <b style={{ color: text }}>{weightKg} kg</b>
            </Text>
          </Section>

          {/* Metrics */}
          <Section
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              padding: 18,
              marginTop: 14,
              border: cardBorder,
            }}
          >
            <Heading as="h3" style={{ margin: "0 0 8px", fontSize: 18 }}>
              Your daily targets
            </Heading>
            <Hr style={{ borderColor: "#eee", margin: "8px 0 14px" }} />
            <Text style={{ margin: "0 0 6px", fontSize: 14 }}>
              <b>BMR</b>: {bmr} kcal/day
            </Text>
            <Text style={{ margin: "0 0 6px", fontSize: 14 }}>
              <b>TDEE</b>: {tdee} kcal/day
            </Text>
            <Text style={{ margin: "0 0 6px", fontSize: 14 }}>
              <b>Target Calories</b>: {targetCalories} kcal/day
            </Text>
            <Text style={{ margin: 0, fontSize: 14 }}>
              <b>Macros</b>: Protein {proteinG}g &nbsp;•&nbsp; Fat {fatG}g &nbsp;•&nbsp; Carbs {carbsG}g
            </Text>
          </Section>

          {/* Meal Plan */}
          <Section
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              padding: 18,
              marginTop: 14,
              border: cardBorder,
            }}
          >
            <Heading as="h3" style={{ margin: "0 0 8px", fontSize: 18 }}>
              7‑day Meal Plan
            </Heading>
            <Hr style={{ borderColor: "#eee", margin: "8px 0 12px" }} />
            {weekPlan.map((d, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <Text style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>
                  {d.day} &nbsp;—&nbsp; ~{d.total} kcal
                </Text>
                {d.meals.map((m, j) => (
                  <Text key={j} style={{ margin: "2px 0 0", fontSize: 14 }}>
                    • {m.name} — {m.calories} kcal
                  </Text>
                ))}
              </div>
            ))}
          </Section>

          {/* Grocery List */}
          <Section
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              padding: 18,
              marginTop: 14,
              border: cardBorder,
            }}
          >
            <Heading as="h3" style={{ margin: "0 0 8px", fontSize: 18 }}>
              Grocery List
            </Heading>
            <Hr style={{ borderColor: "#eee", margin: "8px 0 12px" }} />
            {grocery.map((g, i) => (
              <Text key={i} style={{ margin: "2px 0", fontSize: 14 }}>
                • {g}
              </Text>
            ))}
          </Section>

          {/* Training Plan */}
          <Section
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              padding: 18,
              marginTop: 14,
              border: cardBorder,
            }}
          >
            <Heading as="h3" style={{ margin: "0 0 8px", fontSize: 18 }}>
              Training Plan
            </Heading>
            <Hr style={{ borderColor: "#eee", margin: "8px 0 12px" }} />
            {training.map((t, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <Text style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>
                  {t.day}: {t.title}
                </Text>
                {t.exercises.map((ex, k) => (
                  <Text key={k} style={{ margin: "2px 0 0", fontSize: 14 }}>
                    • {ex}
                  </Text>
                ))}
              </div>
            ))}
          </Section>

          {/* Footer note */}
          <Section style={{ margin: "16px 0 24px" }}>
            <Text style={{ color: subtle, fontSize: 12, lineHeight: "18px", margin: 0 }}>
              This plan is for educational purposes and general guidance only. It is not medical advice.
            </Text>
            <Text style={{ color: subtle, fontSize: 12, lineHeight: "18px", margin: "6px 0 0" }}>
              Questions? DM me on{" "}
              <Link href={instagramUrl} style={{ color: red, textDecoration: "underline" }}>
                Instagram
              </Link>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
