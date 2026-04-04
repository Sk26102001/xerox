// services/shippingService.ts
import axios, { AxiosInstance } from 'axios';

// Types defined inline
export interface Customer {
  name: string;
  phone: string;
  email: string;
  address: string;
  landmark?: string;
  addressType?: 'Home' | 'Office';
  pincode: string;
  city: string;
  state: string;
  country?: string;
}

export interface OrderItem {
  pages: number;
  copies: number;
  paperSize: string;
  paperType: string;
  printColor: 'color' | 'blackwhite';
  printSide: 'single' | 'double';
  bindingType: string;
  lamination: string;
  instructions?: string;
  files?: Array<{
    name: string;
    size: number;
    type: string;
    status: string;
    url: string;
  }>;
}

export interface Order {
  orderNumber: string;
  invoiceNumber?: string;
  paymentMode: 1 | 2;
  expressType?: 'surface' | 'air';
  weight?: number;
  totalAmount: number;
  warehousePincode?: string;
  customer: Customer;
  items?: OrderItem[];
  products?: any[];
  courierId?: number;
}

export interface Courier {
  id: number;
  name: string;
  charge: number;
  expectedDelivery?: string;
  serviceMode?: string;
}

export interface ServiceabilityResult {
  serviceable: boolean;
  pincode: string;
  message: string;
  details?: {
    source: string;
    destination: string;
    zone: string;
    pickup: string;
    delivery: string;
    cod: string;
  };
  couriers?: {
    total: number;
    list: Courier[];
    recommendations: {
      cheapest: Courier | null;
      fastest: Courier | null;
    };
  };
  suggestions?: {
    alternativePincodes: string[];
    message: string;
  };
}

export interface ShipmentResult {
  shipment: {
    apiorderid: number;
    waybill: string;
    status: boolean;
    response?: string;
    usedCourier?: Courier;
  };
  serviceability: {
    checked: boolean;
    serviceable: boolean;
    sourcePincode: string;
    destinationPincode: string;
    zone: string;
  };
  courier: {
    used: Courier;
    available: Courier[];
    excluded?: Array<{
      id: number;
      name: string;
      reason: string;
    }>;
  };
}

export interface TrackingStatus {
  status: boolean;
  error: boolean;
  response: string;
  summary: {
    waybill: string;
    orderid: string;
    fulfilledby: string;
    orderedon: string;
    lastscanned: string;
    statuscode: string;
    status: string;
    location: string;
    remark: string;
  };
}

export interface TrackingHistory {
  status: boolean;
  error: boolean;
  response: string;
  summary: {
    waybill: string;
    apiorderid: number;
    orderid: string;
    fulfilledby: string;
    statusid: number;
    status: string;
    lastscandate: string;
    orderedon: string;
  };
  trackingdata: Array<{
    DateandTime: string;
    Status: string;
    Remark: string;
    Location: string;
    shipmentJourney: number;
  }>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
}

class ShippingService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/shipping',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
  }

  async checkDeliveryAvailability(
    pincode: string,
    warehousePincode: string = '400001',
    weight: number = 0.5
  ): Promise<ApiResponse<ServiceabilityResult>> {
    try {
      const response = await this.api.post('/check-delivery', {
        pincode,
        warehousePincode,
        weight,
      });
      return response.data;
    } catch (error: any) {
      console.error('Check delivery error:', error);
      throw error.response?.data || error;
    }
  }

  async createShipment(
    order: Order,
    warehouseId: number
  ): Promise<ApiResponse<ShipmentResult>> {
    try {
      const response = await this.api.post('/create-shipment', {
        order,
        warehouseId,
      });
      return response.data;
    } catch (error: any) {
      console.error('Create shipment error:', error);
      throw error.response?.data || error;
    }
  }

  async shipOrder(
    apiorderid: number,
    courierId: number = 0
  ): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.post('/ship-order', {
        apiorderid,
        courierId,
      });
      return response.data;
    } catch (error: any) {
      console.error('Ship order error:', error);
      throw error.response?.data || error;
    }
  }

  async generateShippingLabel(waybill: string): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.post('/shipping-label', {
        waybills: waybill,
      });
      return response.data;
    } catch (error: any) {
      console.error('Generate label error:', error);
      throw error.response?.data || error;
    }
  }

  async registerPickup(waybills: string[]): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.post('/register-pickup', {
        waybills,
      });
      return response.data;
    } catch (error: any) {
      console.error('Register pickup error:', error);
      throw error.response?.data || error;
    }
  }

  async trackShipment(waybill: string): Promise<ApiResponse<TrackingStatus>> {
    try {
      const response = await this.api.post('/shipment-status', {
        waybill,
      });
      return response.data;
    } catch (error: any) {
      console.error('Track shipment error:', error);
      throw error.response?.data || error;
    }
  }

  async getTrackingHistory(waybill: string): Promise<ApiResponse<TrackingHistory>> {
    try {
      const response = await this.api.post('/tracking-history', {
        waybill,
      });
      return response.data;
    } catch (error: any) {
      console.error('Get tracking history error:', error);
      throw error.response?.data || error;
    }
  }

  async cancelShipment(waybill: string, reason: string = ''): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.post('/cancel-shipment', {
        waybill,
        reason,
      });
      return response.data;
    } catch (error: any) {
      console.error('Cancel shipment error:', error);
      throw error.response?.data || error;
    }
  }

  async calculateRate(rateData: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.api.post('/calculate-rate', rateData);
      return response.data;
    } catch (error: any) {
      console.error('Calculate rate error:', error);
      throw error.response?.data || error;
    }
  }
}

export const shippingService = new ShippingService();