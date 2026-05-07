// import axios from 'axios';

// export interface PricingConfig {
//   doubleSidePrices: any;
//   singleSidePrices: any;
//   bindingPrices: {
//     soft_cover: number;
//     perfect_glue: number;
//     hardbound: number;
//     hardbound_flipper: number;
//     spiral: number;
//     centre_staple: number;
//     corner_staple: number;
//   };
//   colorMultiplier: number;
//   gstRate: number;
// }

// let cachedPricing: PricingConfig | null = null;

// export const fetchPricing = async (): Promise<PricingConfig> => {
//   try {
//     const response = await axios.get('/pricing');
//     if (response.data && response.data.success) {
//       cachedPricing = response.data.data;
//       return cachedPricing;
//     }
//     throw new Error('Failed to fetch pricing');
//   } catch (error) {
//     console.error('Error fetching pricing:', error);
//     throw error;
//   }
// };

// export const getCachedPricing = (): PricingConfig | null => {
//   return cachedPricing;
// };

// export const updatePricing = async (pricingData: PricingConfig): Promise<PricingConfig> => {
//   try {
//     const response = await axios.put('/pricing', pricingData);
//     if (response.data && response.data.success) {
//       cachedPricing = response.data.data;
//       return cachedPricing;
//     }
//     throw new Error('Failed to update pricing');
//   } catch (error) {
//     console.error('Error updating pricing:', error);
//     throw error;
//   }
// };




// // services/pricingServices.ts
// import axiosInstance from '@/api/axios';

// export interface PricingConfig {
//   doubleSidePrices: any;
//   singleSidePrices: any;
  
//   bindingPrices: {
//     soft_cover: number;
//     perfect_glue: number;
//     hardbound: number;
//     hardbound_flipper: number;
//     spiral: number;
//     centre_staple: number;
//     corner_staple: number;
//   };
//   colorMultiplier: number;
//   gstRate: number;
// }

// let cachedPricing: PricingConfig | null = null;

// export const fetchPricing = async (): Promise<PricingConfig> => {
//   try {
//     const response = await axiosInstance.get('/pricing');
//     if (response.data && response.data.success) {
//       cachedPricing = response.data.data;
//       return cachedPricing;
//     }
//     throw new Error('Failed to fetch pricing');
//   } catch (error) {
//     console.error('Error fetching pricing:', error);
//     throw error;
//   }
// };

// export const getCachedPricing = (): PricingConfig | null => {
//   return cachedPricing;
// };

// export const updatePricing = async (pricingData: PricingConfig): Promise<PricingConfig> => {
//   try {
//     const response = await axiosInstance.put('/pricing', pricingData);
//     if (response.data && response.data.success) {
//       cachedPricing = response.data.data;
//       return cachedPricing;
//     }
//     throw new Error('Failed to update pricing');
//   } catch (error) {
//     console.error('Error updating pricing:', error);
//     throw error;
//   }
// };





// services/pricingServices.ts
import axiosInstance from '@/api/axios';

export interface PriceTable {
  [paperSize: string]: {
    [tier: string]: {
      [paperType: string]: number;
    };
  };
}

export interface PricingConfig {
  doubleSidePrices: PriceTable;
  singleSidePrices: PriceTable;
  colorPrices?: {
    doubleSidePrices: PriceTable;
    singleSidePrices: PriceTable;
  };
  bindingPrices: {
    soft_cover: number;
    perfect_glue: number;
    hardbound: number;
    hardbound_flipper: number;
    spiral: number;
    centre_staple: number;
    corner_staple: number;
  };
  colorMultiplier: number;
  gstRate: number;
}

let cachedPricing: PricingConfig | null = null;

export const fetchPricing = async (): Promise<PricingConfig> => {
  try {
    const response = await axiosInstance.get('/pricing');
    if (response.data && response.data.success) {
      cachedPricing = response.data.data;
      return cachedPricing;
    }
    throw new Error('Failed to fetch pricing');
  } catch (error) {
    console.error('Error fetching pricing:', error);
    throw error;
  }
};

export const getCachedPricing = (): PricingConfig | null => {
  return cachedPricing;
};

export const updatePricing = async (pricingData: PricingConfig): Promise<PricingConfig> => {
  try {
    const response = await axiosInstance.put('/pricing', pricingData);
    if (response.data && response.data.success) {
      cachedPricing = response.data.data;
      return cachedPricing;
    }
    throw new Error('Failed to update pricing');
  } catch (error) {
    console.error('Error updating pricing:', error);
    throw error;
  }
};

// Helper function to get B&W price
export const getBWPrice = (
  config: PricingConfig,
  paperSize: string,
  paperType: string,
  printSide: string,
  copies: number
): number => {
  const getQuantityTier = (copies: number): string => {
    if (copies < 50) return 'below50';
    if (copies <= 150) return '50to150';
    return 'above150';
  };
  
  const tier = getQuantityTier(copies);
  const priceTable = printSide === 'double' ? config.doubleSidePrices : config.singleSidePrices;
  
  return priceTable[paperSize]?.[tier]?.[paperType] || 0;
};

// Helper function to get Color price
export const getColorPrice = (
  config: PricingConfig,
  paperSize: string,
  paperType: string,
  printSide: string,
  copies: number
): number => {
  const getQuantityTier = (copies: number): string => {
    if (copies < 50) return 'below50';
    if (copies <= 150) return '50to150';
    return 'above150';
  };
  
  const tier = getQuantityTier(copies);
  
  // If color prices exist, use them
  if (config.colorPrices) {
    const colorTable = printSide === 'double' ? config.colorPrices.doubleSidePrices : config.colorPrices.singleSidePrices;
    const colorPrice = colorTable[paperSize]?.[tier]?.[paperType];
    if (colorPrice !== undefined) {
      return colorPrice;
    }
  }
  
  // Fallback to B&W price × multiplier
  const bwPrice = getBWPrice(config, paperSize, paperType, printSide, copies);
  return bwPrice * config.colorMultiplier;
};

// Helper function to get binding price
export const getBindingPrice = (config: PricingConfig, bindingType: string): number => {
  return config.bindingPrices[bindingType as keyof typeof config.bindingPrices] || 0;
};

// Helper function to calculate total price
export const calculateTotalPrice = (
  config: PricingConfig,
  pages: number,
  copies: number,
  paperSize: string,
  paperType: string,
  printColor: string,
  printSide: string,
  bindingType: string
): { printingCost: number; bindingCost: number; totalCost: number; gst: number; grandTotal: number } => {
  
  let pricePerPage: number;
  
  if (printColor === 'color') {
    pricePerPage = getColorPrice(config, paperSize, paperType, printSide, copies);
  } else {
    pricePerPage = getBWPrice(config, paperSize, paperType, printSide, copies);
  }
  
  const printingCost = pricePerPage * pages * copies;
  const bindingCost = getBindingPrice(config, bindingType) * copies;
  const totalCost = printingCost + bindingCost;
  const gst = totalCost * config.gstRate;
  const grandTotal = totalCost + gst;
  
  return {
    printingCost: Math.round(printingCost * 100) / 100,
    bindingCost: Math.round(bindingCost * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    gst: Math.round(gst * 100) / 100,
    grandTotal: Math.round(grandTotal * 100) / 100,
  };
};