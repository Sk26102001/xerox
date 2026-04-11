




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

// Add this function to fshipService.js
// export const getAllWarehouses = async () => {
//   try {
//     console.log("\n📦 FETCHING ALL WAREHOUSES");
//     const response = await axios.post(
//       `${BASE_URL}/api/getwarehouses`,
//       {},
//       { headers: HEADERS }
//     );
//     console.log("Warehouses:", JSON.stringify(response.data, null, 2));
//     return response.data;
//   } catch (error) {
//     console.error("Get warehouses error:", error.response?.data || error.message);
//     throw error;
//   }
// };


// export const createShipment = async (order, warehouseId) => {
//   try {
//     console.log("\n" + "=".repeat(60));
//     console.log("📦 CREATING SHIPMENT");
//     console.log("=".repeat(60));
    
//     // ✅ Get delivery charge
//     let deliveryCharge = 0;
//     if (order.deliveryCharge && order.deliveryCharge > 0) {
//       deliveryCharge = parseFloat(order.deliveryCharge);
//       console.log(`✅ Using provided delivery charge: ₹${deliveryCharge}`);
//     } else if (order.extra_Charges && order.extra_Charges > 0) {
//       deliveryCharge = parseFloat(order.extra_Charges);
//       console.log(`✅ Using extra_Charges: ₹${deliveryCharge}`);
//     } else {
//       console.log("⚠️ No delivery charge provided, using default ₹50");
//       deliveryCharge = 50;
//     }
    
//     // ✅ Calculate product value from totalAmount (which includes discount)
//     const totalAmountFromOrder = parseFloat(order.totalAmount || order.finalAmount || 0);
//     const calculatedProductValue = totalAmountFromOrder - deliveryCharge;
    
//     console.log(`\n📊 ORDER AMOUNT BREAKDOWN:`);
//     console.log(`  Order Total Amount: ₹${totalAmountFromOrder}`);
//     console.log(`  Delivery Charge: ₹${deliveryCharge}`);
//     console.log(`  Calculated Product Value: ₹${calculatedProductValue}`);
    
//     // ✅ Transform items with CORRECT product values for FShip API
//     let products = [];
//     let totalProductValue = 0;
    
//     if (order.items && order.items.length > 0) {
//       // Distribute calculated product value across items
//       const valuePerItem = calculatedProductValue / order.items.length;
      
//       products = order.items.map((item, index) => {
//         const productValue = valuePerItem;
//         totalProductValue += productValue;
        
//         console.log(`  Item ${index + 1}: Using value ₹${productValue.toFixed(2)} (original amount: ${item.amount})`);
        
//         const productName = `${item.pages}p × ${item.copies}c | ${item.printColor === 'color' ? 'Color' : 'B&W'} | ${item.bindingType || 'No binding'}`;
        
//         // ✅ CORRECT PRODUCT STRUCTURE FOR FSHIP API
//         return {
//           productName: productName.substring(0, 100),     // ✅ lowercase 'p'
//           sku: `${item.paperSize || 'A4'}_${item.printColor}_${item.bindingType || 'none'}`,  // ✅ 'sku'
//           quantity: item.copies || 1,                    // ✅ 'quantity'
//           // unitPrice: Math.round(productValue / (item.copies || 1)),
//           unitPrice: parseFloat((productValue / (item.copies || 1)).toFixed(2)),  // ✅ 'unitPrice'
//           hsnCode: "4901",                               // ✅ 'hsnCode'
//           taxRate: 5,                                    // ✅ 'taxRate'
//           productDiscount: 0,
//           productCategory: "Printing"
//         };
//       });
//     } else {
//       totalProductValue = calculatedProductValue;
//       products = [{
//         productName: "Print Order",
//         sku: "PRINT001",
//         quantity: 1,
//         unitPrice: Math.round(calculatedProductValue),
//         hsnCode: "4901",
//         taxRate: 5,
//         productDiscount: 0,
//         productCategory: "Printing"
//       }];
      
//     }
    
//     // Calculate total weight (at shipment level, not in products)
//     let totalWeight = order.orderWeight || 0.5;
//     if (totalWeight <= 0) {
//       totalWeight = 0.5;
//     }
//     totalWeight = parseFloat(totalWeight.toFixed(2));
    
//     // Determine payment mode
//     let paymentMode = 2; // Prepaid
//     if (order.paymentMode === 1 || order.paymentMethod === 'cod' || order.paymentMode === 'cod') {
//       paymentMode = 1;
//     }
    
//     // ✅ Calculate final amounts for FShip
//     // const orderAmount = Math.round(totalProductValue);  // Product value only
//     // const totalAmount = Math.round(orderAmount + deliveryCharge);  // Grand total

//     const orderAmount = parseFloat(totalProductValue.toFixed(2));
// const totalAmount = parseFloat((orderAmount + deliveryCharge).toFixed(2));
    
//     console.log(`\n💰 FINAL AMOUNTS FOR FSHIP:`);
//     console.log(`  order_Amount (Products): ₹${orderAmount}`);
//     console.log(`  extra_Charges (Shipping): ₹${deliveryCharge}`);
//     console.log(`  total_Amount: ₹${totalAmount}`);
//     console.log(`  Products:`, products.map(p => ({ 
//       productName: p.productName, 
//       unitPrice: p.unitPrice, 
//       quantity: p.quantity 
//     })));
    
//     // ✅ Build payload with CORRECT field names
//     const payload = {
//       customer_Name: order.customer?.name || "Customer",
//       customer_Mobile: order.customer?.phone || "9876543210",
//       customer_Emailid: order.customer?.email || "customer@example.com",
//       customer_Address: order.customer?.address || "Address",
//       landMark: order.customer?.landmark || "",
//       customer_Address_Type: order.customer?.addressType || "Home",
//       customer_PinCode: order.customer?.pincode || "560001",
//       customer_City: order.customer?.city || "City",
//       orderId: order.orderNumber || `ORD${Date.now()}`,
//       invoice_Number: order.invoiceNumber || `INV${Date.now()}`,
//       payment_Mode: paymentMode,
//       express_Type: order.expressType || "surface",
//       is_Ndd: order.isNdd || 0,
//       order_Amount: orderAmount,
//       tax_Amount: order.taxAmount || 0,
//       // extra_Charges: deliveryCharge,
//       extra_Charges: 0,
//       total_Amount: totalAmount,
//       cod_Amount: paymentMode === 1 ? totalAmount : 0,
//       shipment_Weight: totalWeight,
//       shipment_Length: order.length || 10,
//       shipment_Width: order.width || 10,
//       shipment_Height: order.height || 10,
//       volumetric_Weight: order.volumetricWeight || 0,
//       latitude: order.latitude || 0,
//       longitude: order.longitude || 0,
//       pick_Address_ID: parseInt(warehouseId),
//       return_Address_ID: parseInt(warehouseId),
//       products: products,  // ✅ Now has correct structure
//       courierId: order.courierId || 0
//     };
    
//     console.log("\n📤 SENDING TO FSHIP:", JSON.stringify({
//       order_Amount: payload.order_Amount,
//       extra_Charges: payload.extra_Charges,
//       total_Amount: payload.total_Amount,
//       products: products.map(p => ({ 
//         productName: p.productName, 
//         unitPrice: p.unitPrice, 
//         quantity: p.quantity,
//         hsnCode: p.hsnCode,
//         taxRate: p.taxRate
//       }))
//     }, null, 2));
    
//     const response = await axios.post(
//       `${BASE_URL}/api/createforwardorder`,
//       payload,
//       { headers: HEADERS, timeout: 30000 }
//     );
    
//     console.log("\n✅ FSHIP RESPONSE:", JSON.stringify(response.data, null, 2));
//     return response.data;
    
//   } catch (error) {
//     console.error("\n❌ SHIPMENT CREATION FAILED:", error.response?.data || error.message);
//     throw error;
//   }
// };

export const createShipment = async (order, warehouseId) => {
  try {
    console.log("\n" + "=".repeat(60));
    console.log("📦 CREATING SHIPMENT");
    console.log("=".repeat(60));
    
    // ✅ Get delivery charge
    let deliveryCharge = 0;
    if (order.deliveryCharge && order.deliveryCharge > 0) {
      deliveryCharge = parseFloat(order.deliveryCharge);
      console.log(`✅ Using provided delivery charge: ₹${deliveryCharge}`);
    } else if (order.extra_Charges && order.extra_Charges > 0) {
      deliveryCharge = parseFloat(order.extra_Charges);
      console.log(`✅ Using extra_Charges: ₹${deliveryCharge}`);
    } else {
      console.log("⚠️ No delivery charge provided, using default ₹50");
      deliveryCharge = 50;
    }
    
    // ✅ Calculate product value from totalAmount
    const totalAmountFromOrder = parseFloat(order.totalAmount || order.finalAmount || 0);
    let calculatedProductValue = totalAmountFromOrder - deliveryCharge;
    
    console.log(`\n📊 ORDER AMOUNT BREAKDOWN:`);
    console.log(`  Order Total Amount: ₹${totalAmountFromOrder}`);
    console.log(`  Delivery Charge: ₹${deliveryCharge}`);
    console.log(`  Calculated Product Value: ₹${calculatedProductValue}`);
    
    // ✅ Transform items with CORRECT product values for FShip API
    let products = [];
    let totalProductValue = 0;
    
    if (order.items && order.items.length > 0) {
      const valuePerItem = calculatedProductValue / order.items.length;
      
      products = order.items.map((item, index) => {
        const productValue = valuePerItem;
        totalProductValue += productValue;
        
        console.log(`  Item ${index + 1}: Total value ₹${productValue.toFixed(2)} for ${item.copies} copies`);
        
        const productName = `${item.pages}p × ${item.copies}c | ${item.printColor === 'color' ? 'Color' : 'B&W'}`;
        
        // Send as single line item with total value (not unit price)
        return {
          productName: productName.substring(0, 100),
          sku: `${item.paperSize || 'A4'}_${item.printColor}_${item.bindingType || 'none'}`,
          quantity: 1,  // ← Set to 1
          unitPrice: parseFloat(productValue.toFixed(2)),  // ← Send total value
          hsnCode: "4901",
          taxRate: 5,
          productDiscount: 0,
          productCategory: "Printing"
        };
      });
    }
    
    // ✅ ADD SHIPPING AS A PRODUCT
    if (deliveryCharge > 0) {
      products.push({
        productName: "Shipping Charges",
        sku: "SHIPPING",
        quantity: 1,
        unitPrice: parseFloat(deliveryCharge.toFixed(2)),
        hsnCode: "4901",
        taxRate: 0,
        productDiscount: 0,
        productCategory: "Shipping"
      });
      totalProductValue += deliveryCharge;
      console.log(`✅ Added shipping as product: ₹${deliveryCharge}`);
    }
    
    // Calculate total weight
    let totalWeight = order.orderWeight || 0.5;
    totalWeight = parseFloat(totalWeight.toFixed(2));
    
    // Determine payment mode
    let paymentMode = 2; // Prepaid
    if (order.paymentMode === 1 || order.paymentMethod === 'cod' || order.paymentMode === 'cod') {
      paymentMode = 1;
    }
    
    // ✅ Calculate final amounts
    const orderAmount = parseFloat(totalProductValue.toFixed(2));
    const totalAmount = parseFloat(orderAmount.toFixed(2));  // Shipping already included in products
    
    console.log(`\n💰 FINAL AMOUNTS FOR FSHIP:`);
    console.log(`  order_Amount: ₹${orderAmount}`);
    console.log(`  extra_Charges: ₹0 (shipping added as product)`);
    console.log(`  total_Amount: ₹${totalAmount}`);
    console.log(`  Products:`);
    products.forEach((p, i) => {
      console.log(`    ${i + 1}. ${p.productName}: ₹${p.unitPrice}`);
    });
    
    // ✅ Build payload
    const payload = {
      customer_Name: order.customer?.name || "Customer",
      customer_Mobile: order.customer?.phone || "9876543210",
      customer_Emailid: order.customer?.email || "customer@example.com",
      customer_Address: order.customer?.address || "Address",
      landMark: order.customer?.landmark || "",
      customer_Address_Type: order.customer?.addressType || "Home",
      customer_PinCode: order.customer?.pincode || "560001",
      customer_City: order.customer?.city || "City",
      orderId: order.orderNumber || `ORD${Date.now()}`,
      invoice_Number: order.invoiceNumber || `INV${Date.now()}`,
      payment_Mode: paymentMode,
      express_Type: order.expressType || "surface",
      is_Ndd: order.isNdd || 0,
      order_Amount: orderAmount,
      tax_Amount: order.taxAmount || 0,
      extra_Charges: 0,  // ← Set to 0 since shipping is a product
      total_Amount: totalAmount,
      cod_Amount: paymentMode === 1 ? totalAmount : 0,
      shipment_Weight: totalWeight,
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
    
    console.log("\n📤 SENDING TO FSHIP - PRODUCT SUMMARY:");
    products.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.productName}: Qty ${p.quantity} × ₹${p.unitPrice} = ₹${p.quantity * p.unitPrice}`);
    });
    
    const response = await axios.post(
      `${BASE_URL}/api/createforwardorder`,
      payload,
      { headers: HEADERS, timeout: 30000 }
    );
    
    console.log("\n✅ FSHIP RESPONSE:", JSON.stringify(response.data, null, 2));
    return response.data;
    
  } catch (error) {
    console.error("\n❌ SHIPMENT CREATION FAILED:", error.response?.data || error.message);
    throw error;
  }
};

// ---------------------- SHIP ORDER ----------------------
export const shipOrder = async (apiorderid, courierId = 0) => {
  try {
    console.log("\n" + "=".repeat(60));
    console.log("🚚 SHIPPING ORDER");
    console.log("=".repeat(60));
    console.log("API Order ID:", apiorderid);
    console.log("Courier ID:", courierId);
    
    const payload = { 
      apiorderid: parseInt(apiorderid), 
      courierId: parseInt(courierId) 
    };
    
    const response = await axios.post(
      `${BASE_URL}/api/shiporder`,
      payload,
      { headers: HEADERS }
    );
    
    console.log("✅ Ship Order Response:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error("Ship order failed:", error.response?.data || error.message);
    throw error;
  }
};

// ---------------------- SHIPPING LABEL ----------------------
export const generateShippingLabel = async (waybill) => {
  try {
    console.log("\n" + "=".repeat(60));
    console.log("🏷️ GENERATING SHIPPING LABEL");
    console.log("=".repeat(60));
    console.log("Waybill:", waybill);
    
    const response = await axios.post(
      `${BASE_URL}/api/shippinglabel`,
      { waybill: waybill },
      { headers: HEADERS }
    );
    
    let labelUrl = null;
    
    if (response.data.labelurl) {
      labelUrl = response.data.labelurl;
    } else if (response.data.labelUrl) {
      labelUrl = response.data.labelUrl;
    } else if (response.data.resultDetails) {
      if (response.data.resultDetails[waybill]) {
        labelUrl = response.data.resultDetails[waybill].labelUrl || response.data.resultDetails[waybill].labelurl;
      } else if (Array.isArray(response.data.resultDetails)) {
        const found = response.data.resultDetails.find(item => 
          item.waybill === waybill || item.AWBNumber === waybill
        );
        if (found) labelUrl = found.labelUrl || found.labelurl;
      }
    }
    
    console.log("Extracted Label URL:", labelUrl);
    
    return {
      status: response.data.status === "success" || response.data.status === true,
      labelurl: labelUrl,
      response: response.data.response || "Label generated successfully",
      rawResponse: response.data
    };
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


// Add to your existing fshipService.js

// ---------------------- UPDATE WAREHOUSE ----------------------
export const updateWarehouse = async ({
  warehouseId,
  warehouseName,
  contactName,
  addressLine1,
  addressLine2 = "",
  pincode,
  city,
  stateId,
  countryId = 0,
  phoneNumber,
  email
}) => {
  try {
    console.log("\n" + "=".repeat(60));
    console.log("🏭 UPDATING WAREHOUSE");
    console.log("=".repeat(60));
    console.log(`Warehouse ID: ${warehouseId}`);
    console.log(`Address: ${addressLine1}, ${city}, ${pincode}`);
    
    const payload = {
      warehouseId: parseInt(warehouseId),
      warehouseName: warehouseName,
      contactName: contactName,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      pincode: pincode,
      city: city,
      stateId: parseInt(stateId),
      countryId: parseInt(countryId),
      phoneNumber: phoneNumber,
      email: email
    };
    
    const response = await axios.post(
      `${BASE_URL}/api/updatewarehouse`,
      payload,
      { headers: HEADERS }
    );
    
    console.log("✅ Warehouse updated successfully");
    return response.data;
    
  } catch (error) {
    console.error("❌ Warehouse update failed:", error.response?.data || error.message);
    throw error;
  }
};

// ---------------------- GET ALL WAREHOUSES ----------------------
export const getAllWarehouses = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/getwarehouses`,
      {},
      { headers: HEADERS }
    );
    return response.data;
  } catch (error) {
    console.error("Get warehouses error:", error.response?.data || error.message);
    throw error;
  }
};