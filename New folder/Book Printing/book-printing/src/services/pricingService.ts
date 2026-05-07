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

// client/src/services/pricingService.ts
import {API} from '@/api/api'; // Change this line
import { defaultPricingConfig } from '@/lib/pricingData';

export interface PricingConfig {
  doubleSidePrices: any;
  singleSidePrices: any;
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

export const fetchPricing = async (forceRefresh = false): Promise<PricingConfig> => {
  try {
    const url = forceRefresh ? `/pricing?_=${Date.now()}` : '/pricing';
    console.log('Fetching pricing from:', url);
    
    const response = await API.get(url); // Use API instead of axiosInstance
    console.log('Pricing API response:', response.data);
    
    if (response.data && response.data.success) {
      console.log('Perfect Glue Binding Price from API:', response.data.data.bindingPrices?.perfect_glue);
      cachedPricing = response.data.data;
      return cachedPricing;
    }
    throw new Error('Failed to fetch pricing');
  } catch (error) {
    console.error('Error fetching pricing:', error);
    console.log('Using default pricing as fallback');
    return defaultPricingConfig;
  }
};

export const getCachedPricing = (): PricingConfig | null => {
  console.log('Getting cached pricing, perfect_glue:', cachedPricing?.bindingPrices?.perfect_glue);
  return cachedPricing;
};

export const updatePricing = async (pricingData: PricingConfig): Promise<PricingConfig> => {
  try {
    console.log('Updating pricing with data:', {
      perfect_glue: pricingData.bindingPrices?.perfect_glue,
      all_binding_prices: pricingData.bindingPrices
    });
    
    const response = await API.put('/pricing', pricingData); // Use API instead of axiosInstance
    console.log('Update response:', response.data);
    
    if (response.data && response.data.success) {
      console.log('Update successful, new perfect_glue price:', response.data.data.bindingPrices?.perfect_glue);
      cachedPricing = response.data.data;
      return cachedPricing;
    }
    throw new Error('Failed to update pricing');
  } catch (error) {
    console.error('Error updating pricing:', error);
    throw error;
  }
};

export const clearPricingCache = () => {
  console.log('Clearing pricing cache');
  cachedPricing = null;
};