// config/shippingConfig.js
export const SHIPPING_CONFIG = {
  development: {
    BASE_URL: "https://capi-qc.fship.in",
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 2
  },
  production: {
    BASE_URL: "https://capi.fship.in",
    TIMEOUT: 20000,
    RETRY_ATTEMPTS: 1
  }
};

// Use in fshipService.js
const env = process.env.NODE_ENV || 'development';
const config = SHIPPING_CONFIG[env];
const BASE_URL = config.BASE_URL;