




// import axios from "axios";

// const BASE_URL = "https://capi-qc.fship.in";

// // Create Warehouse (unchanged)
// export const createWarehouse = async ({ warehouseName, address, city, pincode, email, contactName, phoneNumber }) => {
//   const response = await axios.post(
//     `${BASE_URL}/api/addwarehouse`,
//     {
//       WarehouseName: warehouseName,
//       AddressLine1: address,
//       City: city,
//       Pincode: pincode,
//       Email: email,
//       ContactName: contactName,
//       PhoneNumber: phoneNumber
//     },
//     {
//       headers: { signature: process.env.FSHIP_API_KEY, "Content-Type": "application/json" }
//     }
//   );
//   return response.data;
// };

// // Create Shipment (updated for /createforwardorder)
// export const createShipment = async (order, warehouseId) => {
//   const response = await axios.post(
//     `${BASE_URL}/api/createforwardorder`,
//     {
//       customer_Name: order.customer?.name || "Customer",
//       customer_Mobile: order.customer?.phone || "9999999999",
//       customer_Emailid: order.customer?.email || "customer@example.com",
//       customer_Address: order.customer?.address || "Default Address",
//       landMark: order.customer?.landmark || "",
//       customer_Address_Type: order.customer?.addressType || "Home",
//       customer_PinCode: order.customer?.pincode || "000000",
//       customer_City: order.customer?.city || "Default City",
//       orderId: order.orderNumber,
//       invoice_Number: order.invoiceNumber || "INV001",
//       payment_Mode: order.paymentMode || 2, // 1=COD, 2=PREPAID
//       express_Type: order.expressType || "surface",
//       is_Ndd: order.isNdd || 0,
//       order_Amount: order.amount || 0,
//       tax_Amount: order.tax || 0,
//       extra_Charges: order.extraCharges || 0,
//       total_Amount: order.totalAmount || 0,
//       cod_Amount: order.codAmount || 0,
//       shipment_Weight: order.weight || 1,
//       shipment_Length: order.length || 10,
//       shipment_Width: order.width || 10,
//       shipment_Height: order.height || 10,
//       volumetric_Weight: order.volumetricWeight || 0,
//       pick_Address_ID: warehouseId,
//       return_Address_ID: warehouseId, // using same as pickup by default
//       products: order.products?.map(p => ({
//         productId: p.productId || "PRINT001",
//         productName: p.productName || "Print Order",
//         unitPrice: p.unitPrice || 0,
//         quantity: p.quantity || 1,
//         productCategory: p.productCategory || "Printing",
//         hsnCode: p.hsnCode || "1234",
//         sku: p.sku || "PRINT001",
//         taxRate: p.taxRate || 0,
//         productDiscount: p.productDiscount || 0
//       })) || [
//         {
//           productId: "PRINT001",
//           productName: "Print Order",
//           unitPrice: order.totalAmount || 0,
//           quantity: 1,
//           productCategory: "Printing",
//           hsnCode: "1234",
//           sku: "PRINT001",
//           taxRate: 0,
//           productDiscount: 0
//         }
//       ],
//       courierId: order.courierId || 0
//     },
//     {
//       headers: { signature: process.env.FSHIP_API_KEY, "Content-Type": "application/json" }
//     }
//   );
//   return response.data;
// };





// // services/fshipService.js
// import axios from "axios";

// const BASE_URL = "https://capi-qc.fship.in";
// const HEADERS = {
//   signature: process.env.FSHIP_API_KEY,
//   "Content-Type": "application/json"
// };

// // ---------------------- WAREHOUSE ----------------------
// export const createWarehouse = async ({ warehouseName, address, city, pincode, email, contactName, phoneNumber }) => {
//   try {
//     const response = await axios.post(
//       `${BASE_URL}/api/addwarehouse`,
//       {
//         WarehouseName: warehouseName,
//         AddressLine1: address,
//         City: city,
//         Pincode: pincode,
//         Email: email,
//         ContactName: contactName,
//         PhoneNumber: phoneNumber
//       },
//       { headers: HEADERS }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Warehouse creation error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // ---------------------- SHIPMENT ----------------------
// export const createShipment = async (order, warehouseId) => {
//   const response = await axios.post(
//     `${BASE_URL}/api/createforwardorder`,
//     {
//       customer_Name: order.customer?.name || "Customer",
//       customer_Mobile: order.customer?.phone || "9999999999",
//       customer_Emailid: order.customer?.email || "customer@example.com",
//       customer_Address: order.customer?.address || "Default Address",
//       landMark: order.customer?.landmark || "",
//       customer_Address_Type: order.customer?.addressType || "Home",
//       customer_PinCode: order.customer?.pincode || "000000",
//       customer_City: order.customer?.city || "Default City",
//       orderId: order.orderNumber,
//       invoice_Number: order.invoiceNumber || "INV001",
//       payment_Mode: order.paymentMode || 2, // 1=COD, 2=PREPAID
//       express_Type: order.expressType || "surface",
//       is_Ndd: order.isNdd || 0,
//       order_Amount: order.amount || 0,
//       tax_Amount: order.tax || 0,
//       extra_Charges: order.extraCharges || 0,
//       total_Amount: order.totalAmount || 0,
//       cod_Amount: order.codAmount || 0,
//       shipment_Weight: order.weight || 1,
//       shipment_Length: order.length || 10,
//       shipment_Width: order.width || 10,
//       shipment_Height: order.height || 10,
//       volumetric_Weight: order.volumetricWeight || 0,
//       pick_Address_ID: warehouseId,
//       return_Address_ID: warehouseId, // using same as pickup by default
//       products: order.products?.map(p => ({
//         productId: p.productId || "PRINT001",
//         productName: p.productName || "Print Order",
//         unitPrice: p.unitPrice || 0,
//         quantity: p.quantity || 1,
//         productCategory: p.productCategory || "Printing",
//         hsnCode: p.hsnCode || "1234",
//         sku: p.sku || "PRINT001",
//         taxRate: p.taxRate || 0,
//         productDiscount: p.productDiscount || 0
//       })) || [
//         {
//           productId: "PRINT001",
//           productName: "Print Order",
//           unitPrice: order.totalAmount || 0,
//           quantity: 1,
//           productCategory: "Printing",
//           hsnCode: "1234",
//           sku: "PRINT001",
//           taxRate: 0,
//           productDiscount: 0
//         }
//       ],
//       courierId: order.courierId || 0
//     },
//     {
//       headers: { signature: process.env.FSHIP_API_KEY, "Content-Type": "application/json" }
//     }
//   );
//   return response.data;
// };

// // Rest of your exports remain the same...
// export const shipOrder = async (apiorderid, courierId = 0) => {
//   const response = await axios.post(
//     `${BASE_URL}/api/shiporder`,
//     { apiorderid, courierId },
//     { headers: HEADERS }
//   );
//   return response.data;
// };

// export const generateShippingLabel = async (waybill) => {
//   const response = await axios.post(
//     `${BASE_URL}/api/shippinglabel`,
//     { waybill },
//     { headers: HEADERS }
//   );
//   return response.data;
// };

// export const registerPickup = async (waybills = []) => {
//   const response = await axios.post(
//     `${BASE_URL}/api/registerpickup`,
//     { waybills },
//     { headers: HEADERS }
//   );
//   return response.data;
// };

// export const getShipmentStatus = async (waybill) => {
//   const response = await axios.post(
//     `${BASE_URL}/api/shipmentsummary`,
//     { waybill },
//     { headers: HEADERS }
//   );
//   return response.data;
// };

// export const getTrackingHistory = async (waybill) => {
//   const response = await axios.post(
//     `${BASE_URL}/api/trackinghistory`,
//     { waybill },
//     { headers: HEADERS }
//   );
//   return response.data;
// };

// export const cancelShipment = async (waybill, reason = "") => {
//   const response = await axios.post(
//     `${BASE_URL}/api/cancelorder`,
//     { waybill, reason },
//     { headers: HEADERS }
//   );
//   return response.data;
// };

// export const calculateRate = async (payload) => {
//   const response = await axios.post(
//     `${BASE_URL}/api/ratecalculator`,
//     payload,
//     { headers: HEADERS }
//   );
//   return response.data;
// };

// export const checkPincodeServiceability = async (source_Pincode, destination_Pincode) => {
//   const response = await axios.post(
//     `${BASE_URL}/api/pincodeserviceability`,
//     { source_Pincode, destination_Pincode },
//     { headers: HEADERS }
//   );
//   return response.data;
// };

// export const reattemptOrder = async ({
//   apiorderid,
//   action = "re-attempt",
//   reattempt_date,
//   contact_name,
//   complete_address,
//   landmark = "",
//   mobilenumber = "",
//   remarks = ""
// }) => {
//   const response = await axios.post(
//     `${BASE_URL}/api/reattemptorder`,
//     { apiorderid, action, reattempt_date, contact_name, complete_address, landmark, mobilenumber, remarks },
//     { headers: HEADERS }
//   );
//   return response.data;
// };





// services/fshipService.js
import axios from "axios";

const BASE_URL = "https://capi-qc.fship.in";
const HEADERS = {
  signature: process.env.FSHIP_API_KEY,
  "Content-Type": "application/json"
};

// ---------------------- WAREHOUSE ----------------------
export const createWarehouse = async ({ warehouseName, address, city, pincode, email, contactName, phoneNumber }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/addwarehouse`,
      {
        WarehouseName: warehouseName,
        AddressLine1: address,
        City: city,
        Pincode: pincode,
        Email: email,
        ContactName: contactName,
        PhoneNumber: phoneNumber
      },
      { headers: HEADERS }
    );
    return response.data;
  } catch (error) {
    console.error("Warehouse creation error:", error.response?.data || error.message);
    throw error;
  }
};

// ---------------------- SHIPMENT ----------------------
// services/fshipService.js - Complete createShipment with full debugging

export const createShipment = async (order, warehouseId) => {
  try {
    console.log("\n" + "=".repeat(50));
    console.log("📦 CREATING SHIPMENT");
    console.log("=".repeat(50));
    console.log("Warehouse ID:", warehouseId);
    console.log("Warehouse ID Type:", typeof warehouseId);
    console.log("Order Number:", order.orderNumber);
    
    // Transform items to products format if needed
    let products = [];
    
    if (order.items && order.items.length > 0) {
      products = order.items.map((item, index) => {
        const totalPages = item.pages * (item.copies || 1);
        let pricePerItem = 0;
        
        if (item.printColor === "color") {
          pricePerItem = totalPages * 5;
        } else {
          pricePerItem = totalPages * 2;
        }
        
        if (item.bindingType === "spiral") pricePerItem += 50;
        if (item.bindingType === "perfect") pricePerItem += 100;
        if (item.bindingType === "hardcover") pricePerItem += 200;
        
        if (item.lamination === "matte" || item.lamination === "glossy") {
          pricePerItem += totalPages * 3;
        }
        
        return {
          productId: `ITEM_${index + 1}`,
          productName: `${item.pages} pages, ${item.copies} copies - ${item.printColor} ${item.printSide} on ${item.paperType}`,
          unitPrice: pricePerItem,
          quantity: 1,
          productCategory: "Printing",
          hsnCode: "4901",
          sku: `${item.paperSize}_${item.paperType}_${item.printColor}_${item.bindingType}`,
          taxRate: 18,
          productDiscount: 0
        };
      });
    } else if (order.products && order.products.length > 0) {
      products = order.products;
    } else {
      products = [{
        productId: "PRINT001",
        productName: "Print Order",
        unitPrice: order.totalAmount || 100,
        quantity: 1,
        productCategory: "Printing",
        hsnCode: "4901",
        sku: "PRINT001",
        taxRate: 18,
        productDiscount: 0
      }];
    }
    
    // Build payload exactly as per API documentation
    const payload = {
      customer_Name: order.customer?.name || "Test Customer",
      customer_Mobile: order.customer?.phone || "9876543210",
      customer_Emailid: order.customer?.email || "test@example.com",
      customer_Address: order.customer?.address || "123 Test Street",
      landMark: order.customer?.landmark || "",
      customer_Address_Type: order.customer?.addressType || "Home",
      customer_PinCode: order.customer?.pincode || "560001",
      customer_City: order.customer?.city || "Bangalore",
      orderId: order.orderNumber,
      invoice_Number: order.invoiceNumber || `INV${Date.now()}`,
      payment_Mode: order.paymentMode || 2,
      express_Type: order.expressType || "surface",
      is_Ndd: order.isNdd || 0,
      order_Amount: order.amount || order.totalAmount || 0,
      tax_Amount: order.tax || 0,
      extra_Charges: order.extraCharges || 0,
      total_Amount: order.totalAmount || 0,
      cod_Amount: order.codAmount || 0,
      shipment_Weight: order.weight || 0.5,
      shipment_Length: order.length || 10,
      shipment_Width: order.width || 10,
      shipment_Height: order.height || 10,
      volumetric_Weight: order.volumetricWeight || 0,
      latitude: order.latitude || 0,
      longitude: order.longitude || 0,
      pick_Address_ID: parseInt(warehouseId),
      return_Address_ID: parseInt(warehouseId),
      products: products,
      courierId: order.courierId || 0
    };
    
    console.log("\n📤 SENDING PAYLOAD TO FSHIP API:");
    console.log(JSON.stringify(payload, null, 2));
    console.log("\n🔗 API URL:", `${BASE_URL}/api/createforwardorder`);
    console.log("🔑 API Key Present:", !!process.env.FSHIP_API_KEY);
    
    const response = await axios.post(
      `${BASE_URL}/api/createforwardorder`,
      payload,
      { 
        headers: HEADERS,
        timeout: 30000 // 30 second timeout
      }
    );
    
    console.log("\n✅ API RESPONSE RECEIVED:");
    console.log("Status Code:", response.status);
    console.log("Response Data:", JSON.stringify(response.data, null, 2));
    console.log("=".repeat(50) + "\n");
    
    return response.data;
    
  } catch (error) {
    console.error("\n❌ SHIPMENT CREATION FAILED:");
    console.error("=".repeat(50));
    
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("HTTP Status Code:", error.response.status);
      console.error("HTTP Status Text:", error.response.statusText);
      console.error("Response Headers:", JSON.stringify(error.response.headers, null, 2));
      console.error("Response Data:", JSON.stringify(error.response.data, null, 2));
      
      // If there's a validation error, log it clearly
      if (error.response.data && error.response.data.errors) {
        console.error("\n📋 VALIDATION ERRORS:");
        Object.keys(error.response.data.errors).forEach(key => {
          console.error(`  - ${key}: ${error.response.data.errors[key].join(', ')}`);
        });
      }
      
      throw error;
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from server");
      console.error("Request:", error.request);
      throw new Error("No response from fship API - Check network connection");
    } else {
      // Something happened in setting up the request
      console.error("Error Message:", error.message);
      throw error;
    }
  }
};

// ---------------------- SHIP ORDER ----------------------
export const shipOrder = async (apiorderid, courierId = 0) => {
  try {
    console.log("\n" + "=".repeat(50));
    console.log("🚚 SHIPPING ORDER");
    console.log("=".repeat(50));
    console.log("API Order ID:", apiorderid);
    console.log("Courier ID:", courierId);
    
    const payload = { 
      apiorderid: parseInt(apiorderid), 
      courierId: parseInt(courierId) 
    };
    
    console.log("📤 Sending to ship-order API:", JSON.stringify(payload, null, 2));
    
    const response = await axios.post(
      `${BASE_URL}/api/shiporder`,
      payload,
      { headers: HEADERS }
    );
    
    console.log("✅ Ship Order Response:", JSON.stringify(response.data, null, 2));
    console.log("=".repeat(50) + "\n");
    
    return response.data;
  } catch (error) {
    console.error("\n❌ SHIP ORDER FAILED:");
    console.error("=".repeat(50));
    
    if (error.response) {
      console.error("Status Code:", error.response.status);
      console.error("Response Data:", JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error("No response received");
    } else {
      console.error("Error:", error.message);
    }
    console.error("=".repeat(50) + "\n");
    
    throw error;
  }
};
// ---------------------- SHIPPING LABEL ----------------------
export const generateShippingLabel = async (waybill) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/shippinglabel`,
      { waybill },
      { headers: HEADERS }
    );
    return response.data;
  } catch (error) {
    console.error("Shipping label error:", error.response?.data || error.message);
    throw error;
  }
};

// ---------------------- REGISTER PICKUP ----------------------
export const registerPickup = async (waybills = []) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/registerpickup`,
      { waybills },
      { headers: HEADERS }
    );
    return response.data;
  } catch (error) {
    console.error("Pickup registration error:", error.response?.data || error.message);
    throw error;
  }
};

// ---------------------- SHIPMENT STATUS ----------------------
export const getShipmentStatus = async (waybill) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/shipmentsummary`,
      { waybill },
      { headers: HEADERS }
    );
    return response.data;
  } catch (error) {
    console.error("Shipment status error:", error.response?.data || error.message);
    throw error;
  }
};

// ---------------------- TRACKING HISTORY ----------------------
export const getTrackingHistory = async (waybill) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/trackinghistory`,
      { waybill },
      { headers: HEADERS }
    );
    return response.data;
  } catch (error) {
    console.error("Tracking history error:", error.response?.data || error.message);
    throw error;
  }
};

// ---------------------- CANCEL SHIPMENT ----------------------
export const cancelShipment = async (waybill, reason = "") => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/cancelorder`,
      { waybill, reason },
      { headers: HEADERS }
    );
    return response.data;
  } catch (error) {
    console.error("Cancel shipment error:", error.response?.data || error.message);
    throw error;
  }
};

// ---------------------- RATE CALCULATOR ----------------------
export const calculateRate = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/ratecalculator`,
      payload,
      { headers: HEADERS }
    );
    return response.data;
  } catch (error) {
    console.error("Rate calculation error:", error.response?.data || error.message);
    throw error;
  }
};

// ---------------------- PINCODE SERVICEABILITY ----------------------
export const checkPincodeServiceability = async (source_Pincode, destination_Pincode) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/pincodeserviceability`,
      { source_Pincode, destination_Pincode },
      { headers: HEADERS }
    );
    return response.data;
  } catch (error) {
    console.error("Pincode serviceability error:", error.response?.data || error.message);
    throw error;
  }
};

// ---------------------- RE-ATTEMPT ORDER ----------------------
export const reattemptOrder = async ({
  apiorderid,
  action = "re-attempt",
  reattempt_date,
  contact_name,
  complete_address,
  landmark = "",
  mobilenumber = "",
  remarks = ""
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/reattemptorder`,
      { apiorderid, action, reattempt_date, contact_name, complete_address, landmark, mobilenumber, remarks },
      { headers: HEADERS }
    );
    return response.data;
  } catch (error) {
    console.error("Reattempt order error:", error.response?.data || error.message);
    throw error;
  }
};