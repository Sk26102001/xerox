// src/data/pricingData.js

// Paper size types
export const allPaperSizes = ['A4', 'B5', 'A5', '6x9'];

// Paper type labels
export const paperTypeLabels = {
  '70gsm_normal': '70 GSM Normal White',
  '70gsm_premium': '70 GSM Premium White',
  '80gsm_sunshine': '80 GSM Sunshine',
  '100gsm_natural': '100 GSM Natural Shade',
  '100gsm_sunshine': '100 GSM Sunshine',
  '80gsm_bond': '80 GSM Bond',
  '100gsm_bond': '100 GSM Bond'
};

// Quantity tiers
export const allQuantityTiers = ['below50', '50to150', 'above150'];

export const quantityTierLabels = {
  below50: 'Below 50',
  '50to150': '50–150',
  above150: 'Above 150'
};

// Default Double Side Prices
export const defaultDoubleSidePrices = {
  A4: {
    below50: {
      '70gsm_normal': 0.50,
      '70gsm_premium': 0.60,
      '80gsm_sunshine': 0.65,
      '100gsm_sunshine': 0.75,
      '100gsm_natural': 0.75,
      '80gsm_bond': 0.75,
      '100gsm_bond': 0.80
    },
    '50to150': {
      '70gsm_normal': 0.40,
      '70gsm_premium': 0.45,
      '80gsm_sunshine': 0.45,
      '100gsm_sunshine': 0.55,
      '100gsm_natural': 0.55,
      '80gsm_bond': 0.55,
      '100gsm_bond': 0.65
    },
    above150: {
      '70gsm_normal': 0.35,
      '70gsm_premium': 0.40,
      '80gsm_sunshine': 0.42,
      '100gsm_sunshine': 0.47,
      '100gsm_natural': 0.47,
      '80gsm_bond': 0.47,
      '100gsm_bond': 0.55
    }
  },
  B5: {
    below50: {
      '70gsm_normal': 0.50,
      '70gsm_premium': 0.60,
      '80gsm_sunshine': 0.65,
      '100gsm_sunshine': 0.75,
      '100gsm_natural': 0.75,
      '80gsm_bond': 0.75,
      '100gsm_bond': 0.80
    },
    '50to150': {
      '70gsm_normal': 0.40,
      '70gsm_premium': 0.45,
      '80gsm_sunshine': 0.45,
      '100gsm_sunshine': 0.55,
      '100gsm_natural': 0.55,
      '80gsm_bond': 0.55,
      '100gsm_bond': 0.65
    },
    above150: {
      '70gsm_normal': 0.35,
      '70gsm_premium': 0.40,
      '80gsm_sunshine': 0.42,
      '100gsm_sunshine': 0.47,
      '100gsm_natural': 0.47,
      '80gsm_bond': 0.47,
      '100gsm_bond': 0.55
    }
  },
  A5: {
    below50: {
      '70gsm_normal': 0.30,
      '70gsm_premium': 0.35,
      '80gsm_sunshine': 0.40,
      '100gsm_sunshine': 0.45,
      '100gsm_natural': 0.45,
      '80gsm_bond': 0.40,
      '100gsm_bond': 0.45
    },
    '50to150': {
      '70gsm_normal': 0.28,
      '70gsm_premium': 0.32,
      '80gsm_sunshine': 0.35,
      '100gsm_sunshine': 0.40,
      '100gsm_natural': 0.42,
      '80gsm_bond': 0.35,
      '100gsm_bond': 0.42
    },
    above150: {
      '70gsm_normal': 0.25,
      '70gsm_premium': 0.30,
      '80gsm_sunshine': 0.32,
      '100gsm_sunshine': 0.37,
      '100gsm_natural': 0.37,
      '80gsm_bond': 0.32,
      '100gsm_bond': 0.37
    }
  },
  '6x9': {
    below50: {
      '70gsm_normal': 0.32,
      '70gsm_premium': 0.37,
      '80gsm_sunshine': 0.42,
      '100gsm_sunshine': 0.47,
      '100gsm_natural': 0.47,
      '80gsm_bond': 0.42,
      '100gsm_bond': 0.47
    },
    '50to150': {
      '70gsm_normal': 0.30,
      '70gsm_premium': 0.34,
      '80gsm_sunshine': 0.37,
      '100gsm_sunshine': 0.42,
      '100gsm_natural': 0.42,
      '80gsm_bond': 0.37,
      '100gsm_bond': 0.42
    },
    above150: {
      '70gsm_normal': 0.27,
      '70gsm_premium': 0.32,
      '80gsm_sunshine': 0.32,
      '100gsm_sunshine': 0.37,
      '100gsm_natural': 0.37,
      '80gsm_bond': 0.34,
      '100gsm_bond': 0.39
    }
  }
};

// Default Single Side Prices
export const defaultSingleSidePrices = {
  A4: {
    below50: {
      '70gsm_normal': 0.70,
      '70gsm_premium': 0.82,
      '80gsm_sunshine': 0.90,
      '100gsm_sunshine': 1.00,
      '100gsm_natural': 1.00,
      '80gsm_bond': 1.00,
      '100gsm_bond': 1.10
    },
    '50to150': {
      '70gsm_normal': 0.60,
      '70gsm_premium': 0.67,
      '80gsm_sunshine': 0.70,
      '100gsm_sunshine': 0.75,
      '100gsm_natural': 0.75,
      '80gsm_bond': 0.80,
      '100gsm_bond': 0.95
    },
    above150: {
      '70gsm_normal': 0.55,
      '70gsm_premium': 0.62,
      '80gsm_sunshine': 0.67,
      '100gsm_sunshine': 0.63,
      '100gsm_natural': 0.63,
      '80gsm_bond': 0.67,
      '100gsm_bond': 0.90
    }
  },
  B5: {
    below50: {
      '70gsm_normal': 0.70,
      '70gsm_premium': 0.82,
      '80gsm_sunshine': 0.90,
      '100gsm_sunshine': 1.00,
      '100gsm_natural': 1.00,
      '80gsm_bond': 1.00,
      '100gsm_bond': 1.10
    },
    '50to150': {
      '70gsm_normal': 0.60,
      '70gsm_premium': 0.67,
      '80gsm_sunshine': 0.70,
      '100gsm_sunshine': 0.75,
      '100gsm_natural': 0.75,
      '80gsm_bond': 0.80,
      '100gsm_bond': 0.95
    },
    above150: {
      '70gsm_normal': 0.55,
      '70gsm_premium': 0.62,
      '80gsm_sunshine': 0.67,
      '100gsm_sunshine': 0.63,
      '100gsm_natural': 0.63,
      '80gsm_bond': 0.67,
      '100gsm_bond': 0.90
    }
  },
  A5: {
    below50: {
      '70gsm_normal': 0.40,
      '70gsm_premium': 0.42,
      '80gsm_sunshine': 0.53,
      '100gsm_sunshine': 0.58,
      '100gsm_natural': 0.58,
      '80gsm_bond': 0.58,
      '100gsm_bond': 0.60
    },
    '50to150': {
      '70gsm_normal': 0.38,
      '70gsm_premium': 0.40,
      '80gsm_sunshine': 0.48,
      '100gsm_sunshine': 0.52,
      '100gsm_natural': 0.52,
      '80gsm_bond': 0.52,
      '100gsm_bond': 0.55
    },
    above150: {
      '70gsm_normal': 0.35,
      '70gsm_premium': 0.35,
      '80gsm_sunshine': 0.43,
      '100gsm_sunshine': 0.47,
      '100gsm_natural': 0.47,
      '80gsm_bond': 0.47,
      '100gsm_bond': 0.52
    }
  },
  '6x9': {
    below50: {
      '70gsm_normal': 0.47,
      '70gsm_premium': 0.52,
      '80gsm_sunshine': 0.47,
      '100gsm_sunshine': 0.62,
      '100gsm_natural': 0.62,
      '80gsm_bond': 0.57,
      '100gsm_bond': 0.62
    },
    '50to150': {
      '70gsm_normal': 0.45,
      '70gsm_premium': 0.50,
      '80gsm_sunshine': 0.52,
      '100gsm_sunshine': 0.57,
      '100gsm_natural': 0.57,
      '80gsm_bond': 0.52,
      '100gsm_bond': 0.57
    },
    above150: {
      '70gsm_normal': 0.42,
      '70gsm_premium': 0.47,
      '80gsm_sunshine': 0.47,
      '100gsm_sunshine': 0.53,
      '100gsm_natural': 0.53,
      '80gsm_bond': 0.52,
      '100gsm_bond': 0.54
    }
  }
};

// Default binding prices
export const defaultBindingPrices = {
  soft_cover: 0,
  perfect_glue: 20,
  hardbound: 70,
  hardbound_flipper: 95,
  spiral: 20,
  centre_staple: 5,
  corner_staple: 5
};

// Default pricing configuration
export const defaultPricingConfig = {
  doubleSidePrices: defaultDoubleSidePrices,
  singleSidePrices: defaultSingleSidePrices,
  bindingPrices: defaultBindingPrices,
  colorMultiplier: 6,
  gstRate: 0.05
};

// Helper function to get quantity tier
export const getQuantityTier = (copies) => {
  if (copies < 50) return 'below50';
  if (copies <= 150) return '50to150';
  return 'above150';
};

// Helper function to calculate price
export const calculatePrice = (input, config = defaultPricingConfig) => {
  const { pages, copies, paperSize, paperType, printColor, printSide, bindingType } = input;

  const tier = getQuantityTier(copies);
  const priceTable = printSide === 'double' ? config.doubleSidePrices : config.singleSidePrices;

  let pricePerPage = priceTable[paperSize]?.[tier]?.[paperType] || 0.50;

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
    grandTotal: Math.round(grandTotal * 100) / 100
  };
};

// Helper function to get price for a specific config
export const getPriceForConfig = (paperSize, paperType, printSide, tier, config = defaultPricingConfig) => {
  const priceTable = printSide === 'double' ? config.doubleSidePrices : config.singleSidePrices;
  return priceTable[paperSize]?.[tier]?.[paperType] || 0;
};