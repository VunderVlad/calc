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

type Option = { value: string; label: string };

/* ---------------- Page ---------------- */
export default function CalculatorPage() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const search = useSearchParams();

  const initialMode = (search.get("mode") as Mode) || "student";
  const [mode, setMode] = useState<Mode>(initialMode);

  const [form, setForm] = useState<FormData>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);

  const [showAllergens, setShowAllergens] = useState(false);
  const [showDislikes, setShowDislikes] = useState(false);

  // keep URL in sync with mode
  useEffect(() => {
    const sp = new URLSearchParams(Array.from(search.entries()));
    sp.set("mode", mode);
    router.replace(`/calculator?${sp.toString()}`);
  }, [mode, search, router]);

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

  /* ----- option lists built from translations ----- */
  const allergenOptions: Option[] = [
    { value: "gluten", label: t.calc.allergensList.gluten },
    { value: "lactose", label: t.calc.allergensList.lactose },
    { value: "eggs", label: t.calc.allergensList.eggs },
    { value: "nuts", label: t.calc.allergensList.nuts },
    { value: "fish", label: t.calc.allergensList.fish },
    { value: "soy", label: t.calc.allergensList.soy },
    { value: "sesame", label: t.calc.allergensList.sesame },
    { value: "corn", label: t.calc.allergensList.corn },
    { value: "peanuts", label: t.calc.allergensList.peanuts },
    { value: "shellfish", label: t.calc.allergensList.shellfish },
    { value: "celery", label: t.calc.allergensList.celery },
    { value: "sulfites", label: t.calc.allergensList.sulfites },
    { value: "mustard", label: t.calc.allergensList.mustard },
  ];

  const dislikeOptions: Option[] = [
    { value: "spicy", label: t.calc.dislikesList.spicy },
    { value: "mushrooms", label: t.calc.dislikesList.mushrooms },
    { value: "olives", label: t.calc.dislikesList.olives },
    { value: "coriander", label: t.calc.dislikesList.coriander },
    { value: "cottageCheese", label: t.calc.dislikesList.cottageCheese },
    { value: "seafood", label: t.calc.dislikesList.seafood },
    { value: "liver", label: t.calc.dislikesList.liver },
    { value: "broccoli", label: t.calc.dislikesList.broccoli },
    { value: "cauliflower", label: t.calc.dislikesList.cauliflower },
    { value: "beans", label: t.calc.dislikesList.beans },
    { value: "tofu", label: t.calc.dislikesList.tofu },
    { value: "darkChocolate", label: t.calc.dislikesList.darkChocolate },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // convert checkbox booleans into arrays of selected keys
    const allergens = allergenOptions
      .filter((opt) => form[`allergen_${opt.value}`] === true)
      .map((opt) => opt.value);

    const dislikes = dislikeOptions
      .filter((opt) => form[`dislike_${opt.value}`] === true)
      .map((opt) => opt.value);

    const emailLang =
      (form.emailLang as string | undefined) || lang; // default to current UI language

    const payload = {
      mode,
      lang,
      ...form,
      age: Number(form.age) || undefined,
      heightCm: Number(form.heightCm) || undefined,
      weightKg: Number(form.weightKg) || undefined,
      mealsPerDay: Number(form.mealsPerDay) || undefined,
      targetCalories: Number(form.targetCalories) || undefined,
      proteinG: Number(form.proteinG) || undefined,
      fatG: Number(form.fatG) || undefined,
      proteinPerKg: Number(form.proteinPerKg) || undefined,
      fatPerKg: Number(form.fatPerKg) || undefined,
      allergens,
      dislikes,
      emailLang,
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
              {/* BASIC INFO */}
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

              {/* ACTIVITY & GOAL */}
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
              {/* COACH / PRO TARGETS */}
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
                  step={0.1}
                  onChange={handleChange}
                />
                <FormInput
                  label={t.calc.fatPerKg}
                  name="fatPerKg"
                  type="number"
                  step={0.1}
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

          {/* FOOD PREFERENCES */}
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
          </div>

          {/* ALLERGENS – collapsible */}
          <div
            style={styles.expandBar}
            onClick={() => setShowAllergens((prev) => !prev)}
          >
            <span>{t.calc.allergensSection}</span>
            <span>{showAllergens ? "▲" : "▼"}</span>
          </div>
          {showAllergens && (
            <div style={styles.checkboxGrid}>
              {allergenOptions.map((opt) => {
                const field = `allergen_${opt.value}`;
                const checked = Boolean(form[field]);
                return (
                  <label key={opt.value} style={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      name={field}
                      checked={checked}
                      onChange={handleChange}
                      style={styles.checkbox}
                    />
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          )}

          {/* DISLIKES – collapsible */}
          <div
            style={styles.expandBar}
            onClick={() => setShowDislikes((prev) => !prev)}
          >
            <span>{t.calc.dislikesSection}</span>
            <span>{showDislikes ? "▲" : "▼"}</span>
          </div>
          {showDislikes && (
            <div style={styles.checkboxGrid}>
              {dislikeOptions.map((opt) => {
                const field = `dislike_${opt.value}`;
                const checked = Boolean(form[field]);
                return (
                  <label key={opt.value} style={styles.checkboxItem}>
                    <input
                      type="checkbox"
                      name={field}
                      checked={checked}
                      onChange={handleChange}
                      style={styles.checkbox}
                    />
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          )}

          {/* EMAIL + EMAIL LANGUAGE + CONSENT */}
          <FormInput
            label={t.calc.email}
            name="email"
            type="email"
            onChange={handleChange}
          />

          <FormSelect
            label={t.calc.emailLanguageLabel}
            name="emailLang"
            value={String(form.emailLang ?? lang)}
            onChange={handleChange}
            options={[
              { value: "en", label: t.calc.emailLanguageOptions.en },
              { value: "sk", label: t.calc.emailLanguageOptions.sk },
              { value: "ua", label: t.calc.emailLanguageOptions.ua },
            ]}
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

function FormInput({
  label,
  name,
  type = "text",
  hint,
  onChange,
  ...rest
}: FormInputProps) {
  return (
    <label style={styles.label}>
      <span style={styles.labelTitle}>{label}</span>
      <input
        name={name}
        type={type}
        onChange={onChange}
        {...rest}
        style={styles.input}
      />
      {hint && <span style={styles.hint}>{hint}</span>}
    </label>
  );
}

interface FormSelectProps {
  label: string;
  name: string;
  options: Option[];
  value?: string;
  hint?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

function FormSelect({
  label,
  name,
  options,
  value = "",
  onChange,
  hint,
}: FormSelectProps) {
  const { t } = useI18n();
  const placeholder = t.calc.select || "Select...";

  return (
    <label style={styles.label}>
      <span style={styles.labelTitle}>{label}</span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        style={styles.input}
      >
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
    overflowY: "auto",
    overflowX: "hidden",
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
    backgroundColor: "transparent",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#555",
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
  labelTitle: { color: "#EEE", marginBottom: "8px", marginTop: "12px", fontWeight: 500,textAlign: "left"  },
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
    marginTop: "16px",
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

  /* collapsible bar + grid for checkboxes */
  expandBar: {
    marginTop: "18px",
    marginBottom: "4px",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #333",
    backgroundColor: "#181818",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 14,
    cursor: "pointer",
  },
  checkboxGrid: {
    marginTop: "10px",
    marginBottom: "10px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "8px 16px",
    textAlign: "left",
  },
  checkboxItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: 13,
    color: "#ddd",
  },
};
