// services/trackingService.ts
import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/shipping';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://bookprinters.in/api/api/shipping'; 

export interface TrackingData {
  orderId: string;
  apiorderid: number;
  waybill: string;
  status: string;
  courierName: string;
  shippingCharge: number;
  expectedDelivery: string;
  trackingHistory: Array<{
    date: string;
    status: string;
    location: string;
    remark: string;
  }>;
  currentLocation: string;
  lastUpdated: string;
}

export const trackingService = {
  // Track by order number (your format like ORD/0051/28-03-2026)
  trackByOrderNumber: async (orderNumber: string): Promise<any> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/track-by-order`, {
        orderNumber
      });
      return response.data;
    } catch (error: any) {
      console.error('Track by order error:', error);
      throw error.response?.data || error;
    }
  },

  // Track by waybill
  trackByWaybill: async (waybill: string): Promise<any> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/shipment-status`, {
        waybill
      });
      return response.data;
    } catch (error: any) {
      console.error('Track by waybill error:', error);
      throw error.response?.data || error;
    }
  },

  // Get tracking history
  getTrackingHistory: async (waybill: string): Promise<any> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tracking-history`, {
        waybill
      });
      return response.data;
    } catch (error: any) {
      console.error('Get tracking history error:', error);
      throw error.response?.data || error;
    }
  }
};