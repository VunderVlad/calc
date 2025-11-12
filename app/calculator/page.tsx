"use client";

import React, { useState, useEffect, CSSProperties } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useI18n } from "@/lib/i18n";

/* ---------------- Types ---------------- */
type Mode = "student" | "trainer";
type FormData = Record<string, string | number | boolean | undefined>;

interface ApiResult {
  ok: boolean;
  calc?: {
    bmr?: number | null;
    tdee?: number | null;
    targetCalories?: number;
    proteinG?: number;
    fatG?: number;
    carbsG?: number;
  };
}

/* ---------------- Page ---------------- */
export default function CalculatorPage() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const search = useSearchParams();

  const initialMode = (search.get("mode") as Mode) || "student";
  const [mode, setMode] = useState<Mode>(initialMode);

  useEffect(() => {
    const sp = new URLSearchParams(Array.from(search.entries()));
    sp.set("mode", mode);
    router.replace(`/calculator?${sp.toString()}`);
  }, [mode, search, router]);

  const [form, setForm] = useState<FormData>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "number"
        ? Number(value)
        : type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value;
    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const payload = {
      mode,
      ...form,
      age: Number(form.age) || undefined,
      heightCm: Number(form.heightCm) || undefined,
      weightKg: Number(form.weightKg) || undefined,
      mealsPerDay: Number(form.mealsPerDay) || undefined,
      timeToCook: Number(form.timeToCook) || undefined,
      targetCalories: Number(form.targetCalories) || undefined,
      proteinG: Number(form.proteinG) || undefined,
      fatG: Number(form.fatG) || undefined,
      proteinPerKg: Number(form.proteinPerKg) || undefined,
      fatPerKg: Number(form.fatPerKg) || undefined,
    };

    try {
      const res = await fetch("/api/calc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: ApiResult = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Render ---------------- */
  return (
    <main key={lang} style={styles.main}>
      <div style={styles.wrapper}>
        <h1 style={styles.title}>{t.calc.title}</h1>
        <p style={styles.subtitle}>{t.calc.subtitle}</p>

        {/* Mode switch */}
        <div style={styles.modeSwitch}>
          {[
            { id: "student", label: t.calc.mode.student },
            { id: "trainer", label: t.calc.mode.trainer },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id as Mode)}
              style={
                mode === m.id
                  ? { ...styles.modeButton, ...styles.modeButtonActive }
                  : styles.modeButton
              }
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {mode === "student" ? (
            <>
              <SectionTitle title={t.calc.basics} />
              <div style={styles.grid}>
                <FormSelect
                  label={t.calc.sex}
                  name="sex"
                  value={String(form.sex ?? "")}
                  onChange={handleChange}
                  options={[
                    { value: "male", label: t.calc.male || "Male" },
                    { value: "female", label: t.calc.female || "Female" },
                  ]}
                />
                <FormInput
                  label={t.calc.age}
                  name="age"
                  type="number"
                  min={12}
                  max={100}
                  onChange={handleChange}
                />
                <FormInput
                  label={t.calc.height}
                  name="heightCm"
                  type="number"
                  onChange={handleChange}
                />
                <FormInput
                  label={t.calc.weight}
                  name="weightKg"
                  type="number"
                  onChange={handleChange}
                />
              </div>

              <SectionTitle title={`${t.calc.activity} & ${t.calc.goal}`} />

              <FormSelect
                label={t.calc.activity}
                name="activity"
                value={String(form.activity ?? "")}
                onChange={handleChange}
                options={[
                  { value: "sedentary", label: t.calc.activityLevels.sedentary },
                  { value: "light", label: t.calc.activityLevels.light },
                  { value: "moderate", label: t.calc.activityLevels.moderate },
                  { value: "very", label: t.calc.activityLevels.very },
                  { value: "athlete", label: t.calc.activityLevels.athlete },
                ]}
              />

              <FormSelect
                label={t.calc.goal}
                name="goal"
                value={String(form.goal ?? "")}
                onChange={handleChange}
                options={[
                  { value: "lose", label: t.calc.goals.lose },
                  { value: "maintain", label: t.calc.goals.maintain },
                  { value: "gain", label: t.calc.goals.gain },
                ]}
              />
            </>
          ) : (
            <>
              <SectionTitle title={t.calc.proTargets} />
              <FormInput
                label={t.calc.targetCalories}
                name="targetCalories"
                type="number"
                onChange={handleChange}
              />
              <div style={styles.grid}>
                <FormInput
                  label={t.calc.proteinG}
                  name="proteinG"
                  type="number"
                  onChange={handleChange}
                />
                <FormInput
                  label={t.calc.fatG}
                  name="fatG"
                  type="number"
                  onChange={handleChange}
                />
              </div>

              <div style={styles.orText}>{t.calc.or}</div>

              <div style={styles.grid}>
                <FormInput
                  label={t.calc.proteinPerKg}
                  name="proteinPerKg"
                  type="number"
                  step="0.1"
                  onChange={handleChange}
                />
                <FormInput
                  label={t.calc.fatPerKg}
                  name="fatPerKg"
                  type="number"
                  step="0.1"
                  onChange={handleChange}
                />
              </div>

              <FormInput
                label={t.calc.weight}
                name="weightKg"
                type="number"
                onChange={handleChange}
              />
            </>
          )}

          <SectionTitle title={t.calc.food} />
          <div style={styles.grid}>
            <FormInput
              label={t.calc.mealsPerDay}
              name="mealsPerDay"
              type="number"
              min={3}
              max={5}
              onChange={handleChange}
            />
            <FormInput
              label={t.calc.timeToCook}
              name="timeToCook"
              type="number"
              min={10}
              max={90}
              onChange={handleChange}
            />
          </div>

          <FormInput
            label={t.calc.email}
            name="email"
            type="email"
            onChange={handleChange}
          />

          <label style={styles.checkboxRow}>
            <input
              type="checkbox"
              name="consent"
              onChange={handleChange}
              style={styles.checkbox}
            />
            {t.calc.consent}
          </label>

          <button type="submit" disabled={loading} style={styles.submitButton}>
            {loading ? t.calc.building : t.calc.submit}
          </button>
        </form>

        {result && result.ok && (
          <section style={styles.resultSection}>
            <h2 style={styles.resultTitle}>{t.calc.results}</h2>
            <p>BMR: {result.calc?.bmr ?? "—"} kcal/day</p>
            <p>TDEE: {result.calc?.tdee ?? "—"} kcal/day</p>
            <p>
              {t.calc.targetCalories}: {result.calc?.targetCalories} kcal/day
            </p>
            <p>
              Macros: Protein {result.calc?.proteinG} g • Fat{" "}
              {result.calc?.fatG} g • Carbs {result.calc?.carbsG} g
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

/* ---------------- Subcomponents ---------------- */
const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h2 style={styles.sectionTitle}>{title}</h2>
);

interface FormInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "name" | "type" | "className"
  > {
  label: string;
  name: string;
  type?: string;
  hint?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function FormInput({ label, name, type = "text", hint, onChange, ...rest }: FormInputProps) {
  return (
    <label style={styles.label}>
      <span style={styles.labelTitle}>{label}</span>
      <input name={name} type={type} onChange={onChange} {...rest} style={styles.input} />
      {hint && <span style={styles.hint}>{hint}</span>}
    </label>
  );
}

type Option = { value: string; label: string };

interface FormSelectProps {
  label: string;
  name: string;
  options: Option[];
  value?: string;
  hint?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

function FormSelect({ label, name, options, value = "", onChange, hint }: FormSelectProps) {
  const { t } = useI18n();

  // Safe access to placeholder text
  const placeholder =
    (t.calc && (t.calc as Record<string, unknown>).select as string) || "Select...";

  return (
    <label style={styles.label}>
      <span style={styles.labelTitle}>{label}</span>

      <select name={name} value={value} onChange={onChange} style={styles.input}>
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {hint && <span style={styles.hint}>{hint}</span>}
    </label>
  );
}

/* ---------------- Styles ---------------- */
const styles: Record<string, CSSProperties> = {
  main: {
  minHeight: "100vh",
  width: "100%",
  overflowY: "auto",   // <- scrolling enabled
  overflowX: "hidden", // <- no horizontal scroll
  backgroundColor: "#1a1a1a",
  color: "white",
  padding: "48px 20px",
},

wrapper: {
  maxWidth: "760px",
  margin: "0 auto",
  textAlign: "center",
},
  title: {
    fontSize: "2.5rem",
    fontWeight: 800,
    textAlign: "center",
    marginBottom: "10px",
  },
  subtitle: { textAlign: "center", color: "#AAA", marginBottom: "30px" },
  modeSwitch: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "40px",
  },
  modeButton: {
    padding: "10px 22px",
    borderRadius: "10px",
    fontWeight: 700,
    background: "transparent",
    border: "1px solid #555",
    color: "white",
    cursor: "pointer",
  },
  modeButtonActive: {
    backgroundColor: "#EF4444",
    color: "black",
    borderColor: "#EF4444",
  },
  form: {
    backgroundColor: "#212121",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
  },
  grid: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  },
  label: { display: "flex", flexDirection: "column", fontSize: "14px" },
  labelTitle: { color: "#EEE", marginBottom: "5px", fontWeight: 500 },
  input: {
    backgroundColor: "#2A2A2A",
    border: "1px solid #555",
    borderRadius: "8px",
    padding: "10px",
    color: "white",
    fontSize: "14px",
    outline: "none",
  },
  hint: { color: "#999", fontSize: "12px", marginTop: "4px" },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#CCC",
  },
  checkbox: { accentColor: "#EF4444" },
  submitButton: {
    width: "100%",
    backgroundColor: "#EF4444",
    color: "black",
    fontWeight: 700,
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    marginTop: "20px",
    cursor: "pointer",
  },
  resultSection: {
    marginTop: "40px",
    backgroundColor: "#212121",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
  },
  resultTitle: { color: "#EF4444", fontSize: "20px", marginBottom: "10px" },
  sectionTitle: {
    color: "#EF4444",
    fontSize: "18px",
    fontWeight: 600,
    borderBottom: "1px solid #444",
    paddingBottom: "5px",
    marginBottom: "15px",
  },
  orText: { textAlign: "center", color: "#777", margin: "10px 0" },
};
