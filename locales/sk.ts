export default {
  brand: "DonetsFit",
  home: {
    back: "← Späť na DonetsFit.com",
    instagram: "Instagram",
    goCalc: "Prejsť na kalkulačku →",
    intro:
      "Vitajte v kalkulačke DonetsFit. Vytvorte si svoj týždenný jedálniček a nákupný zoznam za pár minút."
  },
  calc: {
    title: "Kalkulačka DonetsFit",
    subtitle:
      "Kalórie, makrá, 7-dňový jedálniček, nákupný zoznam a voliteľný tréning.",
    mode: { student: "Používateľ (Auto)", trainer: "Tréner (Pro)" },
    basics: "Základné informácie",
    sex: "Pohlavie",
    male: "Muž",
    female: "Žena",
    select: "Vyberte...",
    age: "Vek",
    height: "Výška (cm)",
    weight: "Hmotnosť (kg)",
    activity: "Úroveň aktivity",
    goal: "Cieľ",
    activityLevels: {
      sedentary: "Sedavý (málo pohybu)",
      light: "Ľahká aktivita (1–3×/týždeň)",
      moderate: "Stredná aktivita (3–5×/týždeň)",
      very: "Veľmi aktívny (6–7×/týždeň)",
      athlete: "Športovec (intenzívny tréning)",
    },

    goals: {
      lose: "Schudnúť",
      maintain: "Udržať váhu",
      gain: "Nabrať svaly",
    },
    food: "Stravovacie preferencie",
    allergensSection: "Alergény",
    dislikesSection: "Jedlá, ktoré nemám rád",
    allergensList: {
      gluten: "Glutén",
      lactose: "Laktóza / mliečne výrobky",
      eggs: "Vajcia",
      nuts: "Orechy",
      fish: "Ryby a morské plody",
      soy: "Sója",
      sesame: "Sezam",
      corn: "Kukurica",
      peanuts: "Arašidy",
      shellfish: "Kôrovce",
      celery: "Zeler",
      sulfites: "Siričitany",
      mustard: "Horčica",
    },

    dislikesList: {
      spicy: "Pikantné jedlá",
      mushrooms: "Huby",
      olives: "Olivy",
      coriander: "Koriander / koriandrova vňať",
      cottageCheese: "Tvaroh",
      seafood: "Morské plody",
      liver: "Pečeň",
      broccoli: "Brokolica",
      cauliflower: "Karfiol",
      beans: "Fazuľa",
      tofu: "Tofu",
      darkChocolate: "Horká čokoláda",
    },

    dietType: "Typ diéty",
    mealsPerDay: "Jedlá za deň",
    timeToCook: "Čas na varenie",
    exclusions: "Vylúčenia (alergény)",
    cuisines: "Obľúbené kuchyne",
    favorites: "Obľúbené ingrediencie (pridajte viac)",
    training: "Tréning",
    daysPerWeek: "Dní v týždni",
    equipment: "Vybavenie",
    preferredActivities: "Preferované aktivity (oddelené čiarkou)",
    delivery: "Doručenie",
    name: "Meno",
    emailLanguageLabel: "Jazyk e-mailu  (Jazyk e-mailu musí byť rovnaký ako jazyk webovej stránky)",
    emailLanguageOptions: {
      label: "Jazyk emailu",
      select: "Vyberte jazyk emailu",
      en: "Angličtina",
      sk: "Slovenčina",
      ua: "Ukrajinčina"
    },
    email: "E-mail",
    consent: "Súhlasím s prijatím môjho plánu e-mailom.",
    submit: "Vygenerovať plán",
    building: "Vytváram váš plán…",
    results: "Vaše výsledky",
    mealPlan: "Jedálniček (náhľad)",
    grocery: "Nákupný zoznam",
    trainingPlan: "Tréningový plán",

    // Trainer fields:
    proTargets: "Ciele trénera",
    targetCalories: "Cieľové kalórie (kcal/deň)",
    proteinG: "Bielkoviny (g/deň)",
    fatG: "Tuky (g/deň)",
    or: "alebo",
    proteinPerKg: "Bielkoviny (g/kg)",
    fatPerKg: "Tuky (g/kg)",
    perMealNote:
      "Pokúsime sa prispôsobiť každé jedlo vášmu cieľu na porciu."
  },
  activityLevels: {
  sedentary: "Sedavý (málo pohybu)",
  light: "Ľahká aktivita (1–3x týždenne)",
  moderate: "Stredná aktivita (3–5x týždenne)",
  very: "Vysoká aktivita (6–7x týždenne)",
  athlete: "Športovec (intenzívny tréning)"
  },
  goals: {
    lose: "Schudnúť",
    maintain: "Udržať váhu",
    gain: "Získať svaly"
  },
  email: {
    subjectPreview: "Váš týždenný plán DonetsFit je pripravený 💪",
    dailyTargets: "Vaše denné ciele",
    mealPlan: "7-dňový jedálniček",
    grocery: "Nákupný zoznam",
    trainingPlan: "Tréningový plán",
    disclaimer:
      "Tento plán slúži len na vzdelávacie účely a ako všeobecné odporúčanie. Nie je to lekárske odporúčanie."
  }
} as const;
