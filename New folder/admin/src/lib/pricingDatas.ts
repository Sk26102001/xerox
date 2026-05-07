// // BookPrinters.in Pricing Data
// // Based on the uploaded pricing chart

// export type PaperSize = 'A4' | 'B5' | 'A5' | '6x9';
// export type PaperType = '70gsm_normal' | '70gsm_premium' | '80gsm_sunshine' | '100gsm_sunshine' | '80gsm_bond' | '100gsm_bond';
// export type PrintColor = 'bw' | 'color';
// export type PrintSide = 'single' | 'double';
// export type QuantityTier = 'below50' | '50to150' | 'above150';
// export type BindingType = 'perfect_glue' | 'hardbound' | 'hardbound_flipper' | 'spiral' | 'centre_staple' | 'corner_staple' | 'soft_cover';

// // Double Side Printing Charges (₹ per page)
// const doubleSidePrices: Record<PaperSize, Record<QuantityTier, Record<PaperType, number>>> = {
//   A4: {
//     below50: { '70gsm_normal': 0.50, '70gsm_premium': 0.60, '80gsm_sunshine': 0.65, '100gsm_sunshine': 0.75, '80gsm_bond': 0.75, '100gsm_bond': 0.80 },
//     '50to150': { '70gsm_normal': 0.40, '70gsm_premium': 0.45, '80gsm_sunshine': 0.45, '100gsm_sunshine': 0.55, '80gsm_bond': 0.55, '100gsm_bond': 0.65 },
//     above150: { '70gsm_normal': 0.35, '70gsm_premium': 0.40, '80gsm_sunshine': 0.42, '100gsm_sunshine': 0.47, '80gsm_bond': 0.47, '100gsm_bond': 0.55 },
//   },
//   B5: {
//     below50: { '70gsm_normal': 0.50, '70gsm_premium': 0.60, '80gsm_sunshine': 0.65, '100gsm_sunshine': 0.75, '80gsm_bond': 0.75, '100gsm_bond': 0.80 },
//     '50to150': { '70gsm_normal': 0.40, '70gsm_premium': 0.45, '80gsm_sunshine': 0.45, '100gsm_sunshine': 0.55, '80gsm_bond': 0.55, '100gsm_bond': 0.65 },
//     above150: { '70gsm_normal': 0.35, '70gsm_premium': 0.40, '80gsm_sunshine': 0.42, '100gsm_sunshine': 0.47, '80gsm_bond': 0.47, '100gsm_bond': 0.55 },
//   },
//   A5: {
//     below50: { '70gsm_normal': 0.30, '70gsm_premium': 0.35, '80gsm_sunshine': 0.40, '100gsm_sunshine': 0.45, '80gsm_bond': 0.40, '100gsm_bond': 0.45 },
//     '50to150': { '70gsm_normal': 0.28, '70gsm_premium': 0.32, '80gsm_sunshine': 0.35, '100gsm_sunshine': 0.40, '80gsm_bond': 0.35, '100gsm_bond': 0.40 },
//     above150: { '70gsm_normal': 0.25, '70gsm_premium': 0.30, '80gsm_sunshine': 0.30, '100gsm_sunshine': 0.35, '80gsm_bond': 0.32, '100gsm_bond': 0.37 },
//   },
//   '6x9': {
//     below50: { '70gsm_normal': 0.32, '70gsm_premium': 0.37, '80gsm_sunshine': 0.42, '100gsm_sunshine': 0.47, '80gsm_bond': 0.42, '100gsm_bond': 0.47 },
//     '50to150': { '70gsm_normal': 0.30, '70gsm_premium': 0.34, '80gsm_sunshine': 0.37, '100gsm_sunshine': 0.42, '80gsm_bond': 0.37, '100gsm_bond': 0.42 },
//     above150: { '70gsm_normal': 0.27, '70gsm_premium': 0.32, '80gsm_sunshine': 0.32, '100gsm_sunshine': 0.37, '80gsm_bond': 0.34, '100gsm_bond': 0.39 },
//   },
// };

// // Single Side Printing Charges (₹ per page)
// const singleSidePrices: Record<PaperSize, Record<QuantityTier, Record<PaperType, number>>> = {
//   A4: {
//     below50: { '70gsm_normal': 0.70, '70gsm_premium': 0.82, '80gsm_sunshine': 0.90, '100gsm_sunshine': 1.00, '80gsm_bond': 1.00, '100gsm_bond': 1.10 },
//     '50to150': { '70gsm_normal': 0.60, '70gsm_premium': 0.67, '80gsm_sunshine': 0.70, '100gsm_sunshine': 0.75, '80gsm_bond': 0.80, '100gsm_bond': 0.95 },
//     above150: { '70gsm_normal': 0.55, '70gsm_premium': 0.62, '80gsm_sunshine': 0.67, '100gsm_sunshine': 0.63, '80gsm_bond': 0.67, '100gsm_bond': 0.90 },
//   },
//   B5: {
//     below50: { '70gsm_normal': 0.70, '70gsm_premium': 0.82, '80gsm_sunshine': 0.90, '100gsm_sunshine': 1.00, '80gsm_bond': 1.00, '100gsm_bond': 1.10 },
//     '50to150': { '70gsm_normal': 0.60, '70gsm_premium': 0.67, '80gsm_sunshine': 0.70, '100gsm_sunshine': 0.75, '80gsm_bond': 0.80, '100gsm_bond': 0.95 },
//     above150: { '70gsm_normal': 0.55, '70gsm_premium': 0.62, '80gsm_sunshine': 0.67, '100gsm_sunshine': 0.63, '80gsm_bond': 0.67, '100gsm_bond': 0.90 },
//   },
//   A5: {
//     below50: { '70gsm_normal': 0.40, '70gsm_premium': 0.42, '80gsm_sunshine': 0.53, '100gsm_sunshine': 0.58, '80gsm_bond': 0.58, '100gsm_bond': 0.60 },
//     '50to150': { '70gsm_normal': 0.38, '70gsm_premium': 0.40, '80gsm_sunshine': 0.48, '100gsm_sunshine': 0.52, '80gsm_bond': 0.52, '100gsm_bond': 0.55 },
//     above150: { '70gsm_normal': 0.35, '70gsm_premium': 0.35, '80gsm_sunshine': 0.43, '100gsm_sunshine': 0.47, '80gsm_bond': 0.47, '100gsm_bond': 0.52 },
//   },
//   '6x9': {
//     below50: { '70gsm_normal': 0.47, '70gsm_premium': 0.52, '80gsm_sunshine': 0.47, '100gsm_sunshine': 0.62, '80gsm_bond': 0.57, '100gsm_bond': 0.62 },
//     '50to150': { '70gsm_normal': 0.45, '70gsm_premium': 0.50, '80gsm_sunshine': 0.52, '100gsm_sunshine': 0.57, '80gsm_bond': 0.52, '100gsm_bond': 0.57 },
//     above150: { '70gsm_normal': 0.42, '70gsm_premium': 0.47, '80gsm_sunshine': 0.47, '100gsm_sunshine': 0.53, '80gsm_bond': 0.50, '100gsm_bond': 0.54 },
//   },
// };

// // Color printing multiplier (approx 6x cost for color)
// const colorMultiplier = 6;

// export const bindingPrices: Record<BindingType, number> = {
//   soft_cover: 0,
//   perfect_glue: 20,
//   hardbound: 50,
//   hardbound_flipper: 70,
//   spiral: 20,
//   centre_staple: 5,
//   corner_staple: 5,
// };

// export const bindingLabels: Record<BindingType, string> = {
//   soft_cover: 'Soft Cover (No Binding)',
//   perfect_glue: 'Perfect Glue Binding (+₹20)',
//   hardbound: 'Hard Bound (+₹50)',
//   hardbound_flipper: 'Hard Bound with Flipper (+₹70)',
//   spiral: 'Spiral Bound (+₹20)',
//   centre_staple: 'Centre Staple (+₹5)',
//   corner_staple: 'Corner Staple (+₹5)',
// };

// export const paperTypeLabels: Record<PaperType, string> = {
//   '70gsm_normal': '70 GSM Normal White',
//   '70gsm_premium': '70 GSM Premium White',
//   '80gsm_sunshine': '80 GSM Sunshine',
//   '100gsm_sunshine': '100 GSM Sunshine',
//   '80gsm_bond': '80 GSM Bond',
//   '100gsm_bond': '100 GSM Bond',
// };

// function getQuantityTier(copies: number): QuantityTier {
//   if (copies < 50) return 'below50';
//   if (copies <= 150) return '50to150';
//   return 'above150';
// }

// export interface PriceCalculationInput {
//   pages: number;
//   copies: number;
//   paperSize: PaperSize;
//   paperType: PaperType;
//   printColor: PrintColor;
//   printSide: PrintSide;
//   bindingType: BindingType;
// }

// export interface PriceBreakdown {
//   pricePerPage: number;
//   printingCost: number;
//   bindingCost: number;
//   totalPerCopy: number;
//   totalCost: number;
//   gst: number;
//   grandTotal: number;
// }

// export function calculatePrice(input: PriceCalculationInput): PriceBreakdown {
//   const { pages, copies, paperSize, paperType, printColor, printSide, bindingType } = input;
  
//   const tier = getQuantityTier(copies);
//   const priceTable = printSide === 'double' ? doubleSidePrices : singleSidePrices;
  
//   let pricePerPage = priceTable[paperSize][tier][paperType];
  
//   if (printColor === 'color') {
//     pricePerPage = pricePerPage * colorMultiplier;
//   }
  
//   const printingCost = pricePerPage * pages * copies;
//   const bindingCost = bindingPrices[bindingType] * copies;
//   const totalPerCopy = (pricePerPage * pages) + bindingPrices[bindingType];
//   const totalCost = printingCost + bindingCost;
//   const gst = totalCost * 0.18; // 18% GST
//   const grandTotal = totalCost + gst;
  
//   return {
//     pricePerPage,
//     printingCost,
//     bindingCost,
//     totalPerCopy,
//     totalCost,
//     gst,
//     grandTotal,
//   };
// }





// BookPrinters.in Pricing Data with Weight Estimation + Courier Charges
// All original fields are kept exactly as provided





// export type PaperSize = 'A4' | 'B5' | 'A5' | '6x9';
// export type PaperType = '70gsm_normal' | '70gsm_premium' | '80gsm_sunshine' | '100gsm_natural' | '100gsm_sunshine' | '80gsm_bond' | '100gsm_bond';
// export type PrintColor = 'bw' | 'color';
// export type PrintSide = 'single' | 'double';
// export type QuantityTier = 'below50' | '50to150' | 'above150';
// export type BindingType = 'perfect_glue' | 'hardbound' | 'hardbound_flipper' | 'spiral' | 'centre_staple' | 'corner_staple' | 'soft_cover';

// // ───────────────────────────────────────────────
// // Double Side Printing Charges (₹ per page)
// // ───────────────────────────────────────────────
// const doubleSidePrices: Record<PaperSize, Record<QuantityTier, Record<PaperType, number>>> = {
//   A4: {
//     below50: {
//       '70gsm_normal': 0.50,
//       '70gsm_premium': 0.60,
//       '80gsm_sunshine': 0.65,
//       '100gsm_sunshine': 0.75,
//       '100gsm_natural': 0.75,
//       '80gsm_bond': 0.75,
//       '100gsm_bond': 0.80
//     },
//     '50to150': {
//       '70gsm_normal': 0.40,
//       '70gsm_premium': 0.45,
//       '80gsm_sunshine': 0.45,
//       '100gsm_sunshine': 0.55,
//       '100gsm_natural': 0.55,
//       '80gsm_bond': 0.55,
//       '100gsm_bond': 0.65
//     },
//     above150: {
//       '70gsm_normal': 0.35,
//       '70gsm_premium': 0.40,
//       '80gsm_sunshine': 0.42,
//       '100gsm_sunshine': 0.47,
//       '100gsm_natural': 0.47,
//       '80gsm_bond': 0.47,
//       '100gsm_bond': 0.55
//     },
//   },
//   B5: {
//     below50: {
//       '70gsm_normal': 0.50,
//       '70gsm_premium': 0.60,
//       '80gsm_sunshine': 0.65,
//       '100gsm_sunshine': 0.75,
//       '100gsm_natural': 0.75,
//       '80gsm_bond': 0.75,
//       '100gsm_bond': 0.80
//     },
//     '50to150': {
//       '70gsm_normal': 0.40,
//       '70gsm_premium': 0.45,
//       '80gsm_sunshine': 0.45,
//       '100gsm_sunshine': 0.55,
//       '100gsm_natural': 0.55,
//       '80gsm_bond': 0.55,
//       '100gsm_bond': 0.65
//     },
//     above150: {
//       '70gsm_normal': 0.35,
//       '70gsm_premium': 0.40,
//       '80gsm_sunshine': 0.42,
//       '100gsm_sunshine': 0.47,
//       '100gsm_natural': 0.47,
//       '80gsm_bond': 0.47,
//       '100gsm_bond': 0.55
//     },
//   },
//   A5: {
//     below50: {
//       '70gsm_normal': 0.30,
//       '70gsm_premium': 0.35,
//       '80gsm_sunshine': 0.40,
//       '100gsm_sunshine': 0.45,
//       '100gsm_natural': 0.45,
//       '80gsm_bond': 0.40,
//       '100gsm_bond': 0.45
//     },
//     '50to150': {
//       '70gsm_normal': 0.28,
//       '70gsm_premium': 0.32,
//       '80gsm_sunshine': 0.35,
//       '100gsm_sunshine': 0.40,
//       '100gsm_natural': 0.42,
//       '80gsm_bond': 0.35,
//       '100gsm_bond': 0.42
//     },
//     above150: {
//       '70gsm_normal': 0.25,
//       '70gsm_premium': 0.30,
//       '80gsm_sunshine': 0.32,
//       '100gsm_sunshine': 0.37,
//       '100gsm_natural': 0.37,
//       '80gsm_bond': 0.32,
//       '100gsm_bond': 0.37
//     },
//   },
//   '6x9': {
//     below50: {
//       '70gsm_normal': 0.32,
//       '70gsm_premium': 0.37,
//       '80gsm_sunshine': 0.42,
//       '100gsm_sunshine': 0.47,
//       '100gsm_natural': 0.47,
//       '80gsm_bond': 0.42,
//       '100gsm_bond': 0.47
//     },
//     '50to150': {
//       '70gsm_normal': 0.30,
//       '70gsm_premium': 0.34,
//       '80gsm_sunshine': 0.37,
//       '100gsm_sunshine': 0.42,
//       '100gsm_natural': 0.42,
//       '80gsm_bond': 0.37,
//       '100gsm_bond': 0.42
//     },
//     above150: {
//       '70gsm_normal': 0.27,
//       '70gsm_premium': 0.32,
//       '80gsm_sunshine': 0.32,
//       '100gsm_sunshine': 0.37,
//       '100gsm_natural': 0.37,
//       '80gsm_bond': 0.34,
//       '100gsm_bond': 0.39
//     },
//   },
// };

// // ───────────────────────────────────────────────
// // Single Side Printing Charges (₹ per page)
// // ───────────────────────────────────────────────
// const singleSidePrices: Record<PaperSize, Record<QuantityTier, Record<PaperType, number>>> = {
//   A4: {
//     below50: {
//       '70gsm_normal': 0.70,
//       '70gsm_premium': 0.82,
//       '80gsm_sunshine': 0.90,
//       '100gsm_sunshine': 1.00,
//       '100gsm_natural': 1.00,
//       '80gsm_bond': 1.00,
//       '100gsm_bond': 1.10
//     },
//     '50to150': {
//       '70gsm_normal': 0.60,
//       '70gsm_premium': 0.67,
//       '80gsm_sunshine': 0.70,
//       '100gsm_sunshine': 0.75,
//       '100gsm_natural': 0.75,
//       '80gsm_bond': 0.80,
//       '100gsm_bond': 0.95
//     },
//     above150: {
//       '70gsm_normal': 0.55,
//       '70gsm_premium': 0.62,
//       '80gsm_sunshine': 0.67,
//       '100gsm_sunshine': 0.63,
//       '100gsm_natural': 0.63,
//       '80gsm_bond': 0.67,
//       '100gsm_bond': 0.90
//     },
//   },
//   B5: {
//     below50: {
//       '70gsm_normal': 0.70,
//       '70gsm_premium': 0.82,
//       '80gsm_sunshine': 0.90,
//       '100gsm_sunshine': 1.00,
//       '100gsm_natural': 1.00,
//       '80gsm_bond': 1.00,
//       '100gsm_bond': 1.10
//     },
//     '50to150': {
//       '70gsm_normal': 0.60,
//       '70gsm_premium': 0.67,
//       '80gsm_sunshine': 0.70,
//       '100gsm_sunshine': 0.75,
//       '100gsm_natural': 0.75,
//       '80gsm_bond': 0.80,
//       '100gsm_bond': 0.95
//     },
//     above150: {
//       '70gsm_normal': 0.55,
//       '70gsm_premium': 0.62,
//       '80gsm_sunshine': 0.67,
//       '100gsm_sunshine': 0.63,
//       '100gsm_natural': 0.63,
//       '80gsm_bond': 0.67,
//       '100gsm_bond': 0.90
//     },
//   },
//   A5: {
//     below50: {
//       '70gsm_normal': 0.40,
//       '70gsm_premium': 0.42,
//       '80gsm_sunshine': 0.53,
//       '100gsm_sunshine': 0.58,
//       '100gsm_natural': 0.58,
//       '80gsm_bond': 0.58,
//       '100gsm_bond': 0.60
//     },
//     '50to150': {
//       '70gsm_normal': 0.38,
//       '70gsm_premium': 0.40,
//       '80gsm_sunshine': 0.48,
//       '100gsm_sunshine': 0.52,
//       '100gsm_natural': 0.52,
//       '80gsm_bond': 0.52,
//       '100gsm_bond': 0.55
//     },
//     above150: {
//       '70gsm_normal': 0.35,
//       '70gsm_premium': 0.35,
//       '80gsm_sunshine': 0.43,
//       '100gsm_sunshine': 0.47,
//       '100gsm_natural': 0.47,
//       '80gsm_bond': 0.47,
//       '100gsm_bond': 0.52
//     },
//   },
//   '6x9': {
//     below50: {
//       '70gsm_normal': 0.47,
//       '70gsm_premium': 0.52,
//       '80gsm_sunshine': 0.47,
//       '100gsm_sunshine': 0.62,
//       '100gsm_natural': 0.62,
//       '80gsm_bond': 0.57,
//       '100gsm_bond': 0.62
//     },
//     '50to150': {
//       '70gsm_normal': 0.45,
//       '70gsm_premium': 0.50,
//       '80gsm_sunshine': 0.52,
//       '100gsm_sunshine': 0.57,
//       '100gsm_natural': 0.57,
//       '80gsm_bond': 0.52,
//       '100gsm_bond': 0.57
//     },
//     above150: {
//       '70gsm_normal': 0.42,
//       '70gsm_premium': 0.47,
//       '80gsm_sunshine': 0.47,
//       '100gsm_sunshine': 0.53,
//       '100gsm_natural': 0.53,
//       '80gsm_bond': 0.52,
//       '100gsm_bond': 0.54
//     },
//   },
// };

// const colorMultiplier = 6;

// export const bindingPrices: Record<BindingType, number> = {
//   soft_cover: 0,
//   perfect_glue: 20,
//   hardbound: 70,
//   hardbound_flipper: 95,
//   spiral: 20,
//   centre_staple: 5,
//   corner_staple: 5,
// };

// export const bindingLabels: Record<BindingType, string> = {
//   soft_cover: 'Soft Cover (No Binding)',
//   perfect_glue: 'Perfect Glue Binding (+₹20)',
//   hardbound: 'Hard Bound (+₹70)',
//   hardbound_flipper: 'Hard Bound with Flipper (+₹95)',
//   spiral: 'Spiral Bound (+₹20)',
//   centre_staple: 'Centre Staple (+₹5)',
//   corner_staple: 'Corner Staple (+₹5)',
// };

// export const paperTypeLabels: Record<PaperType, string> = {
//   '70gsm_normal': '70 GSM Normal White',
//   '70gsm_premium': '70 GSM Premium White',
//   '80gsm_sunshine': '80 GSM Sunshine',
//   '100gsm_natural': '100 GSM Natural shade',
//   '100gsm_sunshine': '100 GSM Sunshine',
//   '80gsm_bond': '80 GSM Bond',
//   '100gsm_bond': '100 GSM Bond',
// };

// // ───────────────────────────────────────────────
// // Helper: Quantity Tier
// // ───────────────────────────────────────────────
// function getQuantityTier(copies: number): QuantityTier {
//   if (copies < 50) return 'below50';
//   if (copies <= 150) return '50to150';
//   return 'above150';
// }

// // ───────────────────────────────────────────────
// // Weight Estimation per copy
// // ───────────────────────────────────────────────
// function estimateWeightInKg(
//   pages: number,
//   paperType: PaperType,
//   paperSize: PaperSize,
//   bindingType: BindingType
// ): number {
//   const gsmMap: Record<PaperType, number> = {
//     '70gsm_normal': 70,
//     '70gsm_premium': 72,
//     '80gsm_sunshine': 80,
//     '100gsm_natural': 100,
//     '100gsm_sunshine': 100,
//     '80gsm_bond': 80,
//     '100gsm_bond': 100,
//   };

//   const baseGsm = gsmMap[paperType] || 80;

//   const sizeFactor: Record<PaperSize, number> = {
//     A4: 1.00,
//     B5: 0.78,
//     A5: 0.50,
//     '6x9': 0.65,
//   };

//   const areaFactor = sizeFactor[paperSize];

//   // Approximate grams per printed page (double-sided sheet)
//   const gramsPerPage = baseGsm * 0.06237 * areaFactor; // A4 area in m² ≈ 0.06237

//   // Number of physical sheets
//   const sheets = Math.ceil(pages / 2);

//   let textWeightGrams = sheets * gramsPerPage;

//   // Extra weight: cover + binding glue/staples/etc.
//   let extraGrams = 35; // soft cover, spiral, staple
//   if (bindingType.includes('hardbound')) extraGrams = 180;
//   else if (bindingType === 'perfect_glue') extraGrams = 65;

//   const totalGrams = textWeightGrams + extraGrams;
//   // Round to nearest 100g, minimum 250g for courier purposes
//   return Math.max(0.25, Math.round(totalGrams / 100) / 10);
// }

// // ───────────────────────────────────────────────
// // Courier cost per copy (pan-India approximate 2025–2026)
// // ───────────────────────────────────────────────
// const shippingSlabs = [
//   { maxKg: 0.5,  price: 65  },
//   { maxKg: 1.0,  price: 95  },
//   { maxKg: 2.0,  price: 145 },
//   { maxKg: 5.0,  price: 235 },
//   { maxKg: 10.0, price: 380 },
// ];

// function getShippingCostPerCopy(weightKg: number): number {
//   for (const slab of shippingSlabs) {
//     if (weightKg <= slab.maxKg) return slab.price;
//   }
//   // Above 10 kg (very rare for single book)
//   return 380 + Math.ceil(weightKg - 10) * 38;
// }

// // ───────────────────────────────────────────────
// // Interfaces
// // ───────────────────────────────────────────────
// export interface PriceCalculationInput {
//   pages: number;
//   copies: number;
//   paperSize: PaperSize;
//   paperType: PaperType;
//   printColor: PrintColor;
//   printSide: PrintSide;
//   bindingType: BindingType;
//   includeShipping?: boolean;     // default = false → pickup / local
// }

// export interface PriceBreakdown {
//   pricePerPage: number;
//   printingCost: number;
//   bindingCost: number;
//   totalPerCopy: number;
//   totalCost: number;
//   gst: number;
//   grandTotal: number;
//   estimatedWeightPerCopyKg: number;
//   shippingCost: number;               // total for all copies
//   totalCostWithShipping: number;
//   grandTotalWithShipping: number;
// }

// // ───────────────────────────────────────────────
// // Main price calculation function
// // ───────────────────────────────────────────────
// export function calculatePrice(input: PriceCalculationInput): PriceBreakdown {
//   const {
//     pages,
//     copies,
//     paperSize,
//     paperType,
//     printColor,
//     printSide,
//     bindingType,
//     includeShipping = false,
//   } = input;

//   const tier = getQuantityTier(copies);
//   const priceTable = printSide === 'double' ? doubleSidePrices : singleSidePrices;

//   // Fallback price if something is missing
//   let pricePerPage = priceTable[paperSize]?.[tier]?.[paperType] ?? 0.50;

//   if (printColor === 'color') {
//     pricePerPage *= colorMultiplier;
//   }

//   const printingCost = pricePerPage * pages * copies;
//   const bindingCost = bindingPrices[bindingType] * copies;
//   const totalCost = printingCost + bindingCost;
//   const gst = totalCost * 0.05;
//   const grandTotal = totalCost + gst;

//   // Weight & Shipping
//   const weightKg = estimateWeightInKg(pages, paperType, paperSize, bindingType);
//   const shippingPerCopy = includeShipping ? getShippingCostPerCopy(weightKg) : 0;
//   const totalShipping = shippingPerCopy * copies;

//   return {
//     pricePerPage,
//     printingCost,
//     bindingCost,
//     totalPerCopy: (pricePerPage * pages) + bindingPrices[bindingType],
//     totalCost,
//     gst,
//     grandTotal,
//     estimatedWeightPerCopyKg: weightKg,
//     shippingCost: totalShipping,
//     totalCostWithShipping: totalCost + totalShipping,
//     grandTotalWithShipping: (totalCost + totalShipping) * 1.05,
//   };
// }





// import { PricingConfig } from '@/services/pricingServices';

// export type PaperSize = 'A4' | 'B5' | 'A5' | '6x9';
// export type PaperType = '70gsm_normal' | '70gsm_premium' | '80gsm_sunshine' | '100gsm_natural' | '100gsm_sunshine' | '80gsm_bond' | '100gsm_bond';
// export type PrintColor = 'bw' | 'color';
// export type PrintSide = 'single' | 'double';
// export type QuantityTier = 'below50' | '50to150' | 'above150';
// export type BindingType = 'perfect_glue' | 'hardbound' | 'hardbound_flipper' | 'spiral' | 'centre_staple' | 'corner_staple' | 'soft_cover';

// export interface PriceCalculationInput {
//   pages: number;
//   copies: number;
//   paperSize: PaperSize;
//   paperType: PaperType;
//   printColor: PrintColor;
//   printSide: PrintSide;
//   bindingType: BindingType;
// }

// export interface PriceBreakdown {
//   pricePerPage: number;
//   printingCost: number;
//   bindingCost: number;
//   totalCost: number;
//   gst: number;
//   grandTotal: number;
// }

// let globalConfig: PricingConfig | null = null;

// export const setPricingConfig = (config: PricingConfig) => {
//   globalConfig = config;
// };

// export const getPricingConfig = (): PricingConfig | null => {
//   return globalConfig;
// };

// // Default pricing config as fallback
// export const defaultPricingConfig: PricingConfig = {
//   doubleSidePrices: {
//     A4: {
//       below50: { '70gsm_normal': 0.50, '70gsm_premium': 0.60, '80gsm_sunshine': 0.65, '100gsm_sunshine': 0.75, '100gsm_natural': 0.75, '80gsm_bond': 0.75, '100gsm_bond': 0.80 },
//       '50to150': { '70gsm_normal': 0.40, '70gsm_premium': 0.45, '80gsm_sunshine': 0.45, '100gsm_sunshine': 0.55, '100gsm_natural': 0.55, '80gsm_bond': 0.55, '100gsm_bond': 0.65 },
//       above150: { '70gsm_normal': 0.35, '70gsm_premium': 0.40, '80gsm_sunshine': 0.42, '100gsm_sunshine': 0.47, '100gsm_natural': 0.47, '80gsm_bond': 0.47, '100gsm_bond': 0.55 },
//     },
//     B5: {
//       below50: { '70gsm_normal': 0.50, '70gsm_premium': 0.60, '80gsm_sunshine': 0.65, '100gsm_sunshine': 0.75, '100gsm_natural': 0.75, '80gsm_bond': 0.75, '100gsm_bond': 0.80 },
//       '50to150': { '70gsm_normal': 0.40, '70gsm_premium': 0.45, '80gsm_sunshine': 0.45, '100gsm_sunshine': 0.55, '100gsm_natural': 0.55, '80gsm_bond': 0.55, '100gsm_bond': 0.65 },
//       above150: { '70gsm_normal': 0.35, '70gsm_premium': 0.40, '80gsm_sunshine': 0.42, '100gsm_sunshine': 0.47, '100gsm_natural': 0.47, '80gsm_bond': 0.47, '100gsm_bond': 0.55 },
//     },
//     A5: {
//       below50: { '70gsm_normal': 0.30, '70gsm_premium': 0.35, '80gsm_sunshine': 0.40, '100gsm_sunshine': 0.45, '100gsm_natural': 0.45, '80gsm_bond': 0.40, '100gsm_bond': 0.45 },
//       '50to150': { '70gsm_normal': 0.28, '70gsm_premium': 0.32, '80gsm_sunshine': 0.35, '100gsm_sunshine': 0.40, '100gsm_natural': 0.42, '80gsm_bond': 0.35, '100gsm_bond': 0.42 },
//       above150: { '70gsm_normal': 0.25, '70gsm_premium': 0.30, '80gsm_sunshine': 0.32, '100gsm_sunshine': 0.37, '100gsm_natural': 0.37, '80gsm_bond': 0.32, '100gsm_bond': 0.37 },
//     },
//     '6x9': {
//       below50: { '70gsm_normal': 0.32, '70gsm_premium': 0.37, '80gsm_sunshine': 0.42, '100gsm_sunshine': 0.47, '100gsm_natural': 0.47, '80gsm_bond': 0.42, '100gsm_bond': 0.47 },
//       '50to150': { '70gsm_normal': 0.30, '70gsm_premium': 0.34, '80gsm_sunshine': 0.37, '100gsm_sunshine': 0.42, '100gsm_natural': 0.42, '80gsm_bond': 0.37, '100gsm_bond': 0.42 },
//       above150: { '70gsm_normal': 0.27, '70gsm_premium': 0.32, '80gsm_sunshine': 0.32, '100gsm_sunshine': 0.37, '100gsm_natural': 0.37, '80gsm_bond': 0.34, '100gsm_bond': 0.39 },
//     },
//   },
//   singleSidePrices: {
//     A4: {
//       below50: { '70gsm_normal': 0.70, '70gsm_premium': 0.82, '80gsm_sunshine': 0.90, '100gsm_sunshine': 1.00, '100gsm_natural': 1.00, '80gsm_bond': 1.00, '100gsm_bond': 1.10 },
//       '50to150': { '70gsm_normal': 0.60, '70gsm_premium': 0.67, '80gsm_sunshine': 0.70, '100gsm_sunshine': 0.75, '100gsm_natural': 0.75, '80gsm_bond': 0.80, '100gsm_bond': 0.95 },
//       above150: { '70gsm_normal': 0.55, '70gsm_premium': 0.62, '80gsm_sunshine': 0.67, '100gsm_sunshine': 0.63, '100gsm_natural': 0.63, '80gsm_bond': 0.67, '100gsm_bond': 0.90 },
//     },
//     B5: {
//       below50: { '70gsm_normal': 0.70, '70gsm_premium': 0.82, '80gsm_sunshine': 0.90, '100gsm_sunshine': 1.00, '100gsm_natural': 1.00, '80gsm_bond': 1.00, '100gsm_bond': 1.10 },
//       '50to150': { '70gsm_normal': 0.60, '70gsm_premium': 0.67, '80gsm_sunshine': 0.70, '100gsm_sunshine': 0.75, '100gsm_natural': 0.75, '80gsm_bond': 0.80, '100gsm_bond': 0.95 },
//       above150: { '70gsm_normal': 0.55, '70gsm_premium': 0.62, '80gsm_sunshine': 0.67, '100gsm_sunshine': 0.63, '100gsm_natural': 0.63, '80gsm_bond': 0.67, '100gsm_bond': 0.90 },
//     },
//     A5: {
//       below50: { '70gsm_normal': 0.40, '70gsm_premium': 0.42, '80gsm_sunshine': 0.53, '100gsm_sunshine': 0.58, '100gsm_natural': 0.58, '80gsm_bond': 0.58, '100gsm_bond': 0.60 },
//       '50to150': { '70gsm_normal': 0.38, '70gsm_premium': 0.40, '80gsm_sunshine': 0.48, '100gsm_sunshine': 0.52, '100gsm_natural': 0.52, '80gsm_bond': 0.52, '100gsm_bond': 0.55 },
//       above150: { '70gsm_normal': 0.35, '70gsm_premium': 0.35, '80gsm_sunshine': 0.43, '100gsm_sunshine': 0.47, '100gsm_natural': 0.47, '80gsm_bond': 0.47, '100gsm_bond': 0.52 },
//     },
//     '6x9': {
//       below50: { '70gsm_normal': 0.47, '70gsm_premium': 0.52, '80gsm_sunshine': 0.47, '100gsm_sunshine': 0.62, '100gsm_natural': 0.62, '80gsm_bond': 0.57, '100gsm_bond': 0.62 },
//       '50to150': { '70gsm_normal': 0.45, '70gsm_premium': 0.50, '80gsm_sunshine': 0.52, '100gsm_sunshine': 0.57, '100gsm_natural': 0.57, '80gsm_bond': 0.52, '100gsm_bond': 0.57 },
//       above150: { '70gsm_normal': 0.42, '70gsm_premium': 0.47, '80gsm_sunshine': 0.47, '100gsm_sunshine': 0.53, '100gsm_natural': 0.53, '80gsm_bond': 0.52, '100gsm_bond': 0.54 },
//     },
//   },
//   bindingPrices: {
//     soft_cover: 0,
//     perfect_glue: 20,
//     hardbound: 70,
//     hardbound_flipper: 95,
//     spiral: 20,
//     centre_staple: 5,
//     corner_staple: 5,
//   },
//   colorMultiplier: 6,
//   gstRate: 0.05,
// };

// const getQuantityTier = (copies: number): QuantityTier => {
//   if (copies < 50) return 'below50';
//   if (copies <= 150) return '50to150';
//   return 'above150';
// };

// const getNestedPrice = (priceTable: any, paperSize: PaperSize, tier: QuantityTier, paperType: PaperType): number | null => {
//   try {
//     return priceTable[paperSize]?.[tier]?.[paperType];
//   } catch (e) {
//     return null;
//   }
// };

// export const calculatePrice = (input: PriceCalculationInput, configOverride?: PricingConfig): PriceBreakdown => {
//   const config = configOverride || globalConfig || defaultPricingConfig;
//   const { pages, copies, paperSize, paperType, printColor, printSide, bindingType } = input;

//   const tier = getQuantityTier(copies);
//   const priceTable = printSide === 'double' ? config.doubleSidePrices : config.singleSidePrices;

//   let pricePerPage = getNestedPrice(priceTable, paperSize, tier, paperType) || 0.50;

//   if (printColor === 'color') {
//     pricePerPage *= config.colorMultiplier;
//   }

//   const printingCost = pricePerPage * pages * copies;
//   const bindingCost = (config.bindingPrices[bindingType] ?? 0) * copies;
//   const totalCost = printingCost + bindingCost;
//   const gst = totalCost * config.gstRate;
//   const grandTotal = totalCost + gst;

//   return {
//     pricePerPage: Math.round(pricePerPage * 100) / 100,
//     printingCost: Math.round(printingCost * 100) / 100,
//     bindingCost: Math.round(bindingCost * 100) / 100,
//     totalCost: Math.round(totalCost * 100) / 100,
//     gst: Math.round(gst * 100) / 100,
//     grandTotal: Math.round(grandTotal * 100) / 100,
//   };
// };

// export const getPriceForConfig = (
//   paperSize: PaperSize,
//   paperType: PaperType,
//   printSide: PrintSide,
//   tier: QuantityTier,
//   config: PricingConfig = defaultPricingConfig
// ): number => {
//   const priceTable = printSide === 'double' ? config.doubleSidePrices : config.singleSidePrices;
//   return getNestedPrice(priceTable, paperSize, tier, paperType) ?? 0;
// };

// export const allPaperSizes: PaperSize[] = ['A4', 'B5', 'A5', '6x9'];
// export const allPaperTypes: PaperType[] = ['70gsm_normal', '70gsm_premium', '80gsm_sunshine', '100gsm_natural', '100gsm_sunshine', '80gsm_bond', '100gsm_bond'];
// export const allBindingTypes: BindingType[] = ['soft_cover', 'perfect_glue', 'hardbound', 'hardbound_flipper', 'spiral', 'centre_staple', 'corner_staple'];
// export const allQuantityTiers: QuantityTier[] = ['below50', '50to150', 'above150'];

// export const bindingLabels: Record<BindingType, string> = {
//   soft_cover: 'Soft Cover (No Binding)',
//   perfect_glue: 'Perfect Glue Binding (+₹20)',
//   hardbound: 'Hard Bound (+₹70)',
//   hardbound_flipper: 'Hard Bound with Flipper (+₹95)',
//   spiral: 'Spiral Bound (+₹20)',
//   centre_staple: 'Centre Staple (+₹5)',
//   corner_staple: 'Corner Staple (+₹5)',
// };

// export const paperTypeLabels: Record<PaperType, string> = {
//   '70gsm_normal': '70 GSM Normal White',
//   '70gsm_premium': '70 GSM Premium White',
//   '80gsm_sunshine': '80 GSM Sunshine',
//   '100gsm_natural': '100 GSM Natural Shade',
//   '100gsm_sunshine': '100 GSM Sunshine',
//   '80gsm_bond': '80 GSM Bond',
//   '100gsm_bond': '100 GSM Bond',
// };

// export const paperSizeLabels: Record<PaperSize, string> = {
//   A4: 'A4 (210×297mm)',
//   B5: 'B5 (176×250mm)',
//   A5: 'A5 (148×210mm)',
//   '6x9': '6×9 inch',
// };

// export const quantityTierLabels: Record<QuantityTier, string> = {
//   below50: 'Below 50',
//   '50to150': '50–150',
//   above150: 'Above 150',
// };







// // lib/pricingDatas.ts
// import { PricingConfig } from '@/services/pricingServices';

// export type PaperSize = 'A4' | 'B5' | 'A5' | '6x9';
// export type PaperType = '70gsm_normal' | '70gsm_premium' | '80gsm_sunshine' | '100gsm_natural' | '100gsm_sunshine' | '80gsm_bond' | '100gsm_bond';
// export type PrintColor = 'bw' | 'color';
// export type PrintSide = 'single' | 'double';
// export type QuantityTier = 'below50' | '50to150' | 'above150';
// export type BindingType = 'perfect_glue' | 'hardbound' | 'hardbound_flipper' | 'spiral' | 'centre_staple' | 'corner_staple' | 'soft_cover';


// // ... rest of your pricing data exports

// export const allPaperSizes: PaperSize[] = ['A4', 'B5', 'A5', '6x9'];
// export const allPaperTypes: PaperType[] = ['70gsm_normal', '70gsm_premium', '80gsm_sunshine', '100gsm_natural', '100gsm_sunshine', '80gsm_bond', '100gsm_bond'];
// export const allBindingTypes: BindingType[] = ['soft_cover', 'perfect_glue', 'hardbound', 'hardbound_flipper', 'spiral', 'centre_staple', 'corner_staple'];
// export const allQuantityTiers: QuantityTier[] = ['below50', '50to150', 'above150'];

// export const paperSizeLabels: Record<PaperSize, string> = {
//   A4: 'A4',
//   B5: 'B5',
//   A5: 'A5',
//   '6x9': '6×9',
// };

// export const paperTypeLabels: Record<PaperType, string> = {
//   '70gsm_normal': '70 GSM Normal White',
//   '70gsm_premium': '70 GSM Premium White',
//   '80gsm_sunshine': '80 GSM Sunshine',
//   '100gsm_natural': '100 GSM Natural Shade',
//   '100gsm_sunshine': '100 GSM Sunshine',
//   '80gsm_bond': '80 GSM Bond',
//   '100gsm_bond': '100 GSM Bond',
// };

// export const bindingLabels: Record<BindingType, string> = {
//   soft_cover: 'Soft Cover (No Binding)',
//   perfect_glue: 'Perfect Glue Binding',
//   hardbound: 'Hard Bound',
//   hardbound_flipper: 'Hard Bound with Flipper',
//   spiral: 'Spiral Bound',
//   centre_staple: 'Centre Staple',
//   corner_staple: 'Corner Staple',
// };

// export const quantityTierLabels: Record<QuantityTier, string> = {
//   below50: 'Below 50',
//   '50to150': '50–150',
//   above150: 'Above 150',
// };

// // Default pricing configuration as fallback
// export const defaultPricingConfig: PricingConfig = {
//   doubleSidePrices: {
//     A4: {
//       below50: { '70gsm_normal': 0.50, '70gsm_premium': 0.60, '80gsm_sunshine': 0.65, '100gsm_sunshine': 0.75, '100gsm_natural': 0.75, '80gsm_bond': 0.75, '100gsm_bond': 0.80 },
//       '50to150': { '70gsm_normal': 0.40, '70gsm_premium': 0.45, '80gsm_sunshine': 0.45, '100gsm_sunshine': 0.55, '100gsm_natural': 0.55, '80gsm_bond': 0.55, '100gsm_bond': 0.65 },
//       above150: { '70gsm_normal': 0.35, '70gsm_premium': 0.40, '80gsm_sunshine': 0.42, '100gsm_sunshine': 0.47, '100gsm_natural': 0.47, '80gsm_bond': 0.47, '100gsm_bond': 0.55 },
//     },
//     B5: {
//       below50: { '70gsm_normal': 0.50, '70gsm_premium': 0.60, '80gsm_sunshine': 0.65, '100gsm_sunshine': 0.75, '100gsm_natural': 0.75, '80gsm_bond': 0.75, '100gsm_bond': 0.80 },
//       '50to150': { '70gsm_normal': 0.40, '70gsm_premium': 0.45, '80gsm_sunshine': 0.45, '100gsm_sunshine': 0.55, '100gsm_natural': 0.55, '80gsm_bond': 0.55, '100gsm_bond': 0.65 },
//       above150: { '70gsm_normal': 0.35, '70gsm_premium': 0.40, '80gsm_sunshine': 0.42, '100gsm_sunshine': 0.47, '100gsm_natural': 0.47, '80gsm_bond': 0.47, '100gsm_bond': 0.55 },
//     },
//     A5: {
//       below50: { '70gsm_normal': 0.30, '70gsm_premium': 0.35, '80gsm_sunshine': 0.40, '100gsm_sunshine': 0.45, '100gsm_natural': 0.45, '80gsm_bond': 0.40, '100gsm_bond': 0.45 },
//       '50to150': { '70gsm_normal': 0.28, '70gsm_premium': 0.32, '80gsm_sunshine': 0.35, '100gsm_sunshine': 0.40, '100gsm_natural': 0.42, '80gsm_bond': 0.35, '100gsm_bond': 0.42 },
//       above150: { '70gsm_normal': 0.25, '70gsm_premium': 0.30, '80gsm_sunshine': 0.32, '100gsm_sunshine': 0.37, '100gsm_natural': 0.37, '80gsm_bond': 0.32, '100gsm_bond': 0.37 },
//     },
//     '6x9': {
//       below50: { '70gsm_normal': 0.32, '70gsm_premium': 0.37, '80gsm_sunshine': 0.42, '100gsm_sunshine': 0.47, '100gsm_natural': 0.47, '80gsm_bond': 0.42, '100gsm_bond': 0.47 },
//       '50to150': { '70gsm_normal': 0.30, '70gsm_premium': 0.34, '80gsm_sunshine': 0.37, '100gsm_sunshine': 0.42, '100gsm_natural': 0.42, '80gsm_bond': 0.37, '100gsm_bond': 0.42 },
//       above150: { '70gsm_normal': 0.27, '70gsm_premium': 0.32, '80gsm_sunshine': 0.32, '100gsm_sunshine': 0.37, '100gsm_natural': 0.37, '80gsm_bond': 0.34, '100gsm_bond': 0.39 },
//     },
//   },
//   singleSidePrices: {
//     A4: {
//       below50: { '70gsm_normal': 0.70, '70gsm_premium': 0.82, '80gsm_sunshine': 0.90, '100gsm_sunshine': 1.00, '100gsm_natural': 1.00, '80gsm_bond': 1.00, '100gsm_bond': 1.10 },
//       '50to150': { '70gsm_normal': 0.60, '70gsm_premium': 0.67, '80gsm_sunshine': 0.70, '100gsm_sunshine': 0.75, '100gsm_natural': 0.75, '80gsm_bond': 0.80, '100gsm_bond': 0.95 },
//       above150: { '70gsm_normal': 0.55, '70gsm_premium': 0.62, '80gsm_sunshine': 0.67, '100gsm_sunshine': 0.63, '100gsm_natural': 0.63, '80gsm_bond': 0.67, '100gsm_bond': 0.90 },
//     },
//     B5: {
//       below50: { '70gsm_normal': 0.70, '70gsm_premium': 0.82, '80gsm_sunshine': 0.90, '100gsm_sunshine': 1.00, '100gsm_natural': 1.00, '80gsm_bond': 1.00, '100gsm_bond': 1.10 },
//       '50to150': { '70gsm_normal': 0.60, '70gsm_premium': 0.67, '80gsm_sunshine': 0.70, '100gsm_sunshine': 0.75, '100gsm_natural': 0.75, '80gsm_bond': 0.80, '100gsm_bond': 0.95 },
//       above150: { '70gsm_normal': 0.55, '70gsm_premium': 0.62, '80gsm_sunshine': 0.67, '100gsm_sunshine': 0.63, '100gsm_natural': 0.63, '80gsm_bond': 0.67, '100gsm_bond': 0.90 },
//     },
//     A5: {
//       below50: { '70gsm_normal': 0.40, '70gsm_premium': 0.42, '80gsm_sunshine': 0.53, '100gsm_sunshine': 0.58, '100gsm_natural': 0.58, '80gsm_bond': 0.58, '100gsm_bond': 0.60 },
//       '50to150': { '70gsm_normal': 0.38, '70gsm_premium': 0.40, '80gsm_sunshine': 0.48, '100gsm_sunshine': 0.52, '100gsm_natural': 0.52, '80gsm_bond': 0.52, '100gsm_bond': 0.55 },
//       above150: { '70gsm_normal': 0.35, '70gsm_premium': 0.35, '80gsm_sunshine': 0.43, '100gsm_sunshine': 0.47, '100gsm_natural': 0.47, '80gsm_bond': 0.47, '100gsm_bond': 0.52 },
//     },
//     '6x9': {
//       below50: { '70gsm_normal': 0.47, '70gsm_premium': 0.52, '80gsm_sunshine': 0.47, '100gsm_sunshine': 0.62, '100gsm_natural': 0.62, '80gsm_bond': 0.57, '100gsm_bond': 0.62 },
//       '50to150': { '70gsm_normal': 0.45, '70gsm_premium': 0.50, '80gsm_sunshine': 0.52, '100gsm_sunshine': 0.57, '100gsm_natural': 0.57, '80gsm_bond': 0.52, '100gsm_bond': 0.57 },
//       above150: { '70gsm_normal': 0.42, '70gsm_premium': 0.47, '80gsm_sunshine': 0.47, '100gsm_sunshine': 0.53, '100gsm_natural': 0.53, '80gsm_bond': 0.52, '100gsm_bond': 0.54 },
//     },
//   },
//   bindingPrices: {
//     soft_cover: 0,
//     perfect_glue: 20,
//     hardbound: 70,
//     hardbound_flipper: 95,
//     spiral: 20,
//     centre_staple: 5,
//     corner_staple: 5,
//   },
//   colorMultiplier: 6,
//   gstRate: 0.05,
// };

// // Helper functions
// export const calculatePrice = (input: any, config: PricingConfig = defaultPricingConfig) => {
//   const { pages, copies, paperSize, paperType, printColor, printSide, bindingType } = input;

//   const getQuantityTier = (copies: number): QuantityTier => {
//     if (copies < 50) return 'below50';
//     if (copies <= 150) return '50to150';
//     return 'above150';
//   };

//   const tier = getQuantityTier(copies);
//   const priceTable = printSide === 'double' ? config.doubleSidePrices : config.singleSidePrices;

//   let pricePerPage = priceTable[paperSize]?.[tier]?.[paperType] || 0.50;

//   if (printColor === 'color') {
//     pricePerPage *= config.colorMultiplier;
//   }

//   const printingCost = pricePerPage * pages * copies;
//   const bindingCost = (config.bindingPrices[bindingType] ?? 0) * copies;
//   const totalCost = printingCost + bindingCost;
//   const gst = totalCost * config.gstRate;
//   const grandTotal = totalCost + gst;

//   return {
//     pricePerPage: Math.round(pricePerPage * 100) / 100,
//     printingCost: Math.round(printingCost * 100) / 100,
//     bindingCost: Math.round(bindingCost * 100) / 100,
//     totalCost: Math.round(totalCost * 100) / 100,
//     gst: Math.round(gst * 100) / 100,
//     grandTotal: Math.round(grandTotal * 100) / 100,
//   };
// };

// export const getPriceForConfig = (
//   paperSize: PaperSize,
//   paperType: PaperType,
//   printSide: PrintSide,
//   tier: QuantityTier,
//   config: PricingConfig = defaultPricingConfig
// ): number => {
//   const priceTable = printSide === 'double' ? config.doubleSidePrices : config.singleSidePrices;
//   return priceTable[paperSize]?.[tier]?.[paperType] || 0;
// };




// lib/pricingDatas.ts
import { PricingConfig } from '@/services/pricingServices';

export type PaperSize = 'A4' | 'B5' | 'A5' | '6x9';
export type PaperType = '70gsm_normal' | '70gsm_premium' | '80gsm_sunshine' | '100gsm_natural' | '100gsm_sunshine' | '80gsm_bond' | '100gsm_bond';
export type PrintColor = 'bw' | 'color';
export type PrintSide = 'single' | 'double';
export type QuantityTier = 'below50' | '50to150' | 'above150';
export type BindingType = 'perfect_glue' | 'hardbound' | 'hardbound_flipper' | 'spiral' | 'centre_staple' | 'corner_staple' | 'soft_cover';

export interface PriceTable {
  [paperSize: string]: {
    [tier: string]: {
      [paperType: string]: number;
    };
  };
}

// Extended PricingConfig with color prices
export interface ExtendedPricingConfig extends PricingConfig {
  colorPrices?: {
    doubleSidePrices: PriceTable;
    singleSidePrices: PriceTable;
  };
}

export const allPaperSizes: PaperSize[] = ['A4', 'B5', 'A5', '6x9'];
export const allPaperTypes: PaperType[] = ['70gsm_normal', '70gsm_premium', '80gsm_sunshine', '100gsm_natural', '100gsm_sunshine', '80gsm_bond', '100gsm_bond'];
export const allBindingTypes: BindingType[] = ['soft_cover', 'perfect_glue', 'hardbound', 'hardbound_flipper', 'spiral', 'centre_staple', 'corner_staple'];
export const allQuantityTiers: QuantityTier[] = ['below50', '50to150', 'above150'];

export const paperSizeLabels: Record<PaperSize, string> = {
  A4: 'A4',
  B5: 'B5',
  A5: 'A5',
  '6x9': '6×9',
};

export const paperTypeLabels: Record<PaperType, string> = {
  '70gsm_normal': '70 GSM Normal White',
  '70gsm_premium': '70 GSM Premium White',
  '80gsm_sunshine': '80 GSM Sunshine',
  '100gsm_natural': '100 GSM Natural Shade',
  '100gsm_sunshine': '100 GSM Sunshine',
  '80gsm_bond': '80 GSM Bond',
  '100gsm_bond': '100 GSM Bond',
};

export const bindingLabels: Record<BindingType, string> = {
  soft_cover: 'Soft Cover (No Binding)',
  perfect_glue: 'Perfect Glue Binding',
  hardbound: 'Hard Bound',
  hardbound_flipper: 'Hard Bound with Flipper',
  spiral: 'Spiral Bound',
  centre_staple: 'Centre Staple',
  corner_staple: 'Corner Staple',
};

export const quantityTierLabels: Record<QuantityTier, string> = {
  below50: 'Below 50',
  '50to150': '50–150',
  above150: 'Above 150',
};

// Default B&W pricing configuration
export const defaultPricingConfig: ExtendedPricingConfig = {
  doubleSidePrices: {
    A4: {
      below50: { '70gsm_normal': 0.50, '70gsm_premium': 0.60, '80gsm_sunshine': 0.65, '100gsm_sunshine': 0.75, '100gsm_natural': 0.75, '80gsm_bond': 0.75, '100gsm_bond': 0.80 },
      '50to150': { '70gsm_normal': 0.40, '70gsm_premium': 0.45, '80gsm_sunshine': 0.45, '100gsm_sunshine': 0.55, '100gsm_natural': 0.55, '80gsm_bond': 0.55, '100gsm_bond': 0.65 },
      above150: { '70gsm_normal': 0.35, '70gsm_premium': 0.40, '80gsm_sunshine': 0.42, '100gsm_sunshine': 0.47, '100gsm_natural': 0.47, '80gsm_bond': 0.47, '100gsm_bond': 0.55 },
    },
    B5: {
      below50: { '70gsm_normal': 0.50, '70gsm_premium': 0.60, '80gsm_sunshine': 0.65, '100gsm_sunshine': 0.75, '100gsm_natural': 0.75, '80gsm_bond': 0.75, '100gsm_bond': 0.80 },
      '50to150': { '70gsm_normal': 0.40, '70gsm_premium': 0.45, '80gsm_sunshine': 0.45, '100gsm_sunshine': 0.55, '100gsm_natural': 0.55, '80gsm_bond': 0.55, '100gsm_bond': 0.65 },
      above150: { '70gsm_normal': 0.35, '70gsm_premium': 0.40, '80gsm_sunshine': 0.42, '100gsm_sunshine': 0.47, '100gsm_natural': 0.47, '80gsm_bond': 0.47, '100gsm_bond': 0.55 },
    },
    A5: {
      below50: { '70gsm_normal': 0.30, '70gsm_premium': 0.35, '80gsm_sunshine': 0.40, '100gsm_sunshine': 0.45, '100gsm_natural': 0.45, '80gsm_bond': 0.40, '100gsm_bond': 0.45 },
      '50to150': { '70gsm_normal': 0.28, '70gsm_premium': 0.32, '80gsm_sunshine': 0.35, '100gsm_sunshine': 0.40, '100gsm_natural': 0.42, '80gsm_bond': 0.35, '100gsm_bond': 0.42 },
      above150: { '70gsm_normal': 0.25, '70gsm_premium': 0.30, '80gsm_sunshine': 0.32, '100gsm_sunshine': 0.37, '100gsm_natural': 0.37, '80gsm_bond': 0.32, '100gsm_bond': 0.37 },
    },
    '6x9': {
      below50: { '70gsm_normal': 0.32, '70gsm_premium': 0.37, '80gsm_sunshine': 0.42, '100gsm_sunshine': 0.47, '100gsm_natural': 0.47, '80gsm_bond': 0.42, '100gsm_bond': 0.47 },
      '50to150': { '70gsm_normal': 0.30, '70gsm_premium': 0.34, '80gsm_sunshine': 0.37, '100gsm_sunshine': 0.42, '100gsm_natural': 0.42, '80gsm_bond': 0.37, '100gsm_bond': 0.42 },
      above150: { '70gsm_normal': 0.27, '70gsm_premium': 0.32, '80gsm_sunshine': 0.32, '100gsm_sunshine': 0.37, '100gsm_natural': 0.37, '80gsm_bond': 0.34, '100gsm_bond': 0.39 },
    },
  },
  singleSidePrices: {
    A4: {
      below50: { '70gsm_normal': 0.70, '70gsm_premium': 0.82, '80gsm_sunshine': 0.90, '100gsm_sunshine': 1.00, '100gsm_natural': 1.00, '80gsm_bond': 1.00, '100gsm_bond': 1.10 },
      '50to150': { '70gsm_normal': 0.60, '70gsm_premium': 0.67, '80gsm_sunshine': 0.70, '100gsm_sunshine': 0.75, '100gsm_natural': 0.75, '80gsm_bond': 0.80, '100gsm_bond': 0.95 },
      above150: { '70gsm_normal': 0.55, '70gsm_premium': 0.62, '80gsm_sunshine': 0.67, '100gsm_sunshine': 0.63, '100gsm_natural': 0.63, '80gsm_bond': 0.67, '100gsm_bond': 0.90 },
    },
    B5: {
      below50: { '70gsm_normal': 0.70, '70gsm_premium': 0.82, '80gsm_sunshine': 0.90, '100gsm_sunshine': 1.00, '100gsm_natural': 1.00, '80gsm_bond': 1.00, '100gsm_bond': 1.10 },
      '50to150': { '70gsm_normal': 0.60, '70gsm_premium': 0.67, '80gsm_sunshine': 0.70, '100gsm_sunshine': 0.75, '100gsm_natural': 0.75, '80gsm_bond': 0.80, '100gsm_bond': 0.95 },
      above150: { '70gsm_normal': 0.55, '70gsm_premium': 0.62, '80gsm_sunshine': 0.67, '100gsm_sunshine': 0.63, '100gsm_natural': 0.63, '80gsm_bond': 0.67, '100gsm_bond': 0.90 },
    },
    A5: {
      below50: { '70gsm_normal': 0.40, '70gsm_premium': 0.42, '80gsm_sunshine': 0.53, '100gsm_sunshine': 0.58, '100gsm_natural': 0.58, '80gsm_bond': 0.58, '100gsm_bond': 0.60 },
      '50to150': { '70gsm_normal': 0.38, '70gsm_premium': 0.40, '80gsm_sunshine': 0.48, '100gsm_sunshine': 0.52, '100gsm_natural': 0.52, '80gsm_bond': 0.52, '100gsm_bond': 0.55 },
      above150: { '70gsm_normal': 0.35, '70gsm_premium': 0.35, '80gsm_sunshine': 0.43, '100gsm_sunshine': 0.47, '100gsm_natural': 0.47, '80gsm_bond': 0.47, '100gsm_bond': 0.52 },
    },
    '6x9': {
      below50: { '70gsm_normal': 0.47, '70gsm_premium': 0.52, '80gsm_sunshine': 0.47, '100gsm_sunshine': 0.62, '100gsm_natural': 0.62, '80gsm_bond': 0.57, '100gsm_bond': 0.62 },
      '50to150': { '70gsm_normal': 0.45, '70gsm_premium': 0.50, '80gsm_sunshine': 0.52, '100gsm_sunshine': 0.57, '100gsm_natural': 0.57, '80gsm_bond': 0.52, '100gsm_bond': 0.57 },
      above150: { '70gsm_normal': 0.42, '70gsm_premium': 0.47, '80gsm_sunshine': 0.47, '100gsm_sunshine': 0.53, '100gsm_natural': 0.53, '80gsm_bond': 0.52, '100gsm_bond': 0.54 },
    },
  },
  // Default color prices (initially same as B&W, but can be edited separately)
  colorPrices: {
    doubleSidePrices: {
      A4: {
        below50: { '70gsm_normal': 3.00, '70gsm_premium': 3.60, '80gsm_sunshine': 3.90, '100gsm_sunshine': 4.50, '100gsm_natural': 4.50, '80gsm_bond': 4.50, '100gsm_bond': 4.80 },
        '50to150': { '70gsm_normal': 2.40, '70gsm_premium': 2.70, '80gsm_sunshine': 2.70, '100gsm_sunshine': 3.30, '100gsm_natural': 3.30, '80gsm_bond': 3.30, '100gsm_bond': 3.90 },
        above150: { '70gsm_normal': 2.10, '70gsm_premium': 2.40, '80gsm_sunshine': 2.52, '100gsm_sunshine': 2.82, '100gsm_natural': 2.82, '80gsm_bond': 2.82, '100gsm_bond': 3.30 },
      },
      B5: {
        below50: { '70gsm_normal': 3.00, '70gsm_premium': 3.60, '80gsm_sunshine': 3.90, '100gsm_sunshine': 4.50, '100gsm_natural': 4.50, '80gsm_bond': 4.50, '100gsm_bond': 4.80 },
        '50to150': { '70gsm_normal': 2.40, '70gsm_premium': 2.70, '80gsm_sunshine': 2.70, '100gsm_sunshine': 3.30, '100gsm_natural': 3.30, '80gsm_bond': 3.30, '100gsm_bond': 3.90 },
        above150: { '70gsm_normal': 2.10, '70gsm_premium': 2.40, '80gsm_sunshine': 2.52, '100gsm_sunshine': 2.82, '100gsm_natural': 2.82, '80gsm_bond': 2.82, '100gsm_bond': 3.30 },
      },
      A5: {
        below50: { '70gsm_normal': 1.80, '70gsm_premium': 2.10, '80gsm_sunshine': 2.40, '100gsm_sunshine': 2.70, '100gsm_natural': 2.70, '80gsm_bond': 2.40, '100gsm_bond': 2.70 },
        '50to150': { '70gsm_normal': 1.68, '70gsm_premium': 1.92, '80gsm_sunshine': 2.10, '100gsm_sunshine': 2.40, '100gsm_natural': 2.52, '80gsm_bond': 2.10, '100gsm_bond': 2.52 },
        above150: { '70gsm_normal': 1.50, '70gsm_premium': 1.80, '80gsm_sunshine': 1.92, '100gsm_sunshine': 2.22, '100gsm_natural': 2.22, '80gsm_bond': 1.92, '100gsm_bond': 2.22 },
      },
      '6x9': {
        below50: { '70gsm_normal': 1.92, '70gsm_premium': 2.22, '80gsm_sunshine': 2.52, '100gsm_sunshine': 2.82, '100gsm_natural': 2.82, '80gsm_bond': 2.52, '100gsm_bond': 2.82 },
        '50to150': { '70gsm_normal': 1.80, '70gsm_premium': 2.04, '80gsm_sunshine': 2.22, '100gsm_sunshine': 2.52, '100gsm_natural': 2.52, '80gsm_bond': 2.22, '100gsm_bond': 2.52 },
        above150: { '70gsm_normal': 1.62, '70gsm_premium': 1.92, '80gsm_sunshine': 1.92, '100gsm_sunshine': 2.22, '100gsm_natural': 2.22, '80gsm_bond': 2.04, '100gsm_bond': 2.34 },
      },
    },
    singleSidePrices: {
      A4: {
        below50: { '70gsm_normal': 4.20, '70gsm_premium': 4.92, '80gsm_sunshine': 5.40, '100gsm_sunshine': 6.00, '100gsm_natural': 6.00, '80gsm_bond': 6.00, '100gsm_bond': 6.60 },
        '50to150': { '70gsm_normal': 3.60, '70gsm_premium': 4.02, '80gsm_sunshine': 4.20, '100gsm_sunshine': 4.50, '100gsm_natural': 4.50, '80gsm_bond': 4.80, '100gsm_bond': 5.70 },
        above150: { '70gsm_normal': 3.30, '70gsm_premium': 3.72, '80gsm_sunshine': 4.02, '100gsm_sunshine': 3.78, '100gsm_natural': 3.78, '80gsm_bond': 4.02, '100gsm_bond': 5.40 },
      },
      B5: {
        below50: { '70gsm_normal': 4.20, '70gsm_premium': 4.92, '80gsm_sunshine': 5.40, '100gsm_sunshine': 6.00, '100gsm_natural': 6.00, '80gsm_bond': 6.00, '100gsm_bond': 6.60 },
        '50to150': { '70gsm_normal': 3.60, '70gsm_premium': 4.02, '80gsm_sunshine': 4.20, '100gsm_sunshine': 4.50, '100gsm_natural': 4.50, '80gsm_bond': 4.80, '100gsm_bond': 5.70 },
        above150: { '70gsm_normal': 3.30, '70gsm_premium': 3.72, '80gsm_sunshine': 4.02, '100gsm_sunshine': 3.78, '100gsm_natural': 3.78, '80gsm_bond': 4.02, '100gsm_bond': 5.40 },
      },
      A5: {
        below50: { '70gsm_normal': 2.40, '70gsm_premium': 2.52, '80gsm_sunshine': 3.18, '100gsm_sunshine': 3.48, '100gsm_natural': 3.48, '80gsm_bond': 3.48, '100gsm_bond': 3.60 },
        '50to150': { '70gsm_normal': 2.28, '70gsm_premium': 2.40, '80gsm_sunshine': 2.88, '100gsm_sunshine': 3.12, '100gsm_natural': 3.12, '80gsm_bond': 3.12, '100gsm_bond': 3.30 },
        above150: { '70gsm_normal': 2.10, '70gsm_premium': 2.10, '80gsm_sunshine': 2.58, '100gsm_sunshine': 2.82, '100gsm_natural': 2.82, '80gsm_bond': 2.82, '100gsm_bond': 3.12 },
      },
      '6x9': {
        below50: { '70gsm_normal': 2.82, '70gsm_premium': 3.12, '80gsm_sunshine': 2.82, '100gsm_sunshine': 3.72, '100gsm_natural': 3.72, '80gsm_bond': 3.42, '100gsm_bond': 3.72 },
        '50to150': { '70gsm_normal': 2.70, '70gsm_premium': 3.00, '80gsm_sunshine': 3.12, '100gsm_sunshine': 3.42, '100gsm_natural': 3.42, '80gsm_bond': 3.12, '100gsm_bond': 3.42 },
        above150: { '70gsm_normal': 2.52, '70gsm_premium': 2.82, '80gsm_sunshine': 2.82, '100gsm_sunshine': 3.18, '100gsm_natural': 3.18, '80gsm_bond': 3.12, '100gsm_bond': 3.24 },
      },
    },
  },
  bindingPrices: {
    soft_cover: 0,
    perfect_glue: 20,
    hardbound: 70,
    hardbound_flipper: 95,
    spiral: 20,
    centre_staple: 5,
    corner_staple: 5,
  },
  colorMultiplier: 6,
  gstRate: 0.05,
};

// Helper function to get quantity tier
const getQuantityTier = (copies: number): QuantityTier => {
  if (copies < 50) return 'below50';
  if (copies <= 150) return '50to150';
  return 'above150';
};

// ✅ UPDATED: Calculate price with separate B&W and Color prices
export const calculatePrice = (input: any, config: ExtendedPricingConfig = defaultPricingConfig) => {
  const { pages, copies, paperSize, paperType, printColor, printSide, bindingType } = input;

  const tier = getQuantityTier(copies);
  const priceTable = printSide === 'double' ? config.doubleSidePrices : config.singleSidePrices;

  let pricePerPage: number;

  if (printColor === 'color') {
    // Use color prices if available, otherwise fallback to B&W × multiplier
    const colorPriceTable = config.colorPrices;
    if (colorPriceTable) {
      const colorPrices = printSide === 'double' ? colorPriceTable.doubleSidePrices : colorPriceTable.singleSidePrices;
      pricePerPage = colorPrices[paperSize]?.[tier]?.[paperType] || 
                     priceTable[paperSize]?.[tier]?.[paperType] * config.colorMultiplier;
    } else {
      pricePerPage = priceTable[paperSize]?.[tier]?.[paperType] * config.colorMultiplier;
    }
  } else {
    // B&W price
    pricePerPage = priceTable[paperSize]?.[tier]?.[paperType] || 0.50;
  }

  const printingCost = pricePerPage * pages * copies;
  const bindingCost = (config.bindingPrices[bindingType] ?? 0) * copies;
  const totalCost = printingCost + bindingCost;
  const gst = totalCost * config.gstRate;
  const grandTotal = totalCost + gst;

  return {
    pricePerPage: Math.round(pricePerPage * 100) / 100,
    printingCost: Math.round(printingCost * 100) / 100,
    bindingCost: Math.round(bindingCost * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    gst: Math.round(gst * 100) / 100,
    grandTotal: Math.round(grandTotal * 100) / 100,
  };
};

// ✅ UPDATED: Get price for config (B&W only by default)
export const getPriceForConfig = (
  paperSize: PaperSize,
  paperType: PaperType,
  printSide: PrintSide,
  tier: QuantityTier,
  config: ExtendedPricingConfig = defaultPricingConfig
): number => {
  const priceTable = printSide === 'double' ? config.doubleSidePrices : config.singleSidePrices;
  return priceTable[paperSize]?.[tier]?.[paperType] || 0;
};

// ✅ NEW: Get color price for config
export const getColorPriceForConfig = (
  paperSize: PaperSize,
  paperType: PaperType,
  printSide: PrintSide,
  tier: QuantityTier,
  config: ExtendedPricingConfig = defaultPricingConfig
): number => {
  const colorPriceTable = config.colorPrices;
  if (colorPriceTable) {
    const colorPrices = printSide === 'double' ? colorPriceTable.doubleSidePrices : colorPriceTable.singleSidePrices;
    return colorPrices[paperSize]?.[tier]?.[paperType] || 
           getPriceForConfig(paperSize, paperType, printSide, tier, config) * config.colorMultiplier;
  }
  return getPriceForConfig(paperSize, paperType, printSide, tier, config) * config.colorMultiplier;
};