// utils/retry.js
export const withRetry = async (fn, maxRetries = 2) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        console.log(`Retry ${i + 1}/${maxRetries}...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }
  
  throw lastError;
};

// Use in createShipment
export const createShipment = async (order, warehouseId) => {
  return withRetry(async () => {
    // ... existing code
  }, 2);
};