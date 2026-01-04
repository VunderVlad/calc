// lib/pdf/generatePdf.ts
import { PDFDocument, rgb } from "pdf-lib";
import { readFile } from "fs/promises";
import { join } from "path";
import type { Language } from "@/lib/i18n/i18n";
import { t } from "@/lib/i18n/i18n";
import type { WeekPlan } from "@/lib/meals/generateWeekPlan";
import type { Meal } from "@/lib/meals/mealTypes";
import type { AutoMacroResult, TrainerMacroResult } from "@/lib/calc/calcMacros";
import { generateGroceryList } from "@/lib/meals/groceryList";

type MacroResult = AutoMacroResult | TrainerMacroResult;

type NutritionPlan = {
  language: Language;
  name?: string;
  email?: string;
  activity?: string;
  goal?: string;
  macros: MacroResult;
  week: WeekPlan;
};

// Brand colors
const BRAND_RED = rgb(0.937, 0.267, 0.267); // #EF4444
const TEXT_DARK = rgb(0.1, 0.1, 0.1);
const TEXT_MEDIUM = rgb(0.45, 0.45, 0.45);
const TEXT_LIGHT = rgb(0.65, 0.65, 0.65);
const BORDER_LIGHT = rgb(0.85, 0.85, 0.85);

/**
 * Embeds a Unicode-supporting font for Cyrillic characters
 */
async function embedUnicodeFont(pdfDoc: PDFDocument) {
  try {
    const fontPath = join(process.cwd(), "public", "fonts", "NotoSans-Regular.ttf");
    const fontBytes = await readFile(fontPath);
    if (fontBytes.length > 1000) {
      const font = await pdfDoc.embedFont(fontBytes);
      console.log(`✅ Successfully loaded Unicode font from local file`);
      return font;
    }
  } catch (error: any) {
    console.log(`Local font file not found, trying CDN...`);
  }

  const fontUrls = [
    "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSans/NotoSans-Regular.ttf",
    "https://raw.githubusercontent.com/googlefonts/noto-fonts/main/hinted/ttf/NotoSans/NotoSans-Regular.ttf",
  ];

  for (const fontUrl of fontUrls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const fontResponse = await fetch(fontUrl, {
        headers: { 'Accept': 'application/octet-stream' },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (fontResponse.ok) {
        const fontBytes = await fontResponse.arrayBuffer();
        if (fontBytes.byteLength > 1000) {
          const font = await pdfDoc.embedFont(fontBytes);
          return font;
        }
      }
    } catch (error: any) {
      continue;
    }
  }

  throw new Error("Failed to load Unicode font.");
}

/**
 * Embeds QR code image
 */
async function embedQrCode(pdfDoc: PDFDocument) {
  try {
    const qrPath = join(process.cwd(), "public", "images", "email", "frame.png");
    const qrBytes = await readFile(qrPath);
    const qrImage = await pdfDoc.embedPng(qrBytes);
    return qrImage;
  } catch (error) {
    console.warn("QR code image not found, skipping");
    return null;
  }
}

/**
 * Categorizes ingredients for organized shopping list
 */
function categorizeIngredient(ingredientKey: string): string {
  const key = ingredientKey.toLowerCase();
  
  if (key.includes('chicken') || key.includes('beef') || key.includes('pork') || 
      key.includes('turkey') || key.includes('salmon') || key.includes('tuna') || 
      key.includes('fish') || key.includes('eggs') || key.includes('egg') ||
      key.includes('whey') || key.includes('protein') || key.includes('cottage') ||
      key.includes('cheese') || key.includes('yogurt')) {
    return 'proteins';
  }
  
  if (key.includes('rice') || key.includes('pasta') || key.includes('oats') ||
      key.includes('potato') || key.includes('bread') || key.includes('tortilla') ||
      key.includes('orzo') || key.includes('quinoa') || key.includes('barley')) {
    return 'carbs';
  }
  
  if (key.includes('oil') || key.includes('butter') || key.includes('nuts') ||
      key.includes('almond') || key.includes('walnut') || key.includes('peanut') ||
      key.includes('avocado') || key.includes('olive')) {
    return 'fats';
  }
  
  if (key.includes('banana') || key.includes('apple') || key.includes('berry') ||
      key.includes('strawberr') || key.includes('blueberr') || key.includes('vegetable') ||
      key.includes('broccoli') || key.includes('spinach') || key.includes('tomato') ||
      key.includes('pepper') || key.includes('onion') || key.includes('garlic') ||
      key.includes('zucchini') || key.includes('carrot') || key.includes('cucumber') ||
      key.includes('lettuce') || key.includes('mushroom')) {
    return 'fruits_vegetables';
  }
  
  return 'other';
}

/**
 * Generates a PDF nutrition plan document matching JSON specification
 */
export async function generateNutritionPlanPdf(plan: NutritionPlan): Promise<Buffer> {
  const { language, name, email, activity, goal, macros, week } = plan;
  
  console.log(`📄 Starting PDF generation for ${name || "user"} (${language}), ${week.length} days`);

  const safeTranslate = (key: string, fallback: string = ""): string => {
    try {
      const translated = t(language, key, fallback);
      if (translated === key && fallback) {
        return fallback;
      }
      if (translated.includes('.') && !translated.includes(' ') && fallback) {
        return fallback;
      }
      return translated;
    } catch (error) {
      return fallback || key;
    }
  };

  const translateActivity = (act?: string): string => {
    if (!act) return "";
    return safeTranslate(`form.activity${act.charAt(0).toUpperCase() + act.slice(1)}`, act);
  };

  const translateGoal = (g?: string): string => {
    if (!g) return "";
    return safeTranslate(`form.goal${g.charAt(0).toUpperCase() + g.slice(1)}`, g);
  };

  // Create PDF document
  const pdfDoc = await PDFDocument.create();
  
  // Register fontkit
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fontkit = require("fontkit");
  pdfDoc.registerFontkit(fontkit);
  
  // Embed font and QR code
  let normalFont;
  try {
    normalFont = await embedUnicodeFont(pdfDoc);
  } catch (error) {
    console.error("Critical: Failed to load Unicode font:", error);
    throw new Error("PDF generation failed: Unable to load Unicode font.");
  }

  const qrImage = await embedQrCode(pdfDoc);

  // Page dimensions: A4, 20mm margins (56.7 points)
  const pageWidth = 595;
  const pageHeight = 842;
  const marginMm = 20;
  const marginPoints = marginMm * 2.834;
  const contentWidth = pageWidth - 2 * marginPoints;
  const contentTop = pageHeight - marginPoints;
  const footerHeight = 50; // Reserved space for footer
  const contentBottom = marginPoints + footerHeight;
  
  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let currentY = contentTop;
  let pageNumber = 1;

  // Helper: Add footer (once per page, compact)
  const addFooter = () => {
    const footerY = marginPoints + 25;
    
    // "Prepared by DonetsFit" - once per page
    const footerText = "Prepared by DonetsFit";
    currentPage.drawText(footerText, {
      x: marginPoints,
      y: footerY,
      size: 8,
      font: normalFont,
      color: TEXT_LIGHT,
    });
    
    // Page number
    const pageText = `Page ${pageNumber}`;
    const pageTextWidth = normalFont.widthOfTextAtSize(pageText, 8);
    currentPage.drawText(pageText, {
      x: pageWidth - marginPoints - pageTextWidth,
      y: footerY,
      size: 8,
      font: normalFont,
      color: TEXT_LIGHT,
    });

    // QR code at bottom left
    if (qrImage) {
      const qrSize = 35;
      const qrX = marginPoints;
      const qrY = marginPoints - 5;
      
      currentPage.drawImage(qrImage, {
        x: qrX,
        y: qrY,
        width: qrSize,
        height: qrSize,
      });
      
      currentPage.drawText("DonetsFIT", {
        x: qrX,
        y: qrY - 10,
        size: 7,
        font: normalFont,
        color: TEXT_LIGHT,
      });
    }

    // Website URL (center)
    const websiteText = "https://donetsfit.com";
    const websiteWidth = normalFont.widthOfTextAtSize(websiteText, 8);
    currentPage.drawText(websiteText, {
      x: (pageWidth - websiteWidth) / 2,
      y: footerY,
      size: 8,
      font: normalFont,
      color: BRAND_RED,
    });
  };

  // Helper: Calculate text height
  const calculateTextHeight = (
    text: string,
    fontSize: number,
    maxWidth: number
  ): number => {
    if (!text) return 0;
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = normalFont.widthOfTextAtSize(testLine, fontSize);
      if (width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines.length * fontSize * 1.4;
  };

  // Helper: Add text with word wrap
  const addText = (
    text: string,
    fontSize: number,
    x: number,
    y: number,
    maxWidth: number,
    color: [number, number, number] = TEXT_DARK
  ): number => {
    if (!text) return 0;
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = normalFont.widthOfTextAtSize(testLine, fontSize);
      if (width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }

    lines.forEach((line, index) => {
      currentPage.drawText(line, {
        x,
        y: y - index * fontSize * 1.4,
        size: fontSize,
        font: normalFont,
        color,
      });
    });

    return lines.length * fontSize * 1.4;
  };

  // Helper: Draw divider line
  const drawDivider = (x: number, y: number, width: number) => {
    currentPage.drawLine({
      start: { x, y },
      end: { x: x + width, y },
      thickness: 0.5,
      color: BRAND_RED,
    });
  };

  // ========== COVER PAGE ==========
  currentY = contentTop;
  
  // Header: Logo "DonetsFIT" with FIT in red
  const logoPart1 = "Donets";
  const logoPart2 = "FIT";
  const logoSize = 26;
  const logo1Width = normalFont.widthOfTextAtSize(logoPart1, logoSize);
  const logo2Width = normalFont.widthOfTextAtSize(logoPart2, logoSize);
  const totalLogoWidth = logo1Width + logo2Width;
  
  currentPage.drawText(logoPart1, {
    x: (pageWidth - totalLogoWidth) / 2,
    y: currentY,
    size: logoSize,
    font: normalFont,
    color: TEXT_DARK,
  });
  
  currentPage.drawText(logoPart2, {
    x: (pageWidth - totalLogoWidth) / 2 + logo1Width,
    y: currentY,
    size: logoSize,
    font: normalFont,
    color: BRAND_RED,
  });
  currentY -= 38;

  // Subtitle
  const subtitleText = safeTranslate("pdf.personalizedPlan", "Personalized Weekly Meal Plan");
  const subtitleWidth = normalFont.widthOfTextAtSize(subtitleText, 11);
  currentPage.drawText(subtitleText, {
    x: (pageWidth - subtitleWidth) / 2,
    y: currentY,
    size: 11,
    font: normalFont,
    color: TEXT_MEDIUM,
  });
  currentY -= 45;

  // Two-column layout for information blocks
  const columnWidth = (contentWidth - 25) / 2;
  const leftColumnX = marginPoints;
  const rightColumnX = marginPoints + columnWidth + 25;

  // Left column: Your information
  let leftY = currentY;
  currentPage.drawText(safeTranslate("pdf.yourInformation", "Your information"), {
    x: leftColumnX,
    y: leftY,
    size: 13,
    font: normalFont,
    color: BRAND_RED,
  });
  leftY -= 22;

  const infoFields = [
    { label: safeTranslate("form.name", "Name"), value: name || "" },
    { label: safeTranslate("form.email", "Email"), value: email || "" },
    { label: safeTranslate("form.activity", "Activity type"), value: translateActivity(activity) },
    { label: safeTranslate("form.goal", "Goal"), value: translateGoal(goal) },
  ];

  infoFields.forEach((field) => {
    if (field.value) {
      currentPage.drawText(field.label, {
        x: leftColumnX,
        y: leftY,
        size: 9,
        font: normalFont,
        color: TEXT_MEDIUM,
      });
      
      const valueHeight = addText(field.value, 9, leftColumnX, leftY - 11, columnWidth - 8, TEXT_DARK);
      leftY -= valueHeight + 16;
    }
  });

  // Right column: Daily Macros
  let rightY = currentY;
  currentPage.drawText(safeTranslate("pdf.dailyMacros", "Daily Macros"), {
    x: rightColumnX,
    y: rightY,
    size: 13,
    font: normalFont,
    color: BRAND_RED,
  });
  rightY -= 22;

  const macroFields = [
    { label: safeTranslate("email.calories", "Calories"), value: `${macros.calories} kcal` },
    { label: safeTranslate("email.carbs", "Carbs"), value: `${macros.carbs} g` },
    { label: safeTranslate("email.protein", "Protein"), value: `${macros.protein} g` },
    { label: safeTranslate("email.fat", "Fats"), value: `${macros.fat} g` },
  ];

  macroFields.forEach((field) => {
    currentPage.drawText(field.label, {
      x: rightColumnX,
      y: rightY,
      size: 9,
      font: normalFont,
      color: TEXT_MEDIUM,
    });
    
    const valueWidth = normalFont.widthOfTextAtSize(field.value, 9);
    currentPage.drawText(field.value, {
      x: rightColumnX + columnWidth - valueWidth - 8,
      y: rightY,
      size: 9,
      font: normalFont,
      color: TEXT_DARK,
    });
    
    rightY -= 18;
  });

  currentY = Math.min(leftY, rightY) - 35;

  // Instructions section
  currentPage.drawText(safeTranslate("pdf.howToUse", "How to use this plan"), {
    x: marginPoints,
    y: currentY,
    size: 13,
    font: normalFont,
    color: BRAND_RED,
  });
  currentY -= 22;

  const instructions = [
    safeTranslate("pdf.instr1", "Follow meals in the listed order for each day"),
    safeTranslate("pdf.instr2", "Meals can be swapped within the same day if needed"),
    safeTranslate("pdf.instr3", "Drink water regularly throughout the day"),
    safeTranslate("pdf.instr4", "Adjust portions only if advised by your coach"),
    safeTranslate("pdf.instr5", "Consistency matters more than perfection"),
  ];

  instructions.forEach((instruction) => {
    currentPage.drawText(`• ${instruction}`, {
      x: marginPoints + 8,
      y: currentY,
      size: 9,
      font: normalFont,
      color: TEXT_DARK,
    });
    currentY -= 18;
  });

  addFooter();

  // ========== DAY PAGES (2-8, ONE DAY PER PAGE - MANDATORY) ==========
  week.forEach((day, dayIndex) => {
    // Always create new page for each day
    if (dayIndex === 0) {
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      currentY = contentTop;
      pageNumber = 2;
    } else {
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      currentY = contentTop;
      pageNumber = dayIndex + 2;
    }

    // Day title (larger, red, left-aligned)
    const dayText = `${safeTranslate("email.day", "Day")} ${day.day}`;
    currentPage.drawText(dayText, {
      x: marginPoints,
      y: currentY,
      size: 22,
      font: normalFont,
      color: BRAND_RED,
    });
    currentY -= 26;

    // Divider (red)
    drawDivider(marginPoints, currentY, contentWidth);
    currentY -= 16;

    // Calculate total height needed for all meals to determine if we need to reduce size
    const calculateMealHeight = (
      meal: Meal,
      isSnack: boolean,
      useCompact: boolean
    ): number => {
      const cardPadding = isSnack ? 8 : (useCompact ? 10 : 12);
      const cardInnerWidth = contentWidth - 2 * cardPadding;
      
      const mealName = safeTranslate(meal.nameKey, meal.id);
      const mealDesc = safeTranslate(meal.descriptionKey, "");
      const hasDescription = mealDesc && mealDesc !== meal.descriptionKey && !isSnack;
      
      const nameFontSize = isSnack ? 9 : (useCompact ? 9 : 10);
      const descFontSize = 7;
      const typeHeight = isSnack ? 11 : (useCompact ? 12 : 14);
      const nameHeight = calculateTextHeight(mealName, nameFontSize, cardInnerWidth);
      const descHeight = hasDescription ? calculateTextHeight(mealDesc, descFontSize, cardInnerWidth) + (useCompact ? 3 : 4) : 0;
      const nutritionHeight = isSnack ? 11 : (useCompact ? 11 : 13);
      const dividerHeight = isSnack ? 6 : (useCompact ? 7 : 8);
      
      const filteredIngredients = meal.ingredients.filter(
        (i) => !i.ingredientKey.toLowerCase().includes("water")
      );
      
      const columnWidth = (cardInnerWidth - (isSnack ? 8 : 12)) / 2;
      const headerFontSize = isSnack ? 8 : (useCompact ? 8 : 9);
      const itemFontSize = isSnack ? 7 : (useCompact ? 7 : 8);
      const itemSpacing = isSnack ? 2 : (useCompact ? 2 : 3);
      
      let ingredientsHeight = (isSnack ? 10 : (useCompact ? 11 : 13));
      filteredIngredients.forEach((ing) => {
        const ingName = safeTranslate(ing.ingredientKey, ing.ingredientKey);
        const ingText = `${ingName} — ${ing.grams} g`;
        ingredientsHeight += calculateTextHeight(ingText, itemFontSize, columnWidth - 4) + itemSpacing;
      });
      
      let stepsHeight = (isSnack ? 10 : (useCompact ? 11 : 13));
      meal.steps.forEach((step) => {
        const stepText = safeTranslate(step.stepKey, "");
        const displayText = stepText.includes('.') && !stepText.includes(' ') ? "" : stepText;
        if (displayText) {
          stepsHeight += calculateTextHeight(displayText, itemFontSize, columnWidth - 4) + itemSpacing;
        }
      });
      
      const maxColumnHeight = Math.max(ingredientsHeight, stepsHeight);
      const spacingBetween = useCompact ? 3 : (isSnack ? 2 : 4);
      
      return cardPadding * 2 +
        typeHeight +
        spacingBetween +
        nameHeight +
        descHeight +
        spacingBetween +
        nutritionHeight +
        spacingBetween +
        dividerHeight +
        (isSnack ? 4 : (useCompact ? 5 : 6)) +
        maxColumnHeight;
    };

    // Calculate all meal heights
    const breakfastHeight = calculateMealHeight(day.breakfast, false, false);
    const lunchHeight = calculateMealHeight(day.lunch, false, false);
    const dinnerHeight = calculateMealHeight(day.dinner, false, false);
    const snackHeight = calculateMealHeight(day.snack, true, false);
    
    const mealSpacing = 14;
    const totalHeight = breakfastHeight + lunchHeight + dinnerHeight + snackHeight + (mealSpacing * 3);
    const availableHeight = currentY - contentBottom;
    
    // If doesn't fit, use compact mode for breakfast, lunch, dinner
    const useCompact = totalHeight > availableHeight;
    
    // Helper: Render meal with auto-height
    const renderMeal = (mealType: string, meal: Meal, isSnack: boolean, useCompactMode: boolean) => {
      const cardStartY = currentY;
      const cardPadding = isSnack ? 8 : (useCompactMode ? 10 : 12);
      const cardInnerWidth = contentWidth - 2 * cardPadding;
      
      // Calculate content heights
      const mealName = safeTranslate(meal.nameKey, meal.id);
      const mealDesc = safeTranslate(meal.descriptionKey, "");
      const hasDescription = mealDesc && mealDesc !== meal.descriptionKey && !isSnack;
      
      const nameFontSize = isSnack ? 9 : (useCompactMode ? 9 : 10);
      const descFontSize = 7;
      const typeHeight = isSnack ? 11 : (useCompactMode ? 12 : 14);
      const nameHeight = calculateTextHeight(mealName, nameFontSize, cardInnerWidth);
      const descHeight = hasDescription ? calculateTextHeight(mealDesc, descFontSize, cardInnerWidth) + (useCompactMode ? 3 : 4) : 0;
      const nutritionHeight = isSnack ? 11 : (useCompactMode ? 11 : 13);
      const dividerHeight = isSnack ? 6 : (useCompactMode ? 7 : 8);
      
      // Two-column content
      const filteredIngredients = meal.ingredients.filter(
        (i) => !i.ingredientKey.toLowerCase().includes("water")
      );
      
      const columnWidth = (cardInnerWidth - (isSnack ? 8 : 12)) / 2;
      const headerFontSize = isSnack ? 8 : (useCompactMode ? 8 : 9);
      const itemFontSize = isSnack ? 7 : (useCompactMode ? 7 : 8);
      const itemSpacing = isSnack ? 2 : (useCompactMode ? 2 : 3);
      
      let ingredientsHeight = (isSnack ? 10 : (useCompactMode ? 11 : 13));
      filteredIngredients.forEach((ing) => {
        const ingName = safeTranslate(ing.ingredientKey, ing.ingredientKey);
        const ingText = `${ingName} — ${ing.grams} g`;
        ingredientsHeight += calculateTextHeight(ingText, itemFontSize, columnWidth - 4) + itemSpacing;
      });
      
      let stepsHeight = (isSnack ? 10 : (useCompactMode ? 11 : 13));
      meal.steps.forEach((step) => {
        const stepText = safeTranslate(step.stepKey, "");
        const displayText = stepText.includes('.') && !stepText.includes(' ') ? "" : stepText;
        if (displayText) {
          stepsHeight += calculateTextHeight(displayText, itemFontSize, columnWidth - 4) + itemSpacing;
        }
      });
      
      const maxColumnHeight = Math.max(ingredientsHeight, stepsHeight);
      const spacingBetween = useCompactMode ? 3 : (isSnack ? 2 : 4);
      
      // Total card height
      const totalCardHeight = 
        cardPadding * 2 +
        typeHeight +
        spacingBetween +
        nameHeight +
        descHeight +
        spacingBetween +
        nutritionHeight +
        spacingBetween +
        dividerHeight +
        (isSnack ? 4 : (useCompactMode ? 5 : 6)) +
        maxColumnHeight;
      
      // Draw card border
      currentPage.drawRectangle({
        x: marginPoints,
        y: cardStartY - totalCardHeight + cardPadding,
        width: contentWidth,
        height: totalCardHeight,
        borderColor: BORDER_LIGHT,
        borderWidth: 1,
      });
      
      let cardY = cardStartY - cardPadding;
      
      // Meal type (red)
      currentPage.drawText(mealType, {
        x: marginPoints + cardPadding,
        y: cardY,
        size: isSnack ? 9 : (useCompactMode ? 9 : 10),
        font: normalFont,
        color: BRAND_RED,
      });
      cardY -= typeHeight + spacingBetween;

      // Meal name
      const actualNameHeight = addText(mealName, nameFontSize, marginPoints + cardPadding, cardY, cardInnerWidth, TEXT_DARK);
      cardY -= actualNameHeight + spacingBetween;

      // Description (skip for snack)
      if (hasDescription) {
        const actualDescHeight = addText(mealDesc, descFontSize, marginPoints + cardPadding, cardY, cardInnerWidth, TEXT_MEDIUM);
        cardY -= actualDescHeight + spacingBetween;
      }

      // Nutrition line
      const kcal = meal.baseCalories > 0
        ? meal.baseCalories
        : meal.protein * 4 + meal.carbs * 4 + meal.fat * 9;
      
      const nutritionText = `${kcal} kcal ${meal.protein} protein ${meal.carbs} carbs ${meal.fat} fat`;
      currentPage.drawText(nutritionText, {
        x: marginPoints + cardPadding,
        y: cardY,
        size: isSnack ? 7 : (useCompactMode ? 7 : 8),
        font: normalFont,
        color: TEXT_MEDIUM,
      });
      cardY -= nutritionHeight + spacingBetween;

      // Divider (red)
      drawDivider(marginPoints + cardPadding, cardY, cardInnerWidth);
      cardY -= dividerHeight + (isSnack ? 4 : (useCompactMode ? 5 : 6));

      // Two-column layout
      const leftX = marginPoints + cardPadding;
      const rightX = marginPoints + cardPadding + columnWidth + (isSnack ? 8 : 12);

      // Left: Ingredients
      let leftY = cardY;
      currentPage.drawText(safeTranslate("email.ingredients", "Ingredients"), {
        x: leftX,
        y: leftY,
        size: headerFontSize,
        font: normalFont,
        color: BRAND_RED,
      });
      leftY -= (isSnack ? 10 : (useCompactMode ? 11 : 13));

      filteredIngredients.forEach((ing) => {
        const ingName = safeTranslate(ing.ingredientKey, ing.ingredientKey);
        const ingText = `${ingName} — ${ing.grams} g`;
        const ingHeight = addText(ingText, itemFontSize, leftX, leftY, columnWidth - 4, TEXT_MEDIUM);
        leftY -= ingHeight + itemSpacing;
      });

      // Right: How to cook
      let rightY = cardY;
      currentPage.drawText(safeTranslate("email.howToCook", "How to cook"), {
        x: rightX,
        y: rightY,
        size: headerFontSize,
        font: normalFont,
        color: BRAND_RED,
      });
      rightY -= (isSnack ? 10 : (useCompactMode ? 11 : 13));

      meal.steps.forEach((step, stepIndex) => {
        const stepText = safeTranslate(step.stepKey, "");
        const displayText = stepText.includes('.') && !stepText.includes(' ') ? "" : stepText;
        if (displayText) {
          const stepLine = `${stepIndex + 1}. ${displayText}`;
          const stepHeight = addText(stepLine, itemFontSize, rightX, rightY, columnWidth - 4, TEXT_MEDIUM);
          rightY -= stepHeight + itemSpacing;
        }
      });

      currentY = Math.min(leftY, rightY) - (isSnack ? 10 : (useCompactMode ? 12 : 14));
    };

    // Render all 4 meals (breakfast, lunch, dinner with compact mode if needed, snack always small)
    renderMeal(safeTranslate("pdf.breakfast", "Breakfast"), day.breakfast, false, useCompact);
    renderMeal(safeTranslate("pdf.lunch", "Lunch"), day.lunch, false, useCompact);
    renderMeal(safeTranslate("pdf.dinner", "Dinner"), day.dinner, false, useCompact);
    renderMeal(safeTranslate("pdf.snack", "Snack"), day.snack, true, false);

    addFooter();
  });

  // ========== SHOPPING LIST PAGE (9) - TABLE FORMAT ==========
  currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  currentY = contentTop;
  pageNumber = 9;

  currentPage.drawText(safeTranslate("email.shoppingTitle", "Weekly shopping list"), {
    x: marginPoints,
    y: currentY,
    size: 18,
    font: normalFont,
    color: BRAND_RED,
  });
  currentY -= 28;

  // Organize by categories
  const groceryList = generateGroceryList(week);
  const categorized: Record<string, typeof groceryList> = {
    proteins: [],
    carbs: [],
    fats: [],
    fruits_vegetables: [],
    other: [],
  };

  groceryList.forEach((item) => {
    const category = categorizeIngredient(item.ingredientKey);
    categorized[category].push(item);
  });

  // Table layout: Product name (left) | Grams (right, aligned)
  const tablePadding = 10;
  const gramsColumnWidth = 75;
  const nameColumnWidth = contentWidth - gramsColumnWidth - tablePadding * 2;

  Object.entries(categorized).forEach(([category, items]) => {
    if (items.length === 0) return;

    if (currentY - 25 - items.length * 16 < contentBottom) {
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      currentY = contentTop;
      pageNumber++;
    }

    // Category block
    const categoryY = currentY;
    const itemHeight = 15;
    const categoryBlockHeight = items.length * itemHeight + tablePadding * 2;

    // Draw table border
    currentPage.drawRectangle({
      x: marginPoints,
      y: categoryY - categoryBlockHeight,
      width: contentWidth,
      height: categoryBlockHeight,
      borderColor: BORDER_LIGHT,
      borderWidth: 1,
    });

    // Table rows
    let itemY = categoryY - tablePadding - 11;
    items.forEach((item) => {
      const itemName = safeTranslate(item.ingredientKey, item.ingredientKey);
      const gramsText = `${item.totalGrams} g`;
      
      // LEFT column: Product name
      currentPage.drawText(itemName, {
        x: marginPoints + tablePadding,
        y: itemY,
        size: 9,
        font: normalFont,
        color: TEXT_MEDIUM,
      });
      
      // RIGHT column: Grams (aligned vertically)
      const gramsWidth = normalFont.widthOfTextAtSize(gramsText, 9);
      currentPage.drawText(gramsText, {
        x: marginPoints + contentWidth - tablePadding - gramsWidth,
        y: itemY,
        size: 9,
        font: normalFont,
        color: TEXT_DARK,
      });
      
      itemY -= itemHeight;
    });

    currentY = itemY - 10;
  });

  addFooter();

  // Generate PDF buffer
  const pdfBytes = await pdfDoc.save();
  const pdfBuffer = Buffer.from(pdfBytes);
  console.log(`✅ PDF generated successfully: ${pdfBuffer.length} bytes, ${pdfDoc.getPageCount()} pages`);
  return pdfBuffer;
}
