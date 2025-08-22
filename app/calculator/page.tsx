'use client';

import React, { useMemo, useState } from 'react';

type State = {
  sex: 'male' | 'female';
  age: number;
  heightCm: number;
  weightKg: number;
  activity: 'sedentary' | 'light' | 'moderate' | 'very' | 'athlete';
  goal: 'lose' | 'maintain' | 'gain';
  // nutrition
  dietType: 'none' | 'vegetarian' | 'vegan' | 'keto';
  exclusions: string;       // comma list (derived from UI chips)
  cuisineLikes: string;     // comma list (derived from UI chips)
  mealsPerDay: number;      // 3 | 4 | 5
  timeToCook: number;       // 10 | 20 | 30
  // training
  daysPerWeek: number;      // 3 | 4 | 5 | 6
  equipment: 'home' | 'gym' | 'calisthenics';
  preferredActivities: string; // comma list
  // email
  name: string;
  email: string;
  consent: boolean;
  // extras
  preferredFoods?: string;  // comma list (derived from UI chips)
};

type ApiResult = {
  bmr: number; tdee: number; targetCalories: number;
  proteinG: number; fatG: number; carbsG: number;
};
type ApiDayPlan = { day: string; meals: { name: string; calories: number }[]; total: number };
type ApiTraining = { day: string; title: string; exercises: string[] };
type ApiResponse = {
  ok: boolean;
  result: ApiResult;
  weekPlan: ApiDayPlan[];
  grocery: string[];
  training: ApiTraining[];
  emailed: boolean;
  emailId?: string;
};

const ALLERGENS = ['nuts', 'dairy', 'gluten', 'eggs', 'fish', 'soy'] as const;
const CUISINES = ['slovak', 'ukrainian', 'mediterranean', 'asian', 'general'] as const;

export default function CalculatorPage() {
  const [state, setState] = useState<State>({
    sex: 'male', age: 25, heightCm: 175, weightKg: 70,
    activity: 'moderate', goal: 'maintain',
    dietType: 'none',
    exclusions: '', cuisineLikes: '',
    mealsPerDay: 3, timeToCook: 20,
    daysPerWeek: 4, equipment: 'home', preferredActivities: '',
    name: '', email: '', consent: false,
  });

  const [exclusionsSel, setExclusionsSel] = useState<string[]>([]);
  const [cuisineSel, setCuisineSel] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favInput, setFavInput] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean }>({});

  const numberFields = useMemo(
    () =>
      new Set<keyof State>([
        'age', 'heightCm', 'weightKg', 'mealsPerDay', 'timeToCook', 'daysPerWeek',
      ]),
    []
  );

  const emailValid = useMemo(() => {
    if (!state.email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email);
  }, [state.email]);

  const nameValid = state.name.trim().length > 1;
  const formValid = nameValid && emailValid;

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as (HTMLInputElement | HTMLSelectElement) & { name: keyof State };
    const name = target.name;
    let parsed: State[typeof name];

    if ((target as HTMLInputElement).type === 'checkbox') {
      parsed = ((target as HTMLInputElement).checked) as State[typeof name];
    } else if (numberFields.has(name)) {
      parsed = Number(target.value) as State[typeof name];
    } else {
      parsed = target.value as State[typeof name];
    }
    setState(prev => ({ ...prev, [name]: parsed }));
  };

  const toggleChip = (list: string[], value: string, setter: (s: string[]) => void) => {
    setter(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };

  const addFavorite = () => {
    const v = favInput.trim().toLowerCase();
    if (!v) return;
    if (!favorites.includes(v)) setFavorites(prev => [...prev, v]);
    setFavInput('');
  };

  const removeFavorite = (val: string) => {
    setFavorites(prev => prev.filter(v => v !== val));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (!formValid) return;

    setLoading(true); setError(null); setResult(null);

    const payload: State = {
      ...state,
      exclusions: exclusionsSel.join(','),
      cuisineLikes: cuisineSel.join(','),
      preferredFoods: favorites.join(','),
    };

    try {
      const res = await fetch('/api/calc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json: unknown = await res.json();
      if (!res.ok) {
        const errData = json as { error?: string };
        throw new Error(errData.error ?? 'Unknown error');
      }

      const data = json as ApiResponse;
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  // ===== Theme + Responsive CSS (global) =====
  const red = '#ff4d4d';
  const resetAndResponsive = `
    /* Reset + guard for full-bleed bg on all screens */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { height: 100%; background: #1a1a1a; }

    /* Responsive helpers */
    @media (max-width: 1200px) {
      .df-container { padding: 40px 18px; }
    }
    /* Tablets & down: force single column for every field group */
    @media (max-width: 980px) {
      .df-grid2 { grid-template-columns: 1fr !important; gap: 14px !important; }
      .df-heading { font-size: 28px !important; }
      .df-sub { font-size: 15px !important; }
      .df-submit { width: 100%; justify-content: center; }
    }
    /* Mobile */
    @media (max-width: 600px) {
      .df-container { padding: 28px 14px; }
      .df-heading { font-size: 24px !important; }
      .df-sub { font-size: 14px !important; }
      .df-input { padding: 14px 14px !important; font-size: 16px !important; } /* avoid iOS zoom */
      .df-chips { gap: 10px !important; }
    }
  `;

  // ===== Inline tokens =====
  const page: React.CSSProperties = {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    fontFamily:
      "'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    textRendering: 'optimizeLegibility',
  };

  const container: React.CSSProperties = {
    maxWidth: 960,
    margin: '0 auto',
    padding: '56px 22px', // wide screens generous padding
  };

  const heading: React.CSSProperties = {
    fontSize: 32,
    fontWeight: 800,
    marginBottom: 8,
  };

  const sub: React.CSSProperties = {
    color: '#cfcfcf',
    marginBottom: 28,
    lineHeight: 1.7,
    fontSize: 16,
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: 20,
    fontWeight: 700,
    marginTop: 20,
    marginBottom: 10,
  };

  const formGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 18,
  };

  const grid2: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: 18,
    rowGap: 14,
  };

  const labelCol: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  };

  const inputBase: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#222',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: 10,
    padding: '12px 14px',
    fontSize: 15,
    lineHeight: 1.3,
    outline: 'none',
  };

  const checkboxRow: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
  };

  const submitBtn: React.CSSProperties = {
    background:
      'linear-gradient(180deg, rgba(255,77,77,1) 0%, rgba(255,120,120,1) 100%)',
    color: '#0b0b0b',
    border: 'none',
    borderRadius: 12,
    padding: '14px 20px',
    fontWeight: 800,
    cursor: 'pointer',
    display: 'inline-flex',
  };

  const panel: React.CSSProperties = {
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: 18,
    backgroundColor: '#181818',
  };

  const listDisc: React.CSSProperties = {
    listStyleType: 'disc',
    paddingLeft: 22,
  };

  const chipsRow: React.CSSProperties = {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
  };

  const chip: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '9px 12px',
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(255,255,255,0.07)',
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: 14,
  };

  const chipActive: React.CSSProperties = {
    ...chip,
    border: `1px solid ${red}`,
    backgroundColor: 'rgba(255,77,77,0.18)',
  };

  const chipRemoveBtn: React.CSSProperties = {
    appearance: 'none',
    border: 'none',
    background: 'transparent',
    color: red,
    fontWeight: 800,
    cursor: 'pointer',
    padding: 0,
    lineHeight: 1,
  };

  const helperText: React.CSSProperties = { color: '#9aa3b2', fontSize: 13 };
  const errorText: React.CSSProperties = { color: red, fontSize: 13 };

  const smallNote = (color: string): React.CSSProperties => ({
    color,
    fontSize: 14,
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: resetAndResponsive }} />
      <main style={page}>
        <div style={container} className="df-container">
          <h1 style={heading} className="df-heading">DonetsFit Calculator</h1>
          <p style={sub} className="df-sub">
            Calories, macros, a 7‑day meal plan, grocery list, and a training split.
            You’ll also get it by email if you opt‑in.
          </p>

          <form onSubmit={onSubmit} style={formGrid} noValidate>
            {/* Basics */}
            <div style={grid2} className="df-grid2">
              <label style={labelCol}>Sex
                <select name="sex" value={state.sex} onChange={handle} style={inputBase} className="df-input" aria-label="Sex">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
              <label style={labelCol}>Age
                <input type="number" name="age" value={state.age} onChange={handle} style={inputBase} className="df-input" min={10} max={100} aria-label="Age" />
              </label>
              <label style={labelCol}>Height (cm)
                <input type="number" name="heightCm" value={state.heightCm} onChange={handle} style={inputBase} className="df-input" min={120} max={230} aria-label="Height in centimeters" />
              </label>
              <label style={labelCol}>Weight (kg)
                <input type="number" name="weightKg" value={state.weightKg} onChange={handle} style={inputBase} className="df-input" min={35} max={200} aria-label="Weight in kilograms" />
              </label>
              <label style={labelCol}>Activity
                <select name="activity" value={state.activity} onChange={handle} style={inputBase} className="df-input" aria-label="Activity level">
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light (1–3x/wk)</option>
                  <option value="moderate">Moderate (3–5x/wk)</option>
                  <option value="very">Very (6–7x/wk)</option>
                  <option value="athlete">Athlete</option>
                </select>
              </label>
              <label style={labelCol}>Goal
                <select name="goal" value={state.goal} onChange={handle} style={inputBase} className="df-input" aria-label="Goal">
                  <option value="lose">Lose fat</option>
                  <option value="maintain">Maintain</option>
                  <option value="gain">Gain</option>
                </select>
              </label>
            </div>

            {/* Food preferences */}
            <h2 style={sectionTitle}>Food preferences</h2>
            <div style={grid2} className="df-grid2">
              <label style={labelCol}>Diet type
                <select name="dietType" value={state.dietType} onChange={handle} style={inputBase} className="df-input" aria-label="Diet type">
                  <option value="none">No restriction</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="keto">Keto</option>
                </select>
              </label>

              <label style={labelCol}>Meals per day
                <select name="mealsPerDay" value={state.mealsPerDay} onChange={handle} style={inputBase} className="df-input" aria-label="Meals per day">
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </label>

              <label style={labelCol}>Time to cook
                <select name="timeToCook" value={state.timeToCook} onChange={handle} style={inputBase} className="df-input" aria-label="Time to cook">
                  <option value={10}>~10 min</option>
                  <option value={20}>~20 min</option>
                  <option value={30}>30+ min</option>
                </select>
              </label>

              {/* Exclusions */}
              <div style={labelCol}>
                <span>Exclusions (allergens)</span>
                <div style={chipsRow} className="df-chips" role="group" aria-label="Exclude allergens">
                  {ALLERGENS.map(a => {
                    const active = exclusionsSel.includes(a);
                    return (
                      <button
                        key={a}
                        type="button"
                        onClick={() => toggleChip(exclusionsSel, a, setExclusionsSel)}
                        style={active ? chipActive : chip}
                        aria-pressed={active}
                      >
                        <input
                          type="checkbox"
                          checked={active}
                          readOnly
                          aria-hidden="true"
                          style={{ width: 18, height: 18, accentColor: red }}
                        />
                        <span style={{ textTransform: 'capitalize' }}>{a}</span>
                      </button>
                    );
                  })}
                </div>
                <span style={helperText}>Select everything you cannot eat.</span>
              </div>

              {/* Cuisine likes */}
              <div style={labelCol}>
                <span>Cuisine likes</span>
                <div style={chipsRow} className="df-chips" role="group" aria-label="Cuisine likes">
                  {CUISINES.map(c => {
                    const active = cuisineSel.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggleChip(cuisineSel, c, setCuisineSel)}
                        style={active ? chipActive : chip}
                        aria-pressed={active}
                      >
                        <input
                          type="checkbox"
                          checked={active}
                          readOnly
                          aria-hidden="true"
                          style={{ width: 18, height: 18, accentColor: red }}
                        />
                        <span style={{ textTransform: 'capitalize' }}>{c}</span>
                      </button>
                    );
                  })}
                </div>
                <span style={helperText}>Choose one or more cuisines you enjoy.</span>
              </div>

              {/* Favorite ingredients */}
              <div style={{ ...labelCol, gridColumn: '1 / span 2' }}>
                <span>Favorite ingredients (add multiple)</span>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    value={favInput}
                    onChange={(e) => setFavInput(e.target.value)}
                    style={{ ...inputBase, flex: '1 1 280px' }}
                    placeholder="e.g. chicken, rice, avocado"
                    aria-label="Add favorite ingredient"
                    className="df-input"
                  />
                  <button
                    type="button"
                    onClick={addFavorite}
                    style={submitBtn}
                    aria-label="Add ingredient"
                  >
                    Add
                  </button>
                </div>

                {favorites.length > 0 && (
                  <div style={{ ...chipsRow, marginTop: 10 }}>
                    {favorites.map((f) => (
                      <span key={f} style={chipActive}>
                        <span style={{ textTransform: 'capitalize' }}>{f}</span>
                        <button
                          type="button"
                          onClick={() => removeFavorite(f)}
                          style={chipRemoveBtn}
                          aria-label={`Remove ${f}`}
                          title="Remove"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <span style={helperText}>We’ll try to include meals using these foods.</span>
              </div>
            </div>

            {/* Training */}
            <h2 style={sectionTitle}>Training</h2>
            <div style={grid2} className="df-grid2">
              <label style={labelCol}>Days per week
                <select name="daysPerWeek" value={state.daysPerWeek} onChange={handle} style={inputBase} className="df-input" aria-label="Training days per week">
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                </select>
              </label>
              <label style={labelCol}>Equipment
                <select name="equipment" value={state.equipment} onChange={handle} style={inputBase} className="df-input" aria-label="Training equipment">
                  <option value="home">Home</option>
                  <option value="calisthenics">Calisthenics</option>
                  <option value="gym">Gym</option>
                </select>
              </label>
              <label style={{ ...labelCol, gridColumn: '1 / span 2' }}>Preferred activities (comma)
                <input
                  type="text"
                  name="preferredActivities"
                  value={state.preferredActivities}
                  onChange={handle}
                  style={inputBase}
                  className="df-input"
                  placeholder="running, swimming"
                  aria-label="Preferred activities"
                />
              </label>
            </div>

            {/* Delivery */}
            <h2 style={sectionTitle}>Delivery</h2>
            <div style={grid2} className="df-grid2">
              <label style={labelCol}>Name <span aria-hidden="true" style={{ color: red }}>*</span>
                <input
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={handle}
                  onBlur={() => setTouched(t => ({ ...t, name: true }))}
                  style={inputBase}
                  className="df-input"
                  required
                  aria-invalid={touched.name && !nameValid}
                  aria-label="Name"
                />
                {touched.name && !nameValid && (
                  <span style={errorText}>Please enter your name (at least 2 characters).</span>
                )}
              </label>

              <label style={labelCol}>Email <span aria-hidden="true" style={{ color: red }}>*</span>
                <input
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={handle}
                  onBlur={() => setTouched(t => ({ ...t, email: true }))}
                  style={inputBase}
                  className="df-input"
                  required
                  aria-invalid={touched.email && !emailValid}
                  aria-label="Email"
                />
                {touched.email && !emailValid && (
                  <span style={errorText}>Enter a valid email like user@example.com.</span>
                )}
              </label>

              <label style={{ ...checkboxRow, gridColumn: '1 / span 2' }}>
                <input
                  type="checkbox"
                  name="consent"
                  checked={state.consent}
                  onChange={handle}
                  style={{ width: 20, height: 20, accentColor: red }}
                  aria-label="Email consent"
                />
                <span>I agree to receive my plan by email.</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !formValid}
              style={{ ...submitBtn, opacity: loading || !formValid ? 0.7 : 1 }}
              className="df-submit"
              aria-label="Generate plan"
            >
              {loading ? 'Building your plan…' : 'Generate plan'}
            </button>
          </form>

          {error && <p style={{ marginTop: 18, color: red }}>{error}</p>}

          {result && (
            <div style={{ marginTop: 26, display: 'grid', gap: 18 }}>
              <div style={panel}>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Your results</h2>
                <p><b>BMR:</b> {result.result.bmr} kcal/day</p>
                <p><b>TDEE:</b> {result.result.tdee} kcal/day</p>
                <p><b>Target Calories:</b> {result.result.targetCalories} kcal/day</p>
                <p>
                  <b>Macros:</b> Protein {result.result.proteinG}g • Fat {result.result.fatG}g • Carbs {result.result.carbsG}g
                </p>
              </div>

              <div style={panel}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Meal plan (preview)</h3>
                {result.weekPlan.map((d, i) => {
                  const target = result.result.targetCalories;
                  const delta = d.total - target;
                  const within = Math.abs(delta) <= target * 0.10;
                  const color = within ? '#20c997' : delta > 0 ? '#d39e00' : '#3b82f6';
                  const sign = delta > 0 ? '+' : '';
                  return (
                    <div key={i} style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <p style={{ fontWeight: 600 }}>{d.day}</p>
                        <p style={{ fontSize: 14 }}>
                          <span style={{ fontWeight: 700 }}>{d.total} kcal</span>{' '}
                          <span style={smallNote(color)}>({sign}{delta} vs {target})</span>
                        </p>
                      </div>
                      <ul style={listDisc}>
                        {d.meals.map((m, j) => (
                          <li key={j}>{m.name} — {m.calories} kcal</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              <div style={panel}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Grocery list</h3>
                <ul style={listDisc}>
                  {result.grocery.map((g, i) => (<li key={i}>{g}</li>))}
                </ul>
              </div>

              <div style={panel}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Training plan</h3>
                {result.training.map((t, i) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <p style={{ fontWeight: 600 }}>{t.day}: {t.title}</p>
                    <ul style={listDisc}>
                      {t.exercises.map((ex, k) => (<li key={k}>{ex}</li>))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
