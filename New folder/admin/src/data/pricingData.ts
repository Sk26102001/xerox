export type PaperSize = 'A4' | 'B5' | 'A5' | '6x9';
export type PaperType = '70gsm_normal' | '70gsm_premium' | '80gsm_sunshine' | '100gsm_natural' | '100gsm_sunshine' | '80gsm_bond' | '100gsm_bond';
export type PrintColor = 'bw' | 'color';
export type PrintSide = 'single' | 'double';
export type QuantityTier = 'below50' | '50to150' | 'above150';
export type BindingType = 'perfect_glue' | 'hardbound' | 'hardbound_flipper' | 'spiral' | 'centre_staple' | 'corner_staple' | 'soft_cover';

export type PriceTable = Record<PaperSize, Record<QuantityTier, Record<PaperType, number>>>;

export interface PricingConfig {
  doubleSidePrices: PriceTable;
  singleSidePrices: PriceTable;
  bindingPrices: Record<BindingType, number>;
  colorMultiplier: number;
  gstRate: number;
}

export const defaultDoubleSidePrices: PriceTable = {
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
};

export const defaultSingleSidePrices: PriceTable = {
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
};

export const defaultBindingPrices: Record<BindingType, number> = {
  soft_cover: 0,
  perfect_glue: 20,
  hardbound: 70,
  hardbound_flipper: 95,
  spiral: 20,
  centre_staple: 5,
  corner_staple: 5,
};

export const defaultPricingConfig: PricingConfig = {
  doubleSidePrices: defaultDoubleSidePrices,
  singleSidePrices: defaultSingleSidePrices,
  bindingPrices: defaultBindingPrices,
  colorMultiplier: 6,
  gstRate: 0.05,
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

export const paperTypeLabels: Record<PaperType, string> = {
  '70gsm_normal': '70 GSM Normal White',
  '70gsm_premium': '70 GSM Premium White',
  '80gsm_sunshine': '80 GSM Sunshine',
  '100gsm_natural': '100 GSM Natural Shade',
  '100gsm_sunshine': '100 GSM Sunshine',
  '80gsm_bond': '80 GSM Bond',
  '100gsm_bond': '100 GSM Bond',
};

export const paperSizeLabels: Record<PaperSize, string> = {
  A4: 'A4',
  B5: 'B5',
  A5: 'A5',
  '6x9': '6×9',
};

function getQuantityTier(copies: number): QuantityTier {
  if (copies < 50) return 'below50';
  if (copies <= 150) return '50to150';
  return 'above150';
}

export interface PriceCalculationInput {
  pages: number;
  copies: number;
  paperSize: PaperSize;
  paperType: PaperType;
  printColor: PrintColor;
  printSide: PrintSide;
  bindingType: BindingType;
}

export interface PriceBreakdown {
  pricePerPage: number;
  printingCost: number;
  bindingCost: number;
  totalCost: number;
  gst: number;
  grandTotal: number;
}

export function calculatePrice(input: PriceCalculationInput, config: PricingConfig = defaultPricingConfig): PriceBreakdown {
  const { pages, copies, paperSize, paperType, printColor, printSide, bindingType } = input;

  const tier = getQuantityTier(copies);
  const priceTable = printSide === 'double' ? config.doubleSidePrices : config.singleSidePrices;

  let pricePerPage = priceTable[paperSize]?.[tier]?.[paperType] ?? 0.50;

  if (printColor === 'color') {
    pricePerPage *= config.colorMultiplier;
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
}

export function getPriceForConfig(paperSize: PaperSize, paperType: PaperType, printSide: PrintSide, tier: QuantityTier, config: PricingConfig = defaultPricingConfig): number {
  const priceTable = printSide === 'double' ? config.doubleSidePrices : config.singleSidePrices;
  return priceTable[paperSize]?.[tier]?.[paperType] ?? 0;
}

export const allPaperSizes: PaperSize[] = ['A4', 'B5', 'A5', '6x9'];
export const allPaperTypes: PaperType[] = ['70gsm_normal', '70gsm_premium', '80gsm_sunshine', '100gsm_natural', '100gsm_sunshine', '80gsm_bond', '100gsm_bond'];
export const allBindingTypes: BindingType[] = ['soft_cover', 'perfect_glue', 'hardbound', 'hardbound_flipper', 'spiral', 'centre_staple', 'corner_staple'];
export const allQuantityTiers: QuantityTier[] = ['below50', '50to150', 'above150'];
export const quantityTierLabels: Record<QuantityTier, string> = { below50: 'Below 50', '50to150': '50–150', above150: 'Above 150' };

// Re-export for backward compat
export const GST_RATE = 0.05;
export const bindingPrices = defaultBindingPrices;
