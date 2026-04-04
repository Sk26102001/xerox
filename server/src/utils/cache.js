// utils/cache.js
const rateCache = new Map();

export const getCachedRate = async (key, fetchFunction, ttl = 3600000) => {
  const cached = rateCache.get(key);
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }
  
  const data = await fetchFunction();
  rateCache.set(key, { data, timestamp: Date.now() });
  return data;
};

// Use in calculateRate
export const calculateRate = async (payload) => {
  const cacheKey = `${payload.source_Pincode}-${payload.destination_Pincode}-${payload.shipment_Weight}`;
  
  return getCachedRate(cacheKey, async () => {
    const response = await axios.post(`${BASE_URL}/api/ratecalculator`, payload, { headers: HEADERS });
    return response.data;
  }, 3600000); // Cache for 1 hour
};