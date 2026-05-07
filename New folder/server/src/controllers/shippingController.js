

// import { createWarehouse, createShipment } from "../services/fshipService.js";

// // Warehouse controller
// export const createWarehouseController = async (req, res) => {
//   try {
//     const { warehouseName, address, city, pincode, email, contactName, phoneNumber } = req.body;
//     if (!warehouseName || !address || !city || !pincode || !email || !contactName || !phoneNumber) {
//       return res.status(400).json({ message: "All warehouse fields are required" });
//     }
//     const result = await createWarehouse({ warehouseName, address, city, pincode, email, contactName, phoneNumber });
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: "Warehouse creation failed", error: error.response?.data || error.message });
//   }
// };



// // Shipment controller
// export const createShipmentController = async (req, res) => {
//   try {
//     const { order, warehouseId } = req.body;
//     if (!order || !warehouseId) throw new Error("Order data or warehouseId missing");
//     const result = await createShipment(order, warehouseId);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ message: "Shipment creation failed", error: error.response?.data || error.message });
//   }
// };






// // controllers/shippingController.js
// import {
//   createWarehouse,
//   createShipment,
//   shipOrder,
//   generateShippingLabel,
//   registerPickup,
//   getShipmentStatus,
//   getTrackingHistory,
//   cancelShipment,
//   calculateRate,
//   checkPincodeServiceability,
//   reattemptOrder
// } from "../services/fshipService.js";

// // ---------------------- WAREHOUSE ----------------------
// export const createWarehouseController = async (req, res) => {
//   try {
//     const { warehouseName, address, city, pincode, email, contactName, phoneNumber } = req.body;
    
//     console.log("=== Create Warehouse Request ===");
//     console.log("Request body:", req.body);
    
//     if (!warehouseName || !address || !city || !pincode || !email || !contactName || !phoneNumber) {
//       return res.status(400).json({ 
//         message: "All warehouse fields are required",
//         required: ["warehouseName", "address", "city", "pincode", "email", "contactName", "phoneNumber"]
//       });
//     }
    
//     const result = await createWarehouse({ 
//       warehouseName, 
//       address, 
//       city, 
//       pincode, 
//       email, 
//       contactName, 
//       phoneNumber 
//     });
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Warehouse created successfully"
//     });
//   } catch (error) {
//     console.error("Warehouse creation error:", error);
//     res.status(500).json({ 
//       message: "Warehouse creation failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- SHIPMENT ----------------------
// export const createShipmentController = async (req, res) => {
//   try {
//     const { order, warehouseId } = req.body;
    
//     console.log("=== Create Shipment Request ===");
//     console.log("Warehouse ID:", warehouseId);
//     console.log("Order:", JSON.stringify(order, null, 2));
    
//     // Validate required fields
//     if (!order) {
//       return res.status(400).json({ 
//         message: "Order data is required",
//         error: "Missing order object in request body"
//       });
//     }
    
//     if (!warehouseId) {
//       return res.status(400).json({ 
//         message: "Warehouse ID is required",
//         error: "Missing warehouseId in request body"
//       });
//     }
    
//     // Validate customer details
//     if (!order.customer) {
//       return res.status(400).json({ 
//         message: "Customer details are required",
//         error: "Missing customer object in order"
//       });
//     }
    
//     // Validate required customer fields
//     const requiredCustomerFields = ['name', 'phone', 'email', 'address', 'pincode', 'city', 'state'];
//     const missingFields = requiredCustomerFields.filter(field => !order.customer[field]);
    
//     if (missingFields.length > 0) {
//       return res.status(400).json({ 
//         message: "Missing required customer fields",
//         missingFields: missingFields
//       });
//     }
    
//     const result = await createShipment(order, warehouseId);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Shipment created successfully"
//     });
//   } catch (error) {
//     console.error("Create shipment controller error:", error);
    
//     // Handle different error types
//     if (error.response?.status === 400) {
//       return res.status(400).json({ 
//         message: "Shipment creation failed - Validation error", 
//         error: error.response.data,
//         details: error.response.data
//       });
//     }
    
//     res.status(500).json({ 
//       message: "Shipment creation failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- SHIP ORDER ----------------------
// export const shipOrderController = async (req, res) => {
//   try {
//     const { apiorderid, courierId } = req.body;
    
//     console.log("=== Ship Order Request ===");
//     console.log("API Order ID:", apiorderid);
//     console.log("Courier ID:", courierId);
    
//     if (!apiorderid) {
//       return res.status(400).json({ 
//         message: "API Order ID is required",
//         error: "Missing apiorderid"
//       });
//     }
    
//     const result = await shipOrder(apiorderid, courierId);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Order shipped successfully"
//     });
//   } catch (error) {
//     console.error("Ship order error:", error);
//     res.status(500).json({ 
//       message: "Ship order failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- GENERATE / PRINT LABEL ----------------------
// export const generateShippingLabelController = async (req, res) => {
//   try {
//     const { waybills } = req.body;
    
//     console.log("=== Generate Shipping Label Request ===");
//     console.log("Waybill(s):", waybills);
    
//     if (!waybills) {
//       return res.status(400).json({ 
//         message: "Waybill(s) required",
//         error: "Missing waybills"
//       });
//     }
    
//     const result = await generateShippingLabel(waybills);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Shipping label generated successfully"
//     });
//   } catch (error) {
//     console.error("Generate shipping label error:", error);
//     res.status(500).json({ 
//       message: "Generate shipping label failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- REGISTER PICKUP ----------------------
// export const registerPickupController = async (req, res) => {
//   try {
//     const { waybills } = req.body;
    
//     console.log("=== Register Pickup Request ===");
//     console.log("Waybill(s):", waybills);
    
//     if (!waybills) {
//       return res.status(400).json({ 
//         message: "Waybill(s) required for pickup",
//         error: "Missing waybills"
//       });
//     }
    
//     const result = await registerPickup(waybills);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Pickup registered successfully"
//     });
//   } catch (error) {
//     console.error("Register pickup error:", error);
//     res.status(500).json({ 
//       message: "Register pickup failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- SHIPMENT CURRENT STATUS ----------------------
// export const getShipmentStatusController = async (req, res) => {
//   try {
//     const { waybill } = req.body;
    
//     console.log("=== Get Shipment Status Request ===");
//     console.log("Waybill:", waybill);
    
//     if (!waybill) {
//       return res.status(400).json({ 
//         message: "Waybill required",
//         error: "Missing waybill"
//       });
//     }
    
//     const result = await getShipmentStatus(waybill);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Shipment status fetched successfully"
//     });
//   } catch (error) {
//     console.error("Get shipment status error:", error);
//     res.status(500).json({ 
//       message: "Fetch shipment status failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- TRACKING HISTORY ----------------------
// export const getTrackingHistoryController = async (req, res) => {
//   try {
//     const { waybill } = req.body;
    
//     console.log("=== Get Tracking History Request ===");
//     console.log("Waybill:", waybill);
    
//     if (!waybill) {
//       return res.status(400).json({ 
//         message: "Waybill required",
//         error: "Missing waybill"
//       });
//     }
    
//     const result = await getTrackingHistory(waybill);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Tracking history fetched successfully"
//     });
//   } catch (error) {
//     console.error("Get tracking history error:", error);
//     res.status(500).json({ 
//       message: "Fetch tracking history failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- CANCEL SHIPMENT ----------------------
// export const cancelShipmentController = async (req, res) => {
//   try {
//     const { waybill, reason } = req.body;
    
//     console.log("=== Cancel Shipment Request ===");
//     console.log("Waybill:", waybill);
//     console.log("Reason:", reason);
    
//     if (!waybill) {
//       return res.status(400).json({ 
//         message: "Waybill required to cancel shipment",
//         error: "Missing waybill"
//       });
//     }
    
//     const result = await cancelShipment(waybill, reason);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Shipment cancelled successfully"
//     });
//   } catch (error) {
//     console.error("Cancel shipment error:", error);
//     res.status(500).json({ 
//       message: "Cancel shipment failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- RATE CALCULATOR ----------------------
// export const calculateRateController = async (req, res) => {
//   try {
//     const payload = req.body;
    
//     console.log("=== Calculate Rate Request ===");
//     console.log("Payload:", payload);
    
//     const result = await calculateRate(payload);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Rate calculated successfully"
//     });
//   } catch (error) {
//     console.error("Rate calculation error:", error);
//     res.status(500).json({ 
//       message: "Rate calculation failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- PINCODE SERVICEABILITY ----------------------
// export const checkPincodeServiceabilityController = async (req, res) => {
//   try {
//     const { source_Pincode, destination_Pincode } = req.body;
    
//     console.log("=== Check Pincode Serviceability Request ===");
//     console.log("Source Pincode:", source_Pincode);
//     console.log("Destination Pincode:", destination_Pincode);
    
//     if (!source_Pincode || !destination_Pincode) {
//       return res.status(400).json({ 
//         message: "Source and destination pincodes required",
//         error: "Missing pincodes"
//       });
//     }
    
//     const result = await checkPincodeServiceability(source_Pincode, destination_Pincode);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Pincode serviceability checked successfully"
//     });
//   } catch (error) {
//     console.error("Pincode serviceability error:", error);
//     res.status(500).json({ 
//       message: "Pincode serviceability check failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- RE-ATTEMPT ORDER ----------------------
// export const reattemptOrderController = async (req, res) => {
//   try {
//     const payload = req.body;
    
//     console.log("=== Re-attempt Order Request ===");
//     console.log("Payload:", payload);
    
//     if (!payload.apiorderid || !payload.action) {
//       return res.status(400).json({ 
//         message: "apiorderid and action are required",
//         error: "Missing required fields"
//       });
//     }
    
//     const result = await reattemptOrder(payload);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Order re-attempt successful"
//     });
//   } catch (error) {
//     console.error("Re-attempt order error:", error);
//     res.status(500).json({ 
//       message: "Re-attempt order failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };







// // controllers/shippingController.js
// import {
//   createWarehouse,
//   createShipment,
//   shipOrder,
//   generateShippingLabel,
//   registerPickup,
//   getShipmentStatus,
//   getTrackingHistory,
//   cancelShipment,
//   calculateRate,
//   checkPincodeServiceability,
//   reattemptOrder
// } from "../services/fshipService.js";
// import Order from '../models/Order.js';

// // Helper function to get nearby serviceable pincodes
// const getNearbyPincodes = async (pincode) => {
//   const nearbyPincodes = {
//     "560001": ["560001", "560002", "560025", "560034", "560038", "560017"],
//     "560038": ["560038", "560037", "560075", "560017", "560001"],
//     "400001": ["400001", "400002", "400003", "400004", "400005", "400020"],
//     "400093": ["400093", "400092", "400094", "400095", "400001"],
//     "110001": ["110001", "110002", "110003", "110005", "110006", "110016"],
//     "600001": ["600001", "600002", "600003", "600004", "600005"],
//     "700001": ["700001", "700002", "700003", "700004", "700005"]
//   };
  
//   for (const [key, pincodes] of Object.entries(nearbyPincodes)) {
//     if (pincode.startsWith(key.substring(0, 3))) {
//       return pincodes.filter(p => p !== pincode);
//     }
//   }
  
//   return ["560001", "400001", "110001", "600001", "700001"];
// };

// // ---------------------- WAREHOUSE ----------------------
// export const createWarehouseController = async (req, res) => {
//   try {
//     const { warehouseName, address, city, pincode, email, contactName, phoneNumber } = req.body;
    
//     console.log("=== Create Warehouse Request ===");
//     console.log("Request body:", req.body);
    
//     if (!warehouseName || !address || !city || !pincode || !email || !contactName || !phoneNumber) {
//       return res.status(400).json({ 
//         success: false,
//         message: "All warehouse fields are required",
//         required: ["warehouseName", "address", "city", "pincode", "email", "contactName", "phoneNumber"]
//       });
//     }
    
//     const result = await createWarehouse({ 
//       warehouseName, 
//       address, 
//       city, 
//       pincode, 
//       email, 
//       contactName, 
//       phoneNumber 
//     });
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Warehouse created successfully"
//     });
//   } catch (error) {
//     console.error("Warehouse creation error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Warehouse creation failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- CHECK DELIVERY AVAILABILITY ----------------------
// export const checkDeliveryAvailabilityController = async (req, res) => {
//   try {
//     const { pincode, warehousePincode = "305001", weight = 0.5 } = req.body;
    
//     if (!pincode) {
//       return res.status(400).json({
//         success: false,
//         message: "Pincode is required"
//       });
//     }
    
//     console.log(`\n🔍 Checking delivery availability for pincode: ${pincode}`);
//     console.log(`Warehouse Pincode: ${warehousePincode}`);
    
//     const serviceability = await checkPincodeServiceability(warehousePincode, pincode);
    
//     console.log("Serviceability Result:", JSON.stringify(serviceability, null, 2));
    
//     if (!serviceability.status || serviceability.delivery !== "Yes") {
//       const nearbyPincodes = await getNearbyPincodes(pincode);
      
//       return res.status(200).json({
//         success: true,
//         data: {
//           serviceable: false,
//           pincode: pincode,
//           message: serviceability.response || "Delivery not available for this pincode",
//           details: {
//             source: serviceability.source,
//             destination: serviceability.destination,
//             pickup: serviceability.pickup,
//             delivery: serviceability.delivery,
//             cod: serviceability.cod
//           },
//           suggestions: {
//             alternativePincodes: nearbyPincodes,
//             message: "Try one of these nearby pincodes or contact support"
//           }
//         }
//       });
//     }
    
//     const rates = await calculateRate({
//       source_Pincode: warehousePincode,
//       destination_Pincode: pincode,
//       payment_Mode: "P",
//       amount: 0,
//       express_Type: "surface",
//       shipment_Weight: weight,
//       shipment_Length: 10,
//       shipment_Width: 10,
//       shipment_Height: 10,
//       volumetric_Weight: 0
//     });
    
//     let couriers = [];
//     let cheapestCourier = null;
//     let fastestCourier = null;
    
//     if (rates.status && rates.shipment_rates && rates.shipment_rates.length > 0) {
//       couriers = rates.shipment_rates.map(rate => ({
//         courierId: rate.courier_id,
//         courierName: rate.courier_name,
//         shippingCharge: rate.shipping_charge,
//         codCharge: rate.cod_charge,
//         rtoCharge: rate.rto_charge,
//         serviceMode: rate.service_mode,
//         zoneName: rate.zone_name,
//         expectedDelivery: rate.expectedDeliveryDate
//       }));
      
//       cheapestCourier = couriers.reduce((min, rate) => 
//         rate.shippingCharge < min.shippingCharge ? rate : min
//       );
      
//       fastestCourier = couriers.reduce((fastest, rate) => {
//         if (!fastest) return rate;
//         return new Date(rate.expectedDelivery) < new Date(fastest.expectedDelivery) ? rate : fastest;
//       }, null);
//     }
    
//     res.status(200).json({
//       success: true,
//       data: {
//         serviceable: true,
//         pincode: pincode,
//         message: "Delivery available for this pincode",
//         details: {
//           source: serviceability.source,
//           destination: serviceability.destination,
//           zone: serviceability.zone,
//           pickup: serviceability.pickup,
//           delivery: serviceability.delivery,
//           cod: serviceability.cod
//         },
//         couriers: {
//           total: couriers.length,
//           list: couriers,
//           recommendations: {
//             cheapest: cheapestCourier,
//             fastest: fastestCourier
//           }
//         }
//       },
//       message: "Delivery availability checked successfully"
//     });
    
//   } catch (error) {
//     console.error("Check delivery availability error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to check delivery availability",
//       error: error.message
//     });
//   }
// };

// // ---------------------- CREATE SHIPMENT ----------------------
// export const createShipmentController = async (req, res) => {
//   try {
//     const { order, warehouseId } = req.body;
    
//     console.log("\n" + "=".repeat(60));
//     console.log("🚚 CREATE SHIPMENT WITH SERVICEABILITY CHECK");
//     console.log("=".repeat(60));
//     console.log("Warehouse ID:", warehouseId);
//     console.log("Order Number:", order?.orderNumber);
//     console.log("Customer Pincode:", order?.customer?.pincode);
//     console.log("Total Amount:", order?.totalAmount);
//     console.log("Items count:", order?.items?.length);
    
//     // Validate required fields
//     if (!order) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Order data is required"
//       });
//     }
    
//     if (!warehouseId) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Warehouse ID is required"
//       });
//     }
    
//     if (!order.customer) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Customer details are required"
//       });
//     }
    
//     const requiredCustomerFields = ['name', 'phone', 'email', 'address', 'pincode', 'city', 'state'];
//     const missingFields = requiredCustomerFields.filter(field => !order.customer[field]);
    
//     if (missingFields.length > 0) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Missing required customer fields",
//         missingFields: missingFields
//       });
//     }
    
//     // STEP 1: Check Pincode Serviceability
//     const warehousePincode = order.warehousePincode || "305001";
//     const customerPincode = order.customer.pincode;
    
//     console.log("\n🔍 STEP 1: Checking pincode serviceability...");
//     console.log(`   Source: ${warehousePincode} → Destination: ${customerPincode}`);
    
//     const serviceability = await checkPincodeServiceability(warehousePincode, customerPincode);
    
//     if (!serviceability.status || serviceability.delivery !== "Yes") {
//       const nearbyPincodes = await getNearbyPincodes(customerPincode);
      
//       return res.status(400).json({
//         success: false,
//         message: "Delivery not available for this pincode",
//         data: {
//           serviceable: false,
//           pincode: customerPincode,
//           suggestions: { alternativePincodes: nearbyPincodes }
//         }
//       });
//     }
    
//     console.log("✅ Pincode is serviceable!");
    
//     // STEP 2: Get available couriers
//     console.log("\n💰 STEP 2: Getting available couriers...");
    
//     const rates = await calculateRate({
//       source_Pincode: warehousePincode,
//       destination_Pincode: customerPincode,
//       payment_Mode: "P",
//       amount: order.totalAmount || 0,
//       express_Type: order.expressType || "surface",
//       shipment_Weight: order.weight || 0.5,
//       shipment_Length: 10,
//       shipment_Width: 10,
//       shipment_Height: 10,
//       volumetric_Weight: 0
//     });
    
//     let availableCouriers = [];
    
//     if (rates.status && rates.shipment_rates && rates.shipment_rates.length > 0) {
//       availableCouriers = rates.shipment_rates;
      
//       console.log(`   Total couriers: ${rates.shipment_rates.length}`);
      
//       if (availableCouriers.length === 0) {
//         return res.status(400).json({
//           success: false,
//           message: "No couriers available for this route"
//         });
//       }
      
//       availableCouriers.sort((a, b) => a.shipping_charge - b.shipping_charge);
      
//       console.log("   Available couriers (cheapest first):");
//       availableCouriers.slice(0, 5).forEach((c, i) => {
//         console.log(`      ${i + 1}. ${c.courier_name}: ₹${c.shipping_charge} (ID: ${c.courier_id})`);
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "No couriers available for this route"
//       });
//     }
    
//     // STEP 3: Try each available courier
//     console.log("\n📦 STEP 3: Trying couriers...");
    
//     let shipmentResult = null;
//     let failedAttempts = [];
    
//     for (const courier of availableCouriers) {
//       try {
//         console.log(`   Trying: ${courier.courier_name} (ID: ${courier.courier_id}) - ₹${courier.shipping_charge}`);
        
//         const orderWithCourier = {
//           ...order,
//           courierId: courier.courier_id
//         };
        
//         const result = await createShipment(orderWithCourier, warehouseId);
        
//         if (result.status === true && result.apiorderid > 0) {
//           console.log(`   ✅ SUCCESS with ${courier.courier_name}!`);
//           console.log(`   API Order ID: ${result.apiorderid}`);
//           console.log(`   Waybill: ${result.waybill}`);
          
//           shipmentResult = {
//             ...result,
//             usedCourier: {
//               id: courier.courier_id,
//               name: courier.courier_name,
//               charge: courier.shipping_charge,
//               expectedDelivery: courier.expectedDeliveryDate
//             }
//           };
//           break;
//         } else {
//           console.log(`   ❌ Failed: ${result.response || "Unknown error"}`);
//           failedAttempts.push({
//             courierId: courier.courier_id,
//             courierName: courier.courier_name,
//             error: result.response || "Unknown error"
//           });
//         }
//       } catch (error) {
//         console.log(`   ❌ Error: ${error.message}`);
//         failedAttempts.push({
//           courierId: courier.courier_id,
//           courierName: courier.courier_name,
//           error: error.message
//         });
//       }
//     }
    
//     if (!shipmentResult) {
//       console.log("\n❌ All couriers failed!");
      
//       return res.status(400).json({
//         success: false,
//         message: "All couriers failed for this route",
//         data: {
//           serviceable: true,
//           pincode: customerPincode,
//           failedAttempts: failedAttempts,
//           availableCouriers: availableCouriers.map(c => ({
//             id: c.courier_id,
//             name: c.courier_name,
//             charge: c.shipping_charge
//           }))
//         }
//       });
//     }
    
//     // STEP 4: Update order in database with shipping info
//     console.log("\n📝 STEP 4: Updating order in database...");
    
//     try {
//       const updatedOrder = await Order.findOneAndUpdate(
//         { orderNumber: order.orderNumber },
//         {
//           $set: {
//             shipmentCreated: true,
//             'shipment.waybill': shipmentResult.waybill,
//             'shipment.courier': shipmentResult.usedCourier?.name,
//             'shipment.status': 'Booked',
//             'shipment.lastUpdated': new Date(),
//             'shipment.labelUrl': shipmentResult.labelurl || '',
//             deliveryCharge: shipmentResult.usedCourier?.charge,
//             deliveryPartner: shipmentResult.usedCourier?.id
//           }
//         },
//         { new: true }
//       );
      
//       if (updatedOrder) {
//         console.log(`✅ Updated order ${order.orderNumber} with shipping info`);
//       } else {
//         console.log(`⚠️ Order ${order.orderNumber} not found in database`);
//       }
//     } catch (dbError) {
//       console.error("Database update error:", dbError);
//       // Continue even if DB update fails - shipment is already created
//     }
    
//     console.log("\n✅ Shipment created successfully!");
//     console.log(`   Courier: ${shipmentResult.usedCourier.name}`);
//     console.log(`   Charge: ₹${shipmentResult.usedCourier.charge}`);
//     console.log(`   API Order ID: ${shipmentResult.apiorderid}`);
//     console.log(`   Waybill: ${shipmentResult.waybill}`);
    
//     res.status(200).json({
//       success: true,
//       data: {
//         shipment: shipmentResult,
//         serviceability: {
//           checked: true,
//           serviceable: true,
//           sourcePincode: warehousePincode,
//           destinationPincode: customerPincode,
//           zone: serviceability.zone,
//           pickupAvailable: serviceability.pickup === "Yes",
//           deliveryAvailable: serviceability.delivery === "Yes",
//           codAvailable: serviceability.cod === "Yes"
//         },
//         courier: {
//           used: shipmentResult.usedCourier,
//           available: availableCouriers.map(c => ({
//             id: c.courier_id,
//             name: c.courier_name,
//             charge: c.shipping_charge,
//             expectedDelivery: c.expectedDeliveryDate
//           }))
//         }
//       },
//       message: `Shipment created successfully with ${shipmentResult.usedCourier.name}`
//     });
    
//   } catch (error) {
//     console.error("\n❌ Create shipment controller error:", error);
    
//     if (error.response?.status === 400) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Shipment creation failed - Validation error", 
//         error: error.response.data
//       });
//     }
    
//     res.status(500).json({ 
//       success: false,
//       message: "Shipment creation failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- TRACK BY ORDER NUMBER ----------------------
// export const trackByOrderNumberController = async (req, res) => {
//   try {
//     const { orderNumber } = req.body;
    
//     console.log("=== Track Order Request ===");
//     console.log("Order Number:", orderNumber);
    
//     if (!orderNumber) {
//       return res.status(400).json({
//         success: false,
//         message: "Order number is required"
//       });
//     }
    
//     const order = await Order.findOne({ orderNumber });
    
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found"
//       });
//     }
    
//     console.log("Order found:", order.orderNumber);
//     console.log("Shipment waybill:", order.shipment?.waybill);
    
//     const firstItem = order.items && order.items[0] || {};
    
//     let trackingStatus = null;
//     let currentLocation = 'Processing';
//     let expectedDelivery = 'Pending';
//     let courierName = order.shipment?.courier || order.fship?.courier || 'Not assigned';
//     let currentStatus = order.status;
//     let waybill = order.shipment?.waybill || order.fship?.waybill;
    
//     if (waybill && order.deliveryType === 'courier') {
//       try {
//         const statusResponse = await getShipmentStatus(waybill);
        
//         if (statusResponse.status && statusResponse.summary) {
//           currentLocation = statusResponse.summary.location || 'Shipping Hub';
//           expectedDelivery = statusResponse.summary.lastscanned || 'Pending';
//           courierName = statusResponse.summary.fulfilledby || courierName;
//           currentStatus = statusResponse.summary.status;
//           trackingStatus = statusResponse.summary;
//         }
//       } catch (error) {
//         console.error("Error fetching tracking from fship:", error.message);
//       }
//     }
    
//     let frontendStatus = 'pending';
//     if (currentStatus === 'Delivered') {
//       frontendStatus = 'completed';
//     } else if (currentStatus === 'Out for Delivery' || currentStatus === 'In Transit') {
//       frontendStatus = 'dispatched';
//     } else if (waybill) {
//       frontendStatus = 'printing';
//     } else if (order.status === 'paid') {
//       frontendStatus = 'confirmed';
//     }
    
//     res.status(200).json({
//       success: true,
//       data: {
//         orderId: order.orderNumber,
//         status: frontendStatus,
//         createdAt: order.createdAt.toLocaleString(),
//         estimatedReady: expectedDelivery,
//         items: {
//           pages: firstItem.pages || 0,
//           copies: firstItem.copies || 0,
//           paperSize: firstItem.paperSize || 'A4',
//           printColor: firstItem.printColor === 'color' ? 'Color' : 'B&W',
//           bindingType: firstItem.bindingType || 'Perfect Glue'
//         },
//         amount: order.finalAmount || order.totalAmount,
//         orderWeight: order.orderWeight || 0,
//         deliveryType: order.deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup',
//         waybill: waybill,
//         courierName: courierName,
//         currentLocation: currentLocation,
//         trackingHistory: []
//       },
//       message: "Order tracked successfully"
//     });
    
//   } catch (error) {
//     console.error("Track by order error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to track order",
//       error: error.message
//     });
//   }
// };

// // ---------------------- SHIP ORDER ----------------------
// export const shipOrderController = async (req, res) => {
//   try {
//     const { apiorderid, courierId } = req.body;
    
//     console.log("=== Ship Order Request ===");
//     console.log("API Order ID:", apiorderid);
//     console.log("Courier ID:", courierId);
    
//     if (!apiorderid) {
//       return res.status(400).json({ 
//         success: false,
//         message: "API Order ID is required",
//         error: "Missing apiorderid"
//       });
//     }
    
//     const result = await shipOrder(apiorderid, courierId);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Order shipped successfully"
//     });
//   } catch (error) {
//     console.error("Ship order error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Ship order failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- GENERATE / PRINT LABEL ----------------------
// export const generateShippingLabelController = async (req, res) => {
//   try {
//     const { waybills } = req.body;
    
//     console.log("=== Generate Shipping Label Request ===");
//     console.log("Waybill(s):", waybills);
    
//     if (!waybills) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Waybill(s) required",
//         error: "Missing waybills"
//       });
//     }
    
//     const result = await generateShippingLabel(waybills);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Shipping label generated successfully"
//     });
//   } catch (error) {
//     console.error("Generate shipping label error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Generate shipping label failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- REGISTER PICKUP ----------------------
// export const registerPickupController = async (req, res) => {
//   try {
//     const { waybills } = req.body;
    
//     console.log("=== Register Pickup Request ===");
//     console.log("Waybill(s):", waybills);
    
//     if (!waybills) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Waybill(s) required for pickup",
//         error: "Missing waybills"
//       });
//     }
    
//     const result = await registerPickup(waybills);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Pickup registered successfully"
//     });
//   } catch (error) {
//     console.error("Register pickup error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Register pickup failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- SHIPMENT CURRENT STATUS ----------------------
// export const getShipmentStatusController = async (req, res) => {
//   try {
//     const { waybill } = req.body;
    
//     console.log("=== Get Shipment Status Request ===");
//     console.log("Waybill:", waybill);
    
//     if (!waybill) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Waybill required",
//         error: "Missing waybill"
//       });
//     }
    
//     const result = await getShipmentStatus(waybill);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Shipment status fetched successfully"
//     });
//   } catch (error) {
//     console.error("Get shipment status error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Fetch shipment status failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- TRACKING HISTORY ----------------------
// export const getTrackingHistoryController = async (req, res) => {
//   try {
//     const { waybill } = req.body;
    
//     console.log("=== Get Tracking History Request ===");
//     console.log("Waybill:", waybill);
    
//     if (!waybill) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Waybill required",
//         error: "Missing waybill"
//       });
//     }
    
//     const result = await getTrackingHistory(waybill);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Tracking history fetched successfully"
//     });
//   } catch (error) {
//     console.error("Get tracking history error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Fetch tracking history failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- CANCEL SHIPMENT ----------------------
// export const cancelShipmentController = async (req, res) => {
//   try {
//     const { waybill, reason } = req.body;
    
//     console.log("=== Cancel Shipment Request ===");
//     console.log("Waybill:", waybill);
//     console.log("Reason:", reason);
    
//     if (!waybill) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Waybill required to cancel shipment",
//         error: "Missing waybill"
//       });
//     }
    
//     const result = await cancelShipment(waybill, reason);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Shipment cancelled successfully"
//     });
//   } catch (error) {
//     console.error("Cancel shipment error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Cancel shipment failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- RATE CALCULATOR ----------------------
// export const calculateRateController = async (req, res) => {
//   try {
//     const payload = req.body;
    
//     console.log("=== Calculate Rate Request ===");
//     console.log("Payload:", payload);
    
//     const result = await calculateRate(payload);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Rate calculated successfully"
//     });
//   } catch (error) {
//     console.error("Rate calculation error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Rate calculation failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- PINCODE SERVICEABILITY ----------------------
// export const checkPincodeServiceabilityController = async (req, res) => {
//   try {
//     const { source_Pincode, destination_Pincode } = req.body;
    
//     console.log("=== Check Pincode Serviceability Request ===");
//     console.log("Source Pincode:", source_Pincode);
//     console.log("Destination Pincode:", destination_Pincode);
    
//     if (!source_Pincode || !destination_Pincode) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Source and destination pincodes required",
//         error: "Missing pincodes"
//       });
//     }
    
//     const result = await checkPincodeServiceability(source_Pincode, destination_Pincode);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Pincode serviceability checked successfully"
//     });
//   } catch (error) {
//     console.error("Pincode serviceability error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Pincode serviceability check failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- RE-ATTEMPT ORDER ----------------------
// export const reattemptOrderController = async (req, res) => {
//   try {
//     const payload = req.body;
    
//     console.log("=== Re-attempt Order Request ===");
//     console.log("Payload:", payload);
    
//     if (!payload.apiorderid || !payload.action) {
//       return res.status(400).json({ 
//         success: false,
//         message: "apiorderid and action are required",
//         error: "Missing required fields"
//       });
//     }
    
//     const result = await reattemptOrder(payload);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Order re-attempt successful"
//     });
//   } catch (error) {
//     console.error("Re-attempt order error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Re-attempt order failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- HELPER FUNCTION ----------------------
// export const createShipmentWithServiceabilityCheck = async (order, warehouseId) => {
//   const warehousePincode = order.warehousePincode || "305001";
//   const customerPincode = order.customer.pincode;
  
//   const serviceability = await checkPincodeServiceability(warehousePincode, customerPincode);
  
//   if (!serviceability.status || serviceability.delivery !== "Yes") {
//     throw new Error(`Delivery not available to ${customerPincode}`);
//   }
  
//   const rates = await calculateRate({
//     source_Pincode: warehousePincode,
//     destination_Pincode: customerPincode,
//     payment_Mode: order.paymentMode === 2 ? "C" : "P",
//     amount: order.totalAmount,
//     express_Type: order.expressType || "surface",
//     shipment_Weight: order.weight || 0.5,
//     shipment_Length: 10,
//     shipment_Width: 10,
//     shipment_Height: 10,
//     volumetric_Weight: 0
//   });
  
//   let availableCouriers = [];
  
//   if (rates.status && rates.shipment_rates) {
//     availableCouriers = rates.shipment_rates;
//     availableCouriers.sort((a, b) => a.shipping_charge - b.shipping_charge);
//   }
  
//   let shipmentResult = null;
  
//   for (const courier of availableCouriers) {
//     try {
//       const orderWithCourier = {
//         ...order,
//         courierId: courier.courier_id
//       };
      
//       const result = await createShipment(orderWithCourier, warehouseId);
      
//       if (result.status === true && result.apiorderid > 0) {
//         shipmentResult = {
//           ...result,
//           usedCourier: {
//             id: courier.courier_id,
//             name: courier.courier_name,
//             charge: courier.shipping_charge,
//             expectedDelivery: courier.expectedDeliveryDate
//           }
//         };
//         break;
//       }
//     } catch (error) {
//       console.error(`Courier ${courier.courier_name} failed:`, error.message);
//     }
//   }
  
//   if (!shipmentResult) {
//     throw new Error("All couriers failed for this route");
//   }
  
//   return {
//     shipment: shipmentResult,
//     serviceability: {
//       checked: true,
//       serviceable: true,
//       sourcePincode: warehousePincode,
//       destinationPincode: customerPincode
//     },
//     courier: {
//       used: shipmentResult.usedCourier,
//       available: availableCouriers.map(c => ({
//         id: c.courier_id,
//         name: c.courier_name,
//         charge: c.shipping_charge,
//         expectedDelivery: c.expectedDeliveryDate
//       }))
//     }
//   };
// };


// // controllers/shippingController.js
// import {
//   createWarehouse,
//   createShipment,
//   shipOrder,
//   generateShippingLabel,
//   registerPickup,
//   getShipmentStatus,
//   getTrackingHistory,
   
//   cancelShipment,
//   calculateRate,
//   checkPincodeServiceability,
//   reattemptOrder
// } from "../services/fshipService.js";

// // Helper function to get nearby serviceable pincodes
// const getNearbyPincodes = async (pincode) => {
//   // Common serviceable pincodes for major cities
//   const nearbyPincodes = {
//     "560001": ["560001", "560002", "560025", "560034", "560038", "560017"],
//     "560038": ["560038", "560037", "560075", "560017", "560001"],
//     "400001": ["400001", "400002", "400003", "400004", "400005", "400020"],
//     "400093": ["400093", "400092", "400094", "400095", "400001"],
//     "110001": ["110001", "110002", "110003", "110005", "110006", "110016"],
//     "600001": ["600001", "600002", "600003", "600004", "600005"],
//     "700001": ["700001", "700002", "700003", "700004", "700005"]
//   };
  
//   // Check if we have nearby pincodes for this area
//   for (const [key, pincodes] of Object.entries(nearbyPincodes)) {
//     if (pincode.startsWith(key.substring(0, 3))) {
//       return pincodes.filter(p => p !== pincode);
//     }
//   }
  
//   // Return default suggestions
//   return ["560001", "400001", "110001", "600001", "700001"];
// };

// // ---------------------- WAREHOUSE ----------------------
// export const createWarehouseController = async (req, res) => {
//   try {
//     const { warehouseName, address, city, pincode, email, contactName, phoneNumber } = req.body;
    
//     console.log("=== Create Warehouse Request ===");
//     console.log("Request body:", req.body);
    
//     if (!warehouseName || !address || !city || !pincode || !email || !contactName || !phoneNumber) {
//       return res.status(400).json({ 
//         success: false,
//         message: "All warehouse fields are required",
//         required: ["warehouseName", "address", "city", "pincode", "email", "contactName", "phoneNumber"]
//       });
//     }
    
//     const result = await createWarehouse({ 
//       warehouseName, 
//       address, 
//       city, 
//       pincode, 
//       email, 
//       contactName, 
//       phoneNumber 
//     });
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Warehouse created successfully"
//     });
//   } catch (error) {
//     console.error("Warehouse creation error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Warehouse creation failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- CHECK DELIVERY AVAILABILITY ----------------------
// export const checkDeliveryAvailabilityController = async (req, res) => {
//   try {
//     const { pincode, warehousePincode = "305001", weight = 0.5 } = req.body;
    
//     if (!pincode) {
//       return res.status(400).json({
//         success: false,
//         message: "Pincode is required"
//       });
//     }
    
//     console.log(`\n🔍 Checking delivery availability for pincode: ${pincode}`);
//     console.log(`Warehouse Pincode: ${warehousePincode}`);
    
//     // Check serviceability
//     const serviceability = await checkPincodeServiceability(warehousePincode, pincode);
    
//     console.log("Serviceability Result:", JSON.stringify(serviceability, null, 2));
    
//     if (!serviceability.status || serviceability.delivery !== "Yes") {
//       const nearbyPincodes = await getNearbyPincodes(pincode);
      
//       return res.status(200).json({
//         success: true,
//         data: {
//           serviceable: false,
//           pincode: pincode,
//           message: serviceability.response || "Delivery not available for this pincode",
//           details: {
//             source: serviceability.source,
//             destination: serviceability.destination,
//             pickup: serviceability.pickup,
//             delivery: serviceability.delivery,
//             cod: serviceability.cod
//           },
//           suggestions: {
//             alternativePincodes: nearbyPincodes,
//             message: "Try one of these nearby pincodes or contact support"
//           }
//         }
//       });
//     }
    
//     // Get available couriers and rates
//     const rates = await calculateRate({
//       source_Pincode: warehousePincode,
//       destination_Pincode: pincode,
//       payment_Mode: "P",
//       amount: 0,
//       express_Type: "surface",
//       shipment_Weight: weight,
//       shipment_Length: 10,
//       shipment_Width: 10,
//       shipment_Height: 10,
//       volumetric_Weight: 0
//     });
    
//     let couriers = [];
//     let cheapestCourier = null;
//     let fastestCourier = null;
    
//     if (rates.status && rates.shipment_rates && rates.shipment_rates.length > 0) {
//       couriers = rates.shipment_rates.map(rate => ({
//         courierId: rate.courier_id,
//         courierName: rate.courier_name,
//         shippingCharge: rate.shipping_charge,
//         codCharge: rate.cod_charge,
//         rtoCharge: rate.rto_charge,
//         serviceMode: rate.service_mode,
//         zoneName: rate.zone_name,
//         expectedDelivery: rate.expectedDeliveryDate
//       }));
      
//       // Find cheapest courier
//       cheapestCourier = couriers.reduce((min, rate) => 
//         rate.shippingCharge < min.shippingCharge ? rate : min
//       );
      
//       // Find fastest courier (earliest delivery)
//       fastestCourier = couriers.reduce((fastest, rate) => {
//         if (!fastest) return rate;
//         return new Date(rate.expectedDelivery) < new Date(fastest.expectedDelivery) ? rate : fastest;
//       }, null);
//     }
    
//     res.status(200).json({
//       success: true,
//       data: {
//         serviceable: true,
//         pincode: pincode,
//         message: "Delivery available for this pincode",
//         details: {
//           source: serviceability.source,
//           destination: serviceability.destination,
//           zone: serviceability.zone,
//           pickup: serviceability.pickup,
//           delivery: serviceability.delivery,
//           cod: serviceability.cod
//         },
//         couriers: {
//           total: couriers.length,
//           list: couriers,
//           recommendations: {
//             cheapest: cheapestCourier,
//             fastest: fastestCourier
//           }
//         }
//       },
//       message: "Delivery availability checked successfully"
//     });
    
//   } catch (error) {
//     console.error("Check delivery availability error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to check delivery availability",
//       error: error.message
//     });
//   }
// };

// // controllers/shippingController.js - Replace createShipmentController with this

// export const createShipmentController = async (req, res) => {
//   try {
//     const { order, warehouseId } = req.body;
    
//     console.log("\n" + "=".repeat(60));
//     console.log("🚚 CREATE SHIPMENT WITH SERVICEABILITY CHECK");
//     console.log("=".repeat(60));
//     console.log("Warehouse ID:", warehouseId);
//     console.log("Order Number:", order?.orderNumber);
//     console.log("Customer Pincode:", order?.customer?.pincode);
    
//     // Validate required fields
//     if (!order) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Order data is required"
//       });
//     }
    
//     if (!warehouseId) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Warehouse ID is required"
//       });
//     }
    
//     if (!order.customer) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Customer details are required"
//       });
//     }
    
//     // Validate required customer fields
//     const requiredCustomerFields = ['name', 'phone', 'email', 'address', 'pincode', 'city', 'state'];
//     const missingFields = requiredCustomerFields.filter(field => !order.customer[field]);
    
//     if (missingFields.length > 0) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Missing required customer fields",
//         missingFields: missingFields
//       });
//     }
    
//     // STEP 1: Check Pincode Serviceability
//     const warehousePincode = order.warehousePincode || "305001";
//     const customerPincode = order.customer.pincode;
    
//     console.log("\n🔍 STEP 1: Checking pincode serviceability...");
//     console.log(`   Source: ${warehousePincode} → Destination: ${customerPincode}`);
    
//     const serviceability = await checkPincodeServiceability(warehousePincode, customerPincode);
    
//     if (!serviceability.status || serviceability.delivery !== "Yes") {
//       const nearbyPincodes = await getNearbyPincodes(customerPincode);
      
//       return res.status(400).json({
//         success: false,
//         message: "Delivery not available for this pincode",
//         data: {
//           serviceable: false,
//           pincode: customerPincode,
//           suggestions: { alternativePincodes: nearbyPincodes }
//         }
//       });
//     }
    
//     console.log("✅ Pincode is serviceable!");
    
//     // STEP 2: Get available couriers and EXCLUDE Blue Dart
//     console.log("\n💰 STEP 2: Getting available couriers...");
    
//     const rates = await calculateRate({
//       source_Pincode: warehousePincode,
//       destination_Pincode: customerPincode,
//       payment_Mode: "P",
//       amount: order.totalAmount || 0,
//       express_Type: order.expressType || "surface",
//       shipment_Weight: order.weight || 0.5,
//       shipment_Length: 10,
//       shipment_Width: 10,
//       shipment_Height: 10,
//       volumetric_Weight: 0
//     });
    
//     // CRITICAL: Exclude Blue Dart (courier_id: 1)
//     const EXCLUDED_COURIERS = []; // Blue Dart - causes "Pickup pincode not serviceable"
    
//     let availableCouriers = [];
    
//     if (rates.status && rates.shipment_rates && rates.shipment_rates.length > 0) {
//       // Filter out Blue Dart
//       availableCouriers = rates.shipment_rates.filter(rate => !EXCLUDED_COURIERS.includes(rate.courier_id));
      
//       console.log(`   Total couriers: ${rates.shipment_rates.length}`);
//       console.log(`   Excluded: Blue Dart (ID: 1)`);
//       console.log(`   Available couriers: ${availableCouriers.length}`);
      
//       if (availableCouriers.length === 0) {
//         return res.status(400).json({
//           success: false,
//           message: "No couriers available after excluding Blue Dart"
//         });
//       }
      
//       // Sort by price (cheapest first)
//       availableCouriers.sort((a, b) => a.shipping_charge - b.shipping_charge);
      
//       console.log("   Available couriers (cheapest first):");
//       availableCouriers.slice(0, 5).forEach((c, i) => {
//         console.log(`      ${i + 1}. ${c.courier_name}: ₹${c.shipping_charge} (ID: ${c.courier_id})`);
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "No couriers available for this route"
//       });
//     }
    
//     // STEP 3: Try each available courier (skip Blue Dart)
//     console.log("\n📦 STEP 3: Trying couriers...");
    
//     let shipmentResult = null;
//     let failedAttempts = [];
    
//     for (const courier of availableCouriers) {
//       try {
//         console.log(`   Trying: ${courier.courier_name} (ID: ${courier.courier_id}) - ₹${courier.shipping_charge}`);
        
//         const orderWithCourier = {
//           ...order,
//           courierId: courier.courier_id
//         };
        
//         const result = await createShipment(orderWithCourier, warehouseId);
        
//         if (result.status === true && result.apiorderid > 0) {
//           console.log(`   ✅ SUCCESS with ${courier.courier_name}!`);
//           console.log(`   API Order ID: ${result.apiorderid}`);
//           console.log(`   Waybill: ${result.waybill}`);
          
//           shipmentResult = {
//             ...result,
//             usedCourier: {
//               id: courier.courier_id,
//               name: courier.courier_name,
//               charge: courier.shipping_charge,
//               expectedDelivery: courier.expectedDeliveryDate
//             }
//           };
//           break;
//         } else {
//           console.log(`   ❌ Failed: ${result.response || "Unknown error"}`);
//           failedAttempts.push({
//             courierId: courier.courier_id,
//             courierName: courier.courier_name,
//             error: result.response || "Unknown error"
//           });
//         }
//       } catch (error) {
//         console.log(`   ❌ Error: ${error.message}`);
//         failedAttempts.push({
//           courierId: courier.courier_id,
//           courierName: courier.courier_name,
//           error: error.message
//         });
//       }
//     }
    
//     // If all couriers failed
//     if (!shipmentResult) {
//       console.log("\n❌ All couriers failed!");
      
//       return res.status(400).json({
//         success: false,
//         message: "All couriers failed for this route",
//         data: {
//           serviceable: true,
//           pincode: customerPincode,
//           failedAttempts: failedAttempts,
//           availableCouriers: availableCouriers.map(c => ({
//             id: c.courier_id,
//             name: c.courier_name,
//             charge: c.shipping_charge
//           }))
//         }
//       });
//     }
    
//     // STEP 4: Return success
//     console.log("\n✅ Shipment created successfully!");
//     console.log(`   Courier: ${shipmentResult.usedCourier.name}`);
//     console.log(`   Charge: ₹${shipmentResult.usedCourier.charge}`);
//     console.log(`   API Order ID: ${shipmentResult.apiorderid}`);
//     console.log(`   Waybill: ${shipmentResult.waybill}`);
    
//     res.status(200).json({
//       success: true,
//       data: {
//         shipment: shipmentResult,
//         serviceability: {
//           checked: true,
//           serviceable: true,
//           sourcePincode: warehousePincode,
//           destinationPincode: customerPincode,
//           zone: serviceability.zone,
//           pickupAvailable: serviceability.pickup === "Yes",
//           deliveryAvailable: serviceability.delivery === "Yes",
//           codAvailable: serviceability.cod === "Yes"
//         },
//         courier: {
//           used: shipmentResult.usedCourier,
//           available: availableCouriers.map(c => ({
//             id: c.courier_id,
//             name: c.courier_name,
//             charge: c.shipping_charge,
//             expectedDelivery: c.expectedDeliveryDate
//           })),
//           excluded: [{
//             id: 1,
//             name: "Blue Dart",
//             reason: "Pickup pincode not serviceable for this route"
//           }]
//         }
//       },
//       message: `Shipment created successfully with ${shipmentResult.usedCourier.name}`
//     });
    
//   } catch (error) {
//     console.error("\n❌ Create shipment controller error:", error);
    
//     if (error.response?.status === 400) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Shipment creation failed - Validation error", 
//         error: error.response.data
//       });
//     }


//     if (result.status === true && result.apiorderid > 0) {
//   // Find and update the order with shipping info
//   await Order.findOneAndUpdate(
//     { orderNumber: order.orderNumber },
//     {
//       $set: {
//         shipmentCreated: true,
//         'shipment.waybill': result.waybill,
//         'shipment.courier': result.usedCourier?.name || cheapestCourier?.courier_name,
//         'shipment.status': 'Booked',
//         'shipment.lastUpdated': new Date(),
//         'shipment.labelUrl': result.labelurl || ''
//       }
//     }
//   );
  
//   console.log(`✅ Updated order ${order.orderNumber} with shipping info`);
// }
    
//     res.status(500).json({ 
//       success: false,
//       message: "Shipment creation failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };





// // controllers/shippingController.js - Add this new endpoint

// export const trackByOrderNumberController = async (req, res) => {
//   try {
//     const { orderNumber } = req.body;
    
//     console.log("=== Track Order Request ===");
//     console.log("Order Number:", orderNumber);
    
//     if (!orderNumber) {
//       return res.status(400).json({
//         success: false,
//         message: "Order number is required"
//       });
//     }
    
//     // Import Order model (make sure path is correct)
//     const Order = await import('../models/Order.js').then(m => m.default);
    
//     // Find order in database
//     const order = await Order.findOne({ orderNumber });
    
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found"
//       });
//     }
    
//     console.log("Order found:", order.orderNumber);
//     console.log("Shipment waybill:", order.shipment?.waybill);
    
//     // Prepare response data
//     const firstItem = order.items && order.items[0] || {};
    
//     let trackingStatus = null;
//     let currentLocation = 'Processing';
//     let expectedDelivery = 'Pending';
//     let courierName = order.shipment?.courier || 'Not assigned';
//     let currentStatus = order.status;
    
//     // If shipment exists and has waybill, fetch live tracking
//     if (order.shipment?.waybill) {
//       try {
//         // Get current status from fship
//         const statusResponse = await getShipmentStatus(order.shipment.waybill);
        
//         if (statusResponse.status && statusResponse.summary) {
//           currentLocation = statusResponse.summary.location || 'Shipping Hub';
//           expectedDelivery = statusResponse.summary.lastscanned || 'Pending';
//           courierName = statusResponse.summary.fulfilledby || order.shipment.courier;
//           currentStatus = statusResponse.summary.status;
//           trackingStatus = statusResponse.summary;
          
//           // Update order with latest tracking info
//           await Order.updateOne(
//             { orderNumber },
//             {
//               $set: {
//                 'shipment.status': currentStatus,
//                 'shipment.lastUpdated': new Date(),
//                 'shipment.trackingData': trackingStatus
//               }
//             }
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching tracking from fship:", error.message);
//       }
//     }
    
//     // Map status for frontend
//     let frontendStatus = 'pending';
//     if (currentStatus === 'Delivered') {
//       frontendStatus = 'completed';
//     } else if (currentStatus === 'Out for Delivery' || currentStatus === 'In Transit') {
//       frontendStatus = 'dispatched';
//     } else if (order.shipment?.waybill) {
//       frontendStatus = 'printing';
//     } else if (order.status === 'paid') {
//       frontendStatus = 'confirmed';
//     }
    
//     res.status(200).json({
//       success: true,
//       data: {
//         orderId: order.orderNumber,
//         status: frontendStatus,
//         createdAt: order.createdAt.toLocaleString(),
//         estimatedReady: expectedDelivery,
//         items: {
//           pages: firstItem.pages || 0,
//           copies: firstItem.copies || 0,
//           paperSize: firstItem.paperSize || 'A4',
//           printColor: firstItem.printColor === 'color' ? 'Color' : 'B&W',
//           bindingType: firstItem.bindingType || 'Perfect Glue'
//         },
//         amount: order.totalAmount,
//         deliveryType: order.deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup',
//         waybill: order.shipment?.waybill || null,
//         courierName: courierName,
//         currentLocation: currentLocation,
//         trackingHistory: []
//       },
//       message: "Order tracked successfully"
//     });
    
//   } catch (error) {
//     console.error("Track by order error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to track order",
//       error: error.message
//     });
//   }
// };

// // ---------------------- SHIP ORDER ----------------------
// export const shipOrderController = async (req, res) => {
//   try {
//     const { apiorderid, courierId } = req.body;
    
//     console.log("=== Ship Order Request ===");
//     console.log("API Order ID:", apiorderid);
//     console.log("Courier ID:", courierId);
    
//     if (!apiorderid) {
//       return res.status(400).json({ 
//         success: false,
//         message: "API Order ID is required",
//         error: "Missing apiorderid"
//       });
//     }
    
//     const result = await shipOrder(apiorderid, courierId);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Order shipped successfully"
//     });
//   } catch (error) {
//     console.error("Ship order error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Ship order failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- GENERATE / PRINT LABEL ----------------------
// export const generateShippingLabelController = async (req, res) => {
//   try {
//     const { waybills } = req.body;
    
//     console.log("=== Generate Shipping Label Request ===");
//     console.log("Waybill(s):", waybills);
    
//     if (!waybills) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Waybill(s) required",
//         error: "Missing waybills"
//       });
//     }
    
//     const result = await generateShippingLabel(waybills);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Shipping label generated successfully"
//     });
//   } catch (error) {
//     console.error("Generate shipping label error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Generate shipping label failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- REGISTER PICKUP ----------------------
// export const registerPickupController = async (req, res) => {
//   try {
//     const { waybills } = req.body;
    
//     console.log("=== Register Pickup Request ===");
//     console.log("Waybill(s):", waybills);
    
//     if (!waybills) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Waybill(s) required for pickup",
//         error: "Missing waybills"
//       });
//     }
    
//     const result = await registerPickup(waybills);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Pickup registered successfully"
//     });
//   } catch (error) {
//     console.error("Register pickup error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Register pickup failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- SHIPMENT CURRENT STATUS ----------------------
// export const getShipmentStatusController = async (req, res) => {
//   try {
//     const { waybill } = req.body;
    
//     console.log("=== Get Shipment Status Request ===");
//     console.log("Waybill:", waybill);
    
//     if (!waybill) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Waybill required",
//         error: "Missing waybill"
//       });
//     }
    
//     const result = await getShipmentStatus(waybill);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Shipment status fetched successfully"
//     });
//   } catch (error) {
//     console.error("Get shipment status error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Fetch shipment status failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- TRACKING HISTORY ----------------------
// export const getTrackingHistoryController = async (req, res) => {
//   try {
//     const { waybill } = req.body;
    
//     console.log("=== Get Tracking History Request ===");
//     console.log("Waybill:", waybill);
    
//     if (!waybill) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Waybill required",
//         error: "Missing waybill"
//       });
//     }
    
//     const result = await getTrackingHistory(waybill);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Tracking history fetched successfully"
//     });
//   } catch (error) {
//     console.error("Get tracking history error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Fetch tracking history failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- CANCEL SHIPMENT ----------------------
// export const cancelShipmentController = async (req, res) => {
//   try {
//     const { waybill, reason } = req.body;
    
//     console.log("=== Cancel Shipment Request ===");
//     console.log("Waybill:", waybill);
//     console.log("Reason:", reason);
    
//     if (!waybill) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Waybill required to cancel shipment",
//         error: "Missing waybill"
//       });
//     }
    
//     const result = await cancelShipment(waybill, reason);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Shipment cancelled successfully"
//     });
//   } catch (error) {
//     console.error("Cancel shipment error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Cancel shipment failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- RATE CALCULATOR ----------------------
// export const calculateRateController = async (req, res) => {
//   try {
//     const payload = req.body;
    
//     console.log("=== Calculate Rate Request ===");
//     console.log("Payload:", payload);
    
//     const result = await calculateRate(payload);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Rate calculated successfully"
//     });
//   } catch (error) {
//     console.error("Rate calculation error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Rate calculation failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- PINCODE SERVICEABILITY ----------------------
// export const checkPincodeServiceabilityController = async (req, res) => {
//   try {
//     const { source_Pincode, destination_Pincode } = req.body;
    
//     console.log("=== Check Pincode Serviceability Request ===");
//     console.log("Source Pincode:", source_Pincode);
//     console.log("Destination Pincode:", destination_Pincode);
    
//     if (!source_Pincode || !destination_Pincode) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Source and destination pincodes required",
//         error: "Missing pincodes"
//       });
//     }
    
//     const result = await checkPincodeServiceability(source_Pincode, destination_Pincode);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Pincode serviceability checked successfully"
//     });
//   } catch (error) {
//     console.error("Pincode serviceability error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Pincode serviceability check failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- RE-ATTEMPT ORDER ----------------------
// export const reattemptOrderController = async (req, res) => {
//   try {
//     const payload = req.body;
    
//     console.log("=== Re-attempt Order Request ===");
//     console.log("Payload:", payload);
    
//     if (!payload.apiorderid || !payload.action) {
//       return res.status(400).json({ 
//         success: false,
//         message: "apiorderid and action are required",
//         error: "Missing required fields"
//       });
//     }
    
//     const result = await reattemptOrder(payload);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Order re-attempt successful"
//     });
//   } catch (error) {
//     console.error("Re-attempt order error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Re-attempt order failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };


// // Helper function to create shipment with serviceability check
// export const createShipmentWithServiceabilityCheck = async (order, warehouseId) => {
//   const warehousePincode = order.warehousePincode || "305001";
//   const customerPincode = order.customer.pincode;
  
//   // Step 1: Check serviceability
//   const serviceability = await checkPincodeServiceability(warehousePincode, customerPincode);
  
//   if (!serviceability.status || serviceability.delivery !== "Yes") {
//     throw new Error(`Delivery not available to ${customerPincode}`);
//   }
  
//   // Step 2: Get rates (exclude Blue Dart)
//   const rates = await calculateRate({
//     source_Pincode: warehousePincode,
//     destination_Pincode: customerPincode,
//     payment_Mode: order.paymentMode === 2 ? "C" : "P",
//     amount: order.totalAmount,
//     express_Type: order.expressType || "surface",
//     shipment_Weight: order.weight || 0.5,
//     shipment_Length: 10,
//     shipment_Width: 10,
//     shipment_Height: 10,
//     volumetric_Weight: 0
//   });
  
//   // Filter out Blue Dart (ID: 1)
//   const EXCLUDED_COURIERS = [1];
//   let availableCouriers = [];
  
//   if (rates.status && rates.shipment_rates) {
//     availableCouriers = rates.shipment_rates.filter(r => !EXCLUDED_COURIERS.includes(r.courier_id));
//     availableCouriers.sort((a, b) => a.shipping_charge - b.shipping_charge);
//   }
  
//   // Step 3: Try couriers
//   let shipmentResult = null;
  
//   for (const courier of availableCouriers) {
//     try {
//       const orderWithCourier = {
//         ...order,
//         courierId: courier.courier_id
//       };
      
//       const result = await createShipment(orderWithCourier, warehouseId);
      
//       if (result.status === true && result.apiorderid > 0) {
//         shipmentResult = {
//           ...result,
//           usedCourier: {
//             id: courier.courier_id,
//             name: courier.courier_name,
//             charge: courier.shipping_charge,
//             expectedDelivery: courier.expectedDeliveryDate
//           }
//         };
//         break;
//       }
//     } catch (error) {
//       console.error(`Courier ${courier.courier_name} failed:`, error.message);
//     }
//   }
  
//   if (!shipmentResult) {
//     throw new Error("All couriers failed for this route");
//   }
  
//   return {
//     shipment: shipmentResult,
//     serviceability: {
//       checked: true,
//       serviceable: true,
//       sourcePincode: warehousePincode,
//       destinationPincode: customerPincode
//     },
//     courier: {
//       used: shipmentResult.usedCourier,
//       available: availableCouriers.map(c => ({
//         id: c.courier_id,
//         name: c.courier_name,
//         charge: c.shipping_charge,
//         expectedDelivery: c.expectedDeliveryDate
//       }))
//     }
//   };
// };







// // controllers/shippingController.js
// import {
//   createWarehouse,
//   createShipment,
//   shipOrder,
//   generateShippingLabel,
//   registerPickup,
//   getShipmentStatus,
//   getTrackingHistory,
   
//   cancelShipment,
//   calculateRate,
//   checkPincodeServiceability,
//   reattemptOrder
// } from "../services/fshipService.js";

// // Helper function to get nearby serviceable pincodes
// const getNearbyPincodes = async (pincode) => {
//   // Common serviceable pincodes for major cities
//   const nearbyPincodes = {
//     "560001": ["560001", "560002", "560025", "560034", "560038", "560017"],
//     "560038": ["560038", "560037", "560075", "560017", "560001"],
//     "400001": ["400001", "400002", "400003", "400004", "400005", "400020"],
//     "400093": ["400093", "400092", "400094", "400095", "400001"],
//     "110001": ["110001", "110002", "110003", "110005", "110006", "110016"],
//     "600001": ["600001", "600002", "600003", "600004", "600005"],
//     "700001": ["700001", "700002", "700003", "700004", "700005"]
//   };
  
//   // Check if we have nearby pincodes for this area
//   for (const [key, pincodes] of Object.entries(nearbyPincodes)) {
//     if (pincode.startsWith(key.substring(0, 3))) {
//       return pincodes.filter(p => p !== pincode);
//     }
//   }
  
//   // Return default suggestions
//   return ["560001", "400001", "110001", "600001", "700001"];
// };

// // ---------------------- WAREHOUSE ----------------------
// export const createWarehouseController = async (req, res) => {
//   try {
//     const { warehouseName, address, city, pincode, email, contactName, phoneNumber } = req.body;
    
//     console.log("=== Create Warehouse Request ===");
//     console.log("Request body:", req.body);
    
//     if (!warehouseName || !address || !city || !pincode || !email || !contactName || !phoneNumber) {
//       return res.status(400).json({ 
//         success: false,
//         message: "All warehouse fields are required",
//         required: ["warehouseName", "address", "city", "pincode", "email", "contactName", "phoneNumber"]
//       });
//     }
    
//     const result = await createWarehouse({ 
//       warehouseName, 
//       address, 
//       city, 
//       pincode, 
//       email, 
//       contactName, 
//       phoneNumber 
//     });
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Warehouse created successfully"
//     });
//   } catch (error) {
//     console.error("Warehouse creation error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Warehouse creation failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- CHECK DELIVERY AVAILABILITY ----------------------
// export const checkDeliveryAvailabilityController = async (req, res) => {
//   try {
//     const { pincode, warehousePincode = "305001", weight = 0.5 } = req.body;
    
//     if (!pincode) {
//       return res.status(400).json({
//         success: false,
//         message: "Pincode is required"
//       });
//     }
    
//     console.log(`\n🔍 Checking delivery availability for pincode: ${pincode}`);
//     console.log(`Warehouse Pincode: ${warehousePincode}`);
    
//     // Check serviceability
//     const serviceability = await checkPincodeServiceability(warehousePincode, pincode);
    
//     console.log("Serviceability Result:", JSON.stringify(serviceability, null, 2));
    
//     if (!serviceability.status || serviceability.delivery !== "Yes") {
//       const nearbyPincodes = await getNearbyPincodes(pincode);
      
//       return res.status(200).json({
//         success: true,
//         data: {
//           serviceable: false,
//           pincode: pincode,
//           message: serviceability.response || "Delivery not available for this pincode",
//           details: {
//             source: serviceability.source,
//             destination: serviceability.destination,
//             pickup: serviceability.pickup,
//             delivery: serviceability.delivery,
//             cod: serviceability.cod
//           },
//           suggestions: {
//             alternativePincodes: nearbyPincodes,
//             message: "Try one of these nearby pincodes or contact support"
//           }
//         }
//       });
//     }
    
//     // Get available couriers and rates
//     const rates = await calculateRate({
//       source_Pincode: warehousePincode,
//       destination_Pincode: pincode,
//       payment_Mode: "P",
//       amount: 0,
//       express_Type: "surface",
//       shipment_Weight: weight,
//       shipment_Length: 10,
//       shipment_Width: 10,
//       shipment_Height: 10,
//       volumetric_Weight: 0
//     });
    
//     let couriers = [];
//     let cheapestCourier = null;
//     let fastestCourier = null;
    
//     if (rates.status && rates.shipment_rates && rates.shipment_rates.length > 0) {
//       couriers = rates.shipment_rates.map(rate => ({
//         courierId: rate.courier_id,
//         courierName: rate.courier_name,
//         shippingCharge: rate.shipping_charge,
//         codCharge: rate.cod_charge,
//         rtoCharge: rate.rto_charge,
//         serviceMode: rate.service_mode,
//         zoneName: rate.zone_name,
//         expectedDelivery: rate.expectedDeliveryDate
//       }));
      
//       // Find cheapest courier
//       cheapestCourier = couriers.reduce((min, rate) => 
//         rate.shippingCharge < min.shippingCharge ? rate : min
//       );
      
//       // Find fastest courier (earliest delivery)
//       fastestCourier = couriers.reduce((fastest, rate) => {
//         if (!fastest) return rate;
//         return new Date(rate.expectedDelivery) < new Date(fastest.expectedDelivery) ? rate : fastest;
//       }, null);
//     }
    
//     res.status(200).json({
//       success: true,
//       data: {
//         serviceable: true,
//         pincode: pincode,
//         message: "Delivery available for this pincode",
//         details: {
//           source: serviceability.source,
//           destination: serviceability.destination,
//           zone: serviceability.zone,
//           pickup: serviceability.pickup,
//           delivery: serviceability.delivery,
//           cod: serviceability.cod
//         },
//         couriers: {
//           total: couriers.length,
//           list: couriers,
//           recommendations: {
//             cheapest: cheapestCourier,
//             fastest: fastestCourier
//           }
//         }
//       },
//       message: "Delivery availability checked successfully"
//     });
    
//   } catch (error) {
//     console.error("Check delivery availability error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to check delivery availability",
//       error: error.message
//     });
//   }
// };

// // controllers/shippingController.js - Replace createShipmentController with this

// export const createShipmentController = async (req, res) => {
//   try {
//     const { order, warehouseId } = req.body;
    
//     console.log("\n" + "=".repeat(60));
//     console.log("🚚 CREATE SHIPMENT WITH SERVICEABILITY CHECK");
//     console.log("=".repeat(60));
//     console.log("Warehouse ID:", warehouseId);
//     console.log("Order Number:", order?.orderNumber);
//     console.log("Customer Pincode:", order?.customer?.pincode);
    
//     // Validate required fields
//     if (!order) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Order data is required"
//       });
//     }
    
//     if (!warehouseId) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Warehouse ID is required"
//       });
//     }
    
//     if (!order.customer) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Customer details are required"
//       });
//     }
    
//     // Validate required customer fields
//     const requiredCustomerFields = ['name', 'phone', 'email', 'address', 'pincode', 'city', 'state'];
//     const missingFields = requiredCustomerFields.filter(field => !order.customer[field]);
    
//     if (missingFields.length > 0) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Missing required customer fields",
//         missingFields: missingFields
//       });
//     }
    
//     // STEP 1: Check Pincode Serviceability
//     const warehousePincode = order.warehousePincode || "305001";
//     const customerPincode = order.customer.pincode;
    
//     console.log("\n🔍 STEP 1: Checking pincode serviceability...");
//     console.log(`   Source: ${warehousePincode} → Destination: ${customerPincode}`);
    
//     const serviceability = await checkPincodeServiceability(warehousePincode, customerPincode);
    
//     if (!serviceability.status || serviceability.delivery !== "Yes") {
//       const nearbyPincodes = await getNearbyPincodes(customerPincode);
      
//       return res.status(400).json({
//         success: false,
//         message: "Delivery not available for this pincode",
//         data: {
//           serviceable: false,
//           pincode: customerPincode,
//           suggestions: { alternativePincodes: nearbyPincodes }
//         }
//       });
//     }
    
//     console.log("✅ Pincode is serviceable!");
    
//     // STEP 2: Get available couriers and EXCLUDE Blue Dart
//     console.log("\n💰 STEP 2: Getting available couriers...");
    
//     const rates = await calculateRate({
//       source_Pincode: warehousePincode,
//       destination_Pincode: customerPincode,
//       payment_Mode: "P",
//       amount: order.totalAmount || 0,
//       express_Type: order.expressType || "surface",
//       shipment_Weight: order.weight || 0.5,
//       shipment_Length: 10,
//       shipment_Width: 10,
//       shipment_Height: 10,
//       volumetric_Weight: 0
//     });
    
//     // CRITICAL: Exclude Blue Dart (courier_id: 1)
//     const EXCLUDED_COURIERS = []; // Blue Dart - causes "Pickup pincode not serviceable"
    
//     let availableCouriers = [];
    
//     if (rates.status && rates.shipment_rates && rates.shipment_rates.length > 0) {
//       // Filter out Blue Dart
//       availableCouriers = rates.shipment_rates.filter(rate => !EXCLUDED_COURIERS.includes(rate.courier_id));
      
//       console.log(`   Total couriers: ${rates.shipment_rates.length}`);
//       console.log(`   Excluded: Blue Dart (ID: 1)`);
//       console.log(`   Available couriers: ${availableCouriers.length}`);
      
//       if (availableCouriers.length === 0) {
//         return res.status(400).json({
//           success: false,
//           message: "No couriers available after excluding Blue Dart"
//         });
//       }
      
//       // Sort by price (cheapest first)
//       availableCouriers.sort((a, b) => a.shipping_charge - b.shipping_charge);
      
//       console.log("   Available couriers (cheapest first):");
//       availableCouriers.slice(0, 5).forEach((c, i) => {
//         console.log(`      ${i + 1}. ${c.courier_name}: ₹${c.shipping_charge} (ID: ${c.courier_id})`);
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "No couriers available for this route"
//       });
//     }
    
//     // STEP 3: Try each available courier (skip Blue Dart)
//     console.log("\n📦 STEP 3: Trying couriers...");
    
//     let shipmentResult = null;
//     let failedAttempts = [];
    
//     for (const courier of availableCouriers) {
//       try {
//         console.log(`   Trying: ${courier.courier_name} (ID: ${courier.courier_id}) - ₹${courier.shipping_charge}`);
        
//         const orderWithCourier = {
//           ...order,
//           courierId: courier.courier_id
//         };
        
//         const result = await createShipment(orderWithCourier, warehouseId);
        
//         if (result.status === true && result.apiorderid > 0) {
//           console.log(`   ✅ SUCCESS with ${courier.courier_name}!`);
//           console.log(`   API Order ID: ${result.apiorderid}`);
//           console.log(`   Waybill: ${result.waybill}`);
          
//           shipmentResult = {
//             ...result,
//             usedCourier: {
//               id: courier.courier_id,
//               name: courier.courier_name,
//               charge: courier.shipping_charge,
//               expectedDelivery: courier.expectedDeliveryDate
//             }
//           };
//           break;
//         } else {
//           console.log(`   ❌ Failed: ${result.response || "Unknown error"}`);
//           failedAttempts.push({
//             courierId: courier.courier_id,
//             courierName: courier.courier_name,
//             error: result.response || "Unknown error"
//           });
//         }
//       } catch (error) {
//         console.log(`   ❌ Error: ${error.message}`);
//         failedAttempts.push({
//           courierId: courier.courier_id,
//           courierName: courier.courier_name,
//           error: error.message
//         });
//       }
//     }
    
//     // If all couriers failed
//     if (!shipmentResult) {
//       console.log("\n❌ All couriers failed!");
      
//       return res.status(400).json({
//         success: false,
//         message: "All couriers failed for this route",
//         data: {
//           serviceable: true,
//           pincode: customerPincode,
//           failedAttempts: failedAttempts,
//           availableCouriers: availableCouriers.map(c => ({
//             id: c.courier_id,
//             name: c.courier_name,
//             charge: c.shipping_charge
//           }))
//         }
//       });
//     }
    
//     // STEP 4: Return success
//     console.log("\n✅ Shipment created successfully!");
//     console.log(`   Courier: ${shipmentResult.usedCourier.name}`);
//     console.log(`   Charge: ₹${shipmentResult.usedCourier.charge}`);
//     console.log(`   API Order ID: ${shipmentResult.apiorderid}`);
//     console.log(`   Waybill: ${shipmentResult.waybill}`);
    
//     res.status(200).json({
//       success: true,
//       data: {
//         shipment: shipmentResult,
//         serviceability: {
//           checked: true,
//           serviceable: true,
//           sourcePincode: warehousePincode,
//           destinationPincode: customerPincode,
//           zone: serviceability.zone,
//           pickupAvailable: serviceability.pickup === "Yes",
//           deliveryAvailable: serviceability.delivery === "Yes",
//           codAvailable: serviceability.cod === "Yes"
//         },
//         courier: {
//           used: shipmentResult.usedCourier,
//           available: availableCouriers.map(c => ({
//             id: c.courier_id,
//             name: c.courier_name,
//             charge: c.shipping_charge,
//             expectedDelivery: c.expectedDeliveryDate
//           })),
//           excluded: [{
//             id: 1,
//             name: "Blue Dart",
//             reason: "Pickup pincode not serviceable for this route"
//           }]
//         }
//       },
//       message: `Shipment created successfully with ${shipmentResult.usedCourier.name}`
//     });
    
//   } catch (error) {
//     console.error("\n❌ Create shipment controller error:", error);
    
//     if (error.response?.status === 400) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Shipment creation failed - Validation error", 
//         error: error.response.data
//       });
//     }


//     if (result.status === true && result.apiorderid > 0) {
//   // Find and update the order with shipping info
//   await Order.findOneAndUpdate(
//     { orderNumber: order.orderNumber },
//     {
//       $set: {
//         shipmentCreated: true,
//         'shipment.waybill': result.waybill,
//         'shipment.courier': result.usedCourier?.name || cheapestCourier?.courier_name,
//         'shipment.status': 'Booked',
//         'shipment.lastUpdated': new Date(),
//         'shipment.labelUrl': result.labelurl || ''
//       }
//     }
//   );
  
//   console.log(`✅ Updated order ${order.orderNumber} with shipping info`);
// }
    
//     res.status(500).json({ 
//       success: false,
//       message: "Shipment creation failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };





// // controllers/shippingController.js - Add this new endpoint

// export const trackByOrderNumberController = async (req, res) => {
//   try {
//     const { orderNumber } = req.body;
    
//     console.log("=== Track Order Request ===");
//     console.log("Order Number:", orderNumber);
    
//     if (!orderNumber) {
//       return res.status(400).json({
//         success: false,
//         message: "Order number is required"
//       });
//     }
    
//     // Import Order model (make sure path is correct)
//     const Order = await import('../models/Order.js').then(m => m.default);
    
//     // Find order in database
//     const order = await Order.findOne({ orderNumber });
    
//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found"
//       });
//     }
    
//     console.log("Order found:", order.orderNumber);
//     console.log("Shipment waybill:", order.shipment?.waybill);
    
//     // Prepare response data
//     const firstItem = order.items && order.items[0] || {};
    
//     let trackingStatus = null;
//     let currentLocation = 'Processing';
//     let expectedDelivery = 'Pending';
//     let courierName = order.shipment?.courier || 'Not assigned';
//     let currentStatus = order.status;
    
//     // If shipment exists and has waybill, fetch live tracking
//     if (order.shipment?.waybill) {
//       try {
//         // Get current status from fship
//         const statusResponse = await getShipmentStatus(order.shipment.waybill);
        
//         if (statusResponse.status && statusResponse.summary) {
//           currentLocation = statusResponse.summary.location || 'Shipping Hub';
//           expectedDelivery = statusResponse.summary.lastscanned || 'Pending';
//           courierName = statusResponse.summary.fulfilledby || order.shipment.courier;
//           currentStatus = statusResponse.summary.status;
//           trackingStatus = statusResponse.summary;
          
//           // Update order with latest tracking info
//           await Order.updateOne(
//             { orderNumber },
//             {
//               $set: {
//                 'shipment.status': currentStatus,
//                 'shipment.lastUpdated': new Date(),
//                 'shipment.trackingData': trackingStatus
//               }
//             }
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching tracking from fship:", error.message);
//       }
//     }
    
//     // Map status for frontend
//     let frontendStatus = 'pending';
//     if (currentStatus === 'Delivered') {
//       frontendStatus = 'completed';
//     } else if (currentStatus === 'Out for Delivery' || currentStatus === 'In Transit') {
//       frontendStatus = 'dispatched';
//     } else if (order.shipment?.waybill) {
//       frontendStatus = 'printing';
//     } else if (order.status === 'paid') {
//       frontendStatus = 'confirmed';
//     }
    
//     res.status(200).json({
//       success: true,
//       data: {
//         orderId: order.orderNumber,
//         status: frontendStatus,
//         createdAt: order.createdAt.toLocaleString(),
//         estimatedReady: expectedDelivery,
//         items: {
//           pages: firstItem.pages || 0,
//           copies: firstItem.copies || 0,
//           paperSize: firstItem.paperSize || 'A4',
//           printColor: firstItem.printColor === 'color' ? 'Color' : 'B&W',
//           bindingType: firstItem.bindingType || 'Perfect Glue'
//         },
//         amount: order.totalAmount,
//         deliveryType: order.deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup',
//         waybill: order.shipment?.waybill || null,
//         courierName: courierName,
//         currentLocation: currentLocation,
//         trackingHistory: []
//       },
//       message: "Order tracked successfully"
//     });
    
//   } catch (error) {
//     console.error("Track by order error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to track order",
//       error: error.message
//     });
//   }
// };

// // ---------------------- SHIP ORDER ----------------------
// export const shipOrderController = async (req, res) => {
//   try {
//     const { apiorderid, courierId } = req.body;
    
//     console.log("=== Ship Order Request ===");
//     console.log("API Order ID:", apiorderid);
//     console.log("Courier ID:", courierId);
    
//     if (!apiorderid) {
//       return res.status(400).json({ 
//         success: false,
//         message: "API Order ID is required",
//         error: "Missing apiorderid"
//       });
//     }
    
//     const result = await shipOrder(apiorderid, courierId);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Order shipped successfully"
//     });
//   } catch (error) {
//     console.error("Ship order error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Ship order failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- GENERATE / PRINT LABEL ----------------------
// export const generateShippingLabelController = async (req, res) => {
//   try {
//     const { waybills } = req.body;
    
//     console.log("=== Generate Shipping Label Request ===");
//     console.log("Waybill(s):", waybills);
    
//     if (!waybills) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Waybill(s) required",
//         error: "Missing waybills"
//       });
//     }
    
//     const result = await generateShippingLabel(waybills);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Shipping label generated successfully"
//     });
//   } catch (error) {
//     console.error("Generate shipping label error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Generate shipping label failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- REGISTER PICKUP ----------------------
// export const registerPickupController = async (req, res) => {
//   try {
//     const { waybills } = req.body;
    
//     console.log("=== Register Pickup Request ===");
//     console.log("Waybill(s):", waybills);
    
//     if (!waybills) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Waybill(s) required for pickup",
//         error: "Missing waybills"
//       });
//     }
    
//     const result = await registerPickup(waybills);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Pickup registered successfully"
//     });
//   } catch (error) {
//     console.error("Register pickup error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Register pickup failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- SHIPMENT CURRENT STATUS ----------------------
// export const getShipmentStatusController = async (req, res) => {
//   try {
//     const { waybill } = req.body;
    
//     console.log("=== Get Shipment Status Request ===");
//     console.log("Waybill:", waybill);
    
//     if (!waybill) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Waybill required",
//         error: "Missing waybill"
//       });
//     }
    
//     const result = await getShipmentStatus(waybill);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Shipment status fetched successfully"
//     });
//   } catch (error) {
//     console.error("Get shipment status error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Fetch shipment status failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- TRACKING HISTORY ----------------------
// export const getTrackingHistoryController = async (req, res) => {
//   try {
//     const { waybill } = req.body;
    
//     console.log("=== Get Tracking History Request ===");
//     console.log("Waybill:", waybill);
    
//     if (!waybill) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Waybill required",
//         error: "Missing waybill"
//       });
//     }
    
//     const result = await getTrackingHistory(waybill);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Tracking history fetched successfully"
//     });
//   } catch (error) {
//     console.error("Get tracking history error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Fetch tracking history failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- CANCEL SHIPMENT ----------------------
// export const cancelShipmentController = async (req, res) => {
//   try {
//     const { waybill, reason } = req.body;
    
//     console.log("=== Cancel Shipment Request ===");
//     console.log("Waybill:", waybill);
//     console.log("Reason:", reason);
    
//     if (!waybill) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Waybill required to cancel shipment",
//         error: "Missing waybill"
//       });
//     }
    
//     const result = await cancelShipment(waybill, reason);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Shipment cancelled successfully"
//     });
//   } catch (error) {
//     console.error("Cancel shipment error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Cancel shipment failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- RATE CALCULATOR ----------------------
// export const calculateRateController = async (req, res) => {
//   try {
//     const payload = req.body;
    
//     console.log("=== Calculate Rate Request ===");
//     console.log("Payload:", payload);
    
//     const result = await calculateRate(payload);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Rate calculated successfully"
//     });
//   } catch (error) {
//     console.error("Rate calculation error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Rate calculation failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- PINCODE SERVICEABILITY ----------------------
// export const checkPincodeServiceabilityController = async (req, res) => {
//   try {
//     const { source_Pincode, destination_Pincode } = req.body;
    
//     console.log("=== Check Pincode Serviceability Request ===");
//     console.log("Source Pincode:", source_Pincode);
//     console.log("Destination Pincode:", destination_Pincode);
    
//     if (!source_Pincode || !destination_Pincode) {
//       return res.status(400).json({ 
//         success: false,
//         message: "Source and destination pincodes required",
//         error: "Missing pincodes"
//       });
//     }
    
//     const result = await checkPincodeServiceability(source_Pincode, destination_Pincode);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Pincode serviceability checked successfully"
//     });
//   } catch (error) {
//     console.error("Pincode serviceability error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Pincode serviceability check failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// // ---------------------- RE-ATTEMPT ORDER ----------------------
// export const reattemptOrderController = async (req, res) => {
//   try {
//     const payload = req.body;
    
//     console.log("=== Re-attempt Order Request ===");
//     console.log("Payload:", payload);
    
//     if (!payload.apiorderid || !payload.action) {
//       return res.status(400).json({ 
//         success: false,
//         message: "apiorderid and action are required",
//         error: "Missing required fields"
//       });
//     }
    
//     const result = await reattemptOrder(payload);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Order re-attempt successful"
//     });
//   } catch (error) {
//     console.error("Re-attempt order error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Re-attempt order failed", 
//       error: error.response?.data || error.message 
//     });
//   }
// };


// // Helper function to create shipment with serviceability check
// export const createShipmentWithServiceabilityCheck = async (order, warehouseId) => {
//   const warehousePincode = order.warehousePincode || "305001";
//   const customerPincode = order.customer.pincode;
  
//   // Step 1: Check serviceability
//   const serviceability = await checkPincodeServiceability(warehousePincode, customerPincode);
  
//   if (!serviceability.status || serviceability.delivery !== "Yes") {
//     throw new Error(`Delivery not available to ${customerPincode}`);
//   }
  
//   // Step 2: Get rates (exclude Blue Dart)
//   const rates = await calculateRate({
//     source_Pincode: warehousePincode,
//     destination_Pincode: customerPincode,
//     payment_Mode: order.paymentMode === 2 ? "C" : "P",
//     amount: order.totalAmount,
//     express_Type: order.expressType || "surface",
//     shipment_Weight: order.weight || 0.5,
//     shipment_Length: 10,
//     shipment_Width: 10,
//     shipment_Height: 10,
//     volumetric_Weight: 0
//   });
  
//   // Filter out Blue Dart (ID: 1)
//   const EXCLUDED_COURIERS = [1];
//   let availableCouriers = [];
  
//   if (rates.status && rates.shipment_rates) {
//     availableCouriers = rates.shipment_rates.filter(r => !EXCLUDED_COURIERS.includes(r.courier_id));
//     availableCouriers.sort((a, b) => a.shipping_charge - b.shipping_charge);
//   }
  
//   // Step 3: Try couriers
//   let shipmentResult = null;
  
//   for (const courier of availableCouriers) {
//     try {
//       const orderWithCourier = {
//         ...order,
//         courierId: courier.courier_id
//       };
      
//       const result = await createShipment(orderWithCourier, warehouseId);
      
//       if (result.status === true && result.apiorderid > 0) {
//         shipmentResult = {
//           ...result,
//           usedCourier: {
//             id: courier.courier_id,
//             name: courier.courier_name,
//             charge: courier.shipping_charge,
//             expectedDelivery: courier.expectedDeliveryDate
//           }
//         };
//         break;
//       }
//     } catch (error) {
//       console.error(`Courier ${courier.courier_name} failed:`, error.message);
//     }
//   }
  
//   if (!shipmentResult) {
//     throw new Error("All couriers failed for this route");
//   }
  
//   return {
//     shipment: shipmentResult,
//     serviceability: {
//       checked: true,
//       serviceable: true,
//       sourcePincode: warehousePincode,
//       destinationPincode: customerPincode
//     },
//     courier: {
//       used: shipmentResult.usedCourier,
//       available: availableCouriers.map(c => ({
//         id: c.courier_id,
//         name: c.courier_name,
//         charge: c.shipping_charge,
//         expectedDelivery: c.expectedDeliveryDate
//       }))
//     }
//   };
// };








// // controllers/shippingController.js
// import {
//   createWarehouse,
//   createShipment,
//   shipOrder,
//   generateShippingLabel,
//   registerPickup,
//   getShipmentStatus,
//   getTrackingHistory,
//   cancelShipment,
//   calculateRate,
//   checkPincodeServiceability,
//   reattemptOrder,
 
// } from "../services/fshipService.js";
// import Order from '../models/Order.js';

// // Helper function to get nearby serviceable pincodes
// const getNearbyPincodes = async (pincode) => {
//   const nearbyPincodes = {
//     "560001": ["560001", "560002", "560025", "560034", "560038", "560017"],
//     "560038": ["560038", "560037", "560075", "560017", "560001"],
//     "400001": ["400001", "400002", "400003", "400004", "400005", "400020"],
//     "400093": ["400093", "400092", "400094", "400095", "400001"],
//     "110001": ["110001", "110002", "110003", "110005", "110006", "110016"],
//     "600001": ["600001", "600002", "600003", "600004", "600005"],
//     "700001": ["700001", "700002", "700003", "700004", "700005"]
//   };
  
//   for (const [key, pincodes] of Object.entries(nearbyPincodes)) {
//     if (pincode.startsWith(key.substring(0, 3))) {
//       return pincodes.filter(p => p !== pincode);
//     }
//   }
  
//   return ["560001", "400001", "110001", "600001", "700001"];
// };

// // ---------------------- WAREHOUSE ----------------------
// export const createWarehouseController = async (req, res) => {
//   try {
//     const { warehouseName, address, city, pincode, email, contactName, phoneNumber } = req.body;
    
//     if (!warehouseName || !address || !city || !pincode || !email || !contactName || !phoneNumber) {
//       return res.status(400).json({ 
//         success: false,
//         message: "All warehouse fields are required"
//       });
//     }
    
//     const result = await createWarehouse({ 
//       warehouseName, address, city, pincode, email, contactName, phoneNumber 
//     });
    
//     res.status(200).json({ success: true, data: result, message: "Warehouse created successfully" });
//   } catch (error) {
//     console.error("Warehouse creation error:", error);
//     res.status(500).json({ success: false, message: "Warehouse creation failed", error: error.response?.data || error.message });
//   }
// };

// // ---------------------- CHECK DELIVERY AVAILABILITY ----------------------
// export const checkDeliveryAvailabilityController = async (req, res) => {
//   try {
//     const { pincode, warehousePincode = "305001", weight = 0.5 } = req.body;
    
//     if (!pincode) {
//       return res.status(400).json({ success: false, message: "Pincode is required" });
//     }
    
//     const serviceability = await checkPincodeServiceability(warehousePincode, pincode);
    
//     if (!serviceability.status || serviceability.delivery !== "Yes") {
//       const nearbyPincodes = await getNearbyPincodes(pincode);
//       return res.status(200).json({
//         success: true,
//         data: { serviceable: false, pincode, suggestions: { alternativePincodes: nearbyPincodes } }
//       });
//     }
    
//     const rates = await calculateRate({
//       source_Pincode: warehousePincode,
//       destination_Pincode: pincode,
//       payment_Mode: "P",
//       amount: 0,
//       express_Type: "surface",
//       shipment_Weight: weight,
//       shipment_Length: 10,
//       shipment_Width: 10,
//       shipment_Height: 10,
//       volumetric_Weight: 0
//     });
    
//     let couriers = [];
//     if (rates.status && rates.shipment_rates) {
//       couriers = rates.shipment_rates.map(rate => ({
//         courierId: rate.courier_id,
//         courierName: rate.courier_name,
//         shippingCharge: rate.shipping_charge,
//         expectedDelivery: rate.expectedDeliveryDate
//       }));
//     }
    
//     res.status(200).json({
//       success: true,
//       data: { serviceable: true, pincode, couriers: { list: couriers } }
//     });
    
//   } catch (error) {
//     console.error("Check delivery availability error:", error);
//     res.status(500).json({ success: false, message: "Failed to check delivery availability", error: error.message });
//   }
// };

// // ---------------------- CREATE SHIPMENT ----------------------
// export const createShipmentController = async (req, res) => {
//   try {
//     const { order, warehouseId } = req.body;
    
//     console.log("\n" + "=".repeat(60));
//     console.log("🚚 CREATE SHIPMENT");
//     console.log("=".repeat(60));
//     console.log("Order Number:", order?.orderNumber);
//     console.log("Total Amount:", order?.totalAmount);
//     console.log("Items:", order?.items?.length);
    
//     if (!order || !warehouseId) {
//       return res.status(400).json({ success: false, message: "Order and warehouseId are required" });
//     }
    
//     // Check serviceability
//     const warehousePincode = order.warehousePincode || "305001";
//     const customerPincode = order.customer?.pincode;
    
//     const serviceability = await checkPincodeServiceability(warehousePincode, customerPincode);
    
//     if (!serviceability.status || serviceability.delivery !== "Yes") {
//       return res.status(400).json({ success: false, message: "Delivery not available for this pincode" });
//     }
    
//     // Get rates
//     const rates = await calculateRate({
//       source_Pincode: warehousePincode,
//       destination_Pincode: customerPincode,
//       payment_Mode: "P",
//       amount: order.totalAmount || 0,
//       express_Type: "surface",
//       shipment_Weight: order.orderWeight || 0.5,
//       shipment_Length: 10,
//       shipment_Width: 10,
//       shipment_Height: 10,
//       volumetric_Weight: 0
//     });
    
//     let availableCouriers = [];
//     if (rates.status && rates.shipment_rates) {
//       availableCouriers = rates.shipment_rates;
//       availableCouriers.sort((a, b) => a.shipping_charge - b.shipping_charge);
//     }
    
//     // Try each courier
//     let shipmentResult = null;
    
//     for (const courier of availableCouriers) {
//       try {
//         console.log(`Trying: ${courier.courier_name} - ₹${courier.shipping_charge}`);
        
//         const orderWithCourier = { ...order, courierId: courier.courier_id };
//         const result = await createShipment(orderWithCourier, warehouseId);
        
//         if (result.status === true && result.apiorderid > 0) {
//           shipmentResult = {
//             ...result,
//             usedCourier: {
//               id: courier.courier_id,
//               name: courier.courier_name,
//               charge: courier.shipping_charge,
//               expectedDelivery: courier.expectedDeliveryDate
//             }
//           };
//           break;
//         }
//       } catch (error) {
//         console.error(`Courier ${courier.courier_name} failed:`, error.message);
//       }
//     }
    
//     if (!shipmentResult) {
//       return res.status(400).json({ success: false, message: "All couriers failed for this route" });
//     }
    
//     // Update order in database
//     try {
//       await Order.findOneAndUpdate(
//         { orderNumber: order.orderNumber },
//         {
//           $set: {
//             shipmentCreated: true,
//             'shipment.waybill': shipmentResult.waybill,
//             'shipment.courier': shipmentResult.usedCourier.name,
//             'shipment.status': 'Booked',
//             'shipment.lastUpdated': new Date(),
//             'shipment.labelUrl': shipmentResult.labelurl || '',
//             deliveryCharge: shipmentResult.usedCourier.charge,
//             deliveryPartner: shipmentResult.usedCourier.id
//           }
//         }
//       );
//       console.log(`✅ Updated order ${order.orderNumber} with shipping info`);
//     } catch (dbError) {
//       console.error("Database update error:", dbError);
//     }
    
//     res.status(200).json({
//       success: true,
//       data: { shipment: shipmentResult, courier: { used: shipmentResult.usedCourier } },
//       message: `Shipment created successfully with ${shipmentResult.usedCourier.name}`
//     });
    
//   } catch (error) {
//     console.error("Create shipment error:", error);
//     res.status(500).json({ success: false, message: "Shipment creation failed", error: error.message });
//   }
// };

// // ---------------------- SHIP ORDER ----------------------
// export const shipOrderController = async (req, res) => {
//   try {
//     const { apiorderid, courierId } = req.body;
    
//     if (!apiorderid) {
//       return res.status(400).json({ success: false, message: "API Order ID is required" });
//     }
    
//     const result = await shipOrder(apiorderid, courierId);
//     res.status(200).json({ success: true, data: result, message: "Order shipped successfully" });
//   } catch (error) {
//     console.error("Ship order error:", error);
//     res.status(500).json({ success: false, message: "Ship order failed", error: error.message });
//   }
// };

// // ---------------------- GENERATE SHIPPING LABEL ----------------------
// export const generateShippingLabelController = async (req, res) => {
//   try {
//     const { waybills } = req.body;
    
//     if (!waybills) {
//       return res.status(400).json({ success: false, message: "Waybill(s) required" });
//     }
    
//     const result = await generateShippingLabel(waybills);
//     res.status(200).json({ success: true, data: result, message: "Shipping label generated successfully" });
//   } catch (error) {
//     console.error("Generate shipping label error:", error);
//     res.status(500).json({ success: false, message: "Generate shipping label failed", error: error.message });
//   }
// };

// // ---------------------- REGISTER PICKUP ----------------------
// export const registerPickupController = async (req, res) => {
//   try {
//     const { waybills } = req.body;
    
//     if (!waybills) {
//       return res.status(400).json({ success: false, message: "Waybill(s) required" });
//     }
    
//     const result = await registerPickup(waybills);
//     res.status(200).json({ success: true, data: result, message: "Pickup registered successfully" });
//   } catch (error) {
//     console.error("Register pickup error:", error);
//     res.status(500).json({ success: false, message: "Register pickup failed", error: error.message });
//   }
// };

// // ---------------------- SHIPMENT STATUS ----------------------
// export const getShipmentStatusController = async (req, res) => {
//   try {
//     const { waybill } = req.body;
    
//     if (!waybill) {
//       return res.status(400).json({ success: false, message: "Waybill required" });
//     }
    
//     const result = await getShipmentStatus(waybill);
//     res.status(200).json({ success: true, data: result, message: "Shipment status fetched successfully" });
//   } catch (error) {
//     console.error("Get shipment status error:", error);
//     res.status(500).json({ success: false, message: "Fetch shipment status failed", error: error.message });
//   }
// };

// // ---------------------- TRACKING HISTORY ----------------------
// export const getTrackingHistoryController = async (req, res) => {
//   try {
//     const { waybill } = req.body;
    
//     if (!waybill) {
//       return res.status(400).json({ success: false, message: "Waybill required" });
//     }
    
//     const result = await getTrackingHistory(waybill);
//     res.status(200).json({ success: true, data: result, message: "Tracking history fetched successfully" });
//   } catch (error) {
//     console.error("Get tracking history error:", error);
//     res.status(500).json({ success: false, message: "Fetch tracking history failed", error: error.message });
//   }
// };

// // ---------------------- CANCEL SHIPMENT ----------------------
// export const cancelShipmentController = async (req, res) => {
//   try {
//     const { waybill, reason } = req.body;
    
//     if (!waybill) {
//       return res.status(400).json({ success: false, message: "Waybill required" });
//     }
    
//     const result = await cancelShipment(waybill, reason);
//     res.status(200).json({ success: true, data: result, message: "Shipment cancelled successfully" });
//   } catch (error) {
//     console.error("Cancel shipment error:", error);
//     res.status(500).json({ success: false, message: "Cancel shipment failed", error: error.message });
//   }
// };

// // ---------------------- RATE CALCULATOR ----------------------
// export const calculateRateController = async (req, res) => {
//   try {
//     const result = await calculateRate(req.body);
//     res.status(200).json({ success: true, data: result, message: "Rate calculated successfully" });
//   } catch (error) {
//     console.error("Rate calculation error:", error);
//     res.status(500).json({ success: false, message: "Rate calculation failed", error: error.message });
//   }
// };

// // ---------------------- PINCODE SERVICEABILITY ----------------------
// export const checkPincodeServiceabilityController = async (req, res) => {
//   try {
//     const { source_Pincode, destination_Pincode } = req.body;
    
//     if (!source_Pincode || !destination_Pincode) {
//       return res.status(400).json({ success: false, message: "Source and destination pincodes required" });
//     }
    
//     const result = await checkPincodeServiceability(source_Pincode, destination_Pincode);
//     res.status(200).json({ success: true, data: result, message: "Pincode serviceability checked successfully" });
//   } catch (error) {
//     console.error("Pincode serviceability error:", error);
//     res.status(500).json({ success: false, message: "Pincode serviceability check failed", error: error.message });
//   }
// };

// // ---------------------- RE-ATTEMPT ORDER ----------------------
// export const reattemptOrderController = async (req, res) => {
//   try {
//     const payload = req.body;
    
//     if (!payload.apiorderid || !payload.action) {
//       return res.status(400).json({ success: false, message: "apiorderid and action are required" });
//     }
    
//     const result = await reattemptOrder(payload);
//     res.status(200).json({ success: true, data: result, message: "Order re-attempt successful" });
//   } catch (error) {
//     console.error("Re-attempt order error:", error);
//     res.status(500).json({ success: false, message: "Re-attempt order failed", error: error.message });
//   }
// };

// // ---------------------- TRACK BY ORDER NUMBER ----------------------
// export const trackByOrderNumberController = async (req, res) => {
//   try {
//     const { orderNumber } = req.body;
    
//     if (!orderNumber) {
//       return res.status(400).json({ success: false, message: "Order number is required" });
//     }
    
//     const order = await Order.findOne({ orderNumber });
    
//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }
    
//     const firstItem = order.items?.[0] || {};
//     const waybill = order.shipment?.waybill || order.fship?.waybill;
    
//     res.status(200).json({
//       success: true,
//       data: {
//         orderId: order.orderNumber,
//         status: order.status,
//         createdAt: order.createdAt,
//         amount: order.totalAmount,
//         waybill: waybill,
//         courierName: order.shipment?.courier || order.fship?.courier,
//         items: {
//           pages: firstItem.pages || 0,
//           copies: firstItem.copies || 0
//         }
//       }
//     });
//   } catch (error) {
//     console.error("Track by order error:", error);
//     res.status(500).json({ success: false, message: "Failed to track order", error: error.message });
//   }
// };

// // ---------------------- HELPER FUNCTION ----------------------
// export const createShipmentWithServiceabilityCheck = async (order, warehouseId) => {
//   const warehousePincode = order.warehousePincode || "305001";
//   const customerPincode = order.customer.pincode;
  
//   const serviceability = await checkPincodeServiceability(warehousePincode, customerPincode);
  
//   if (!serviceability.status || serviceability.delivery !== "Yes") {
//     throw new Error(`Delivery not available to ${customerPincode}`);
//   }
  
//   const rates = await calculateRate({
//     source_Pincode: warehousePincode,
//     destination_Pincode: customerPincode,
//     payment_Mode: "P",
//     amount: order.totalAmount,
//     express_Type: "surface",
//     shipment_Weight: order.orderWeight || 0.5,
//     shipment_Length: 10,
//     shipment_Width: 10,
//     shipment_Height: 10,
//     volumetric_Weight: 0
//   });
  
//   let availableCouriers = rates.shipment_rates || [];
//   availableCouriers.sort((a, b) => a.shipping_charge - b.shipping_charge);
  
//   let shipmentResult = null;
  
//   for (const courier of availableCouriers) {
//     try {
//       const orderWithCourier = { ...order, courierId: courier.courier_id };
//       const result = await createShipment(orderWithCourier, warehouseId);
      
//       if (result.status === true && result.apiorderid > 0) {
//         shipmentResult = {
//           ...result,
//           usedCourier: {
//             id: courier.courier_id,
//             name: courier.courier_name,
//             charge: courier.shipping_charge,
//             expectedDelivery: courier.expectedDeliveryDate
//           }
//         };
//         break;
//       }
//     } catch (error) {
//       console.error(`Courier ${courier.courier_name} failed:`, error.message);
//     }
//   }
  
//   if (!shipmentResult) {
//     throw new Error("All couriers failed for this route");
//   }
  
//   return {
//     shipment: shipmentResult,
//     courier: { used: shipmentResult.usedCourier }
//   };
// };





// // controllers/shippingController.js
// import {
//   createWarehouse,
//   createShipment,
//   shipOrder,
//   generateShippingLabel,
//   registerPickup,
//   getShipmentStatus,
//   getTrackingHistory,
//   cancelShipment,
//   calculateRate,
//   checkPincodeServiceability,
//   reattemptOrder,
// } from "../services/fshipService.js";
// import Order from '../models/Order.js';

// // Helper function to get nearby serviceable pincodes
// const getNearbyPincodes = async (pincode) => {
//   const nearbyPincodes = {
//     "560001": ["560001", "560002", "560025", "560034", "560038", "560017"],
//     "560038": ["560038", "560037", "560075", "560017", "560001"],
//     "400001": ["400001", "400002", "400003", "400004", "400005", "400020"],
//     "400093": ["400093", "400092", "400094", "400095", "400001"],
//     "110001": ["110001", "110002", "110003", "110005", "110006", "110016"],
//     "600001": ["600001", "600002", "600003", "600004", "600005"],
//     "700001": ["700001", "700002", "700003", "700004", "700005"]
//   };
  
//   for (const [key, pincodes] of Object.entries(nearbyPincodes)) {
//     if (pincode.startsWith(key.substring(0, 3))) {
//       return pincodes.filter(p => p !== pincode);
//     }
//   }
  
//   return ["560001", "400001", "110001", "600001", "700001"];
// };

// // ---------------------- WAREHOUSE ----------------------
// export const createWarehouseController = async (req, res) => {
//   try {
//     const { warehouseName, address, city, pincode, email, contactName, phoneNumber } = req.body;
    
//     if (!warehouseName || !address || !city || !pincode || !email || !contactName || !phoneNumber) {
//       return res.status(400).json({ 
//         success: false,
//         message: "All warehouse fields are required"
//       });
//     }
    
//     const result = await createWarehouse({ 
//       warehouseName, address, city, pincode, email, contactName, phoneNumber 
//     });
    
//     res.status(200).json({ success: true, data: result, message: "Warehouse created successfully" });
//   } catch (error) {
//     console.error("Warehouse creation error:", error);
//     res.status(500).json({ success: false, message: "Warehouse creation failed", error: error.response?.data || error.message });
//   }
// };

// // ✅ FIXED: CHECK DELIVERY AVAILABILITY
// // export const checkDeliveryAvailabilityController = async (req, res) => {
// //   try {
// //     const { pincode, warehousePincode = "305001", weight = 0.5 } = req.body;
    
// //     console.log("\n=== CHECK DELIVERY AVAILABILITY ===");
// //     console.log("Destination Pincode:", pincode);
// //     console.log("Warehouse Pincode:", warehousePincode);
// //     console.log("Weight:", weight, "kg");
    
// //     if (!pincode) {
// //       return res.status(400).json({ success: false, message: "Pincode is required" });
// //     }
    
// //     // First check if pincode is serviceable
// //     const serviceability = await checkPincodeServiceability(warehousePincode, pincode);
    
// //     if (!serviceability.status || serviceability.delivery !== "Yes") {
// //       const nearbyPincodes = await getNearbyPincodes(pincode);
// //       return res.status(200).json({
// //         success: true,
// //         data: { 
// //           serviceable: false, 
// //           pincode, 
// //           message: `Delivery not available to ${pincode}`,
// //           suggestions: { alternativePincodes: nearbyPincodes }
// //         }
// //       });
// //     }
    
// //     // Get rates from FShip
// //     const ratePayload = {
// //       source_Pincode: warehousePincode,
// //       destination_Pincode: pincode,
// //       payment_Mode: 2, // 2 = Prepaid
// //       amount: 0,
// //       express_Type: "surface",
// //       shipment_Weight: weight,
// //       shipment_Length: 10,
// //       shipment_Width: 10,
// //       shipment_Height: 10,
// //       volumetric_Weight: 0
// //     };
    
// //     console.log("📊 Calling calculateRate with:", ratePayload);
    
// //     const rates = await calculateRate(ratePayload);
    
// //     console.log("📊 Rate Response:", JSON.stringify(rates, null, 2));
    
// //     let couriers = [];
    
// //     // ✅ FIX: Check both possible response formats
// //     if (rates.status && rates.charges && rates.charges.length > 0) {
// //       // Format from calculateRate in fshipService
// //       couriers = rates.charges.map(rate => ({
// //         courierId: rate.courier_id,
// //         courierName: rate.courier_name,
// //         shippingCharge: parseFloat(rate.total_charge || rate.shipping_charge || 0),
// //         expectedDelivery: rate.expected_delivery_days ? `${rate.expected_delivery_days} days` : '3-5 days',
// //         serviceMode: rate.service_mode || 'surface',
// //         zoneName: rate.zone_name || 'Standard'
// //       }));
// //     } else if (rates.shipment_rates && rates.shipment_rates.length > 0) {
// //       // Fallback format
// //       couriers = rates.shipment_rates.map(rate => ({
// //         courierId: rate.courier_id,
// //         courierName: rate.courier_name,
// //         shippingCharge: parseFloat(rate.shipping_charge || 0),
// //         expectedDelivery: rate.expectedDeliveryDate || '3-5 days',
// //         serviceMode: rate.service_mode || 'surface',
// //         zoneName: rate.zone_name || 'Standard'
// //       }));
// //     }
    
// //     if (couriers.length > 0) {
// //       // Sort by shipping charge (cheapest first)
// //       couriers.sort((a, b) => a.shippingCharge - b.shippingCharge);
      
// //       console.log(`✅ Found ${couriers.length} couriers for ${pincode}`);
// //       console.log(`   Cheapest: ${couriers[0].courierName} - ₹${couriers[0].shippingCharge}`);
      
// //       return res.status(200).json({
// //         success: true,
// //         data: { 
// //           serviceable: true, 
// //           pincode,
// //           weight: weight,
// //           message: `Delivery available to ${pincode}`,
// //           couriers: { 
// //             list: couriers,
// //             cheapest: couriers[0],
// //             count: couriers.length
// //           }
// //         }
// //       });
// //     } else {
// //       return res.status(200).json({
// //         success: true,
// //         data: { 
// //           serviceable: false, 
// //           pincode,
// //           message: `No couriers available for ${pincode}`,
// //           couriers: { list: [], count: 0 }
// //         }
// //       });
// //     }
    
// //   } catch (error) {
// //     console.error("Check delivery availability error:", error);
// //     res.status(500).json({ 
// //       success: false, 
// //       message: "Failed to check delivery availability", 
// //       error: error.message 
// //     });
// //   }
// // };


// // In shippingController.js - Replace the checkDeliveryAvailabilityController

// export const checkDeliveryAvailabilityController = async (req, res) => {
//   try {
//     const { pincode, warehousePincode = "305001", actualWeight = 0.5 } = req.body;
    
//     console.log("\n=== CHECK DELIVERY AVAILABILITY ===");
//     console.log("Destination Pincode:", pincode);
//     console.log("Warehouse Pincode:", warehousePincode);
//     console.log("Weight from frontend:", actualWeight, "kg");
    
//     if (!pincode) {
//       return res.status(400).json({ success: false, message: "Pincode is required" });
//     }
    
//     // Get rates from FShip API with correct weight
//     const ratePayload = {
//       source_Pincode: warehousePincode,
//       destination_Pincode: pincode,
//       payment_Mode: 2,
//       amount: 0,
//       express_Type: "surface",
//        shipment_Weight: actualWeight,  // ✅ Use the weight from frontend
//       shipment_Length: 10,
//       shipment_Width: 10,
//       shipment_Height: 10,
//       volumetric_Weight: 0
//     };
    
//     console.log("📊 Calling FShip Rate API with payload:", JSON.stringify(ratePayload, null, 2));
    
//     const rates = await calculateRate(ratePayload);
    
//     console.log("📊 FShip API Response:", JSON.stringify(rates, null, 2));
    
//     let couriers = [];
    
//     // ✅ FShip API returns shipment_rates array, NOT charges
//     if (rates.status === true && rates.shipment_rates && rates.shipment_rates.length > 0) {
//       couriers = rates.shipment_rates.map(rate => ({
//         courierId: rate.courier_id,
//         courierName: rate.courier_name,
//         shippingCharge: parseFloat(rate.shipping_charge || 0),
//         expectedDelivery: rate.expectedDeliveryDate ? new Date(rate.expectedDeliveryDate).toLocaleDateString() : '3-5 days',
//         serviceMode: rate.service_mode || 'surface',
//         zoneName: rate.zone_name || 'Standard'
//       }));
      
//       // Sort by cheapest
//       couriers.sort((a, b) => a.shippingCharge - b.shippingCharge);
      
//       console.log(`\n✅ FShip API returned ${couriers.length} couriers for ${weight}kg:`);
//       couriers.forEach(c => {
//         console.log(`   ${c.courierName}: ₹${c.shippingCharge}`);
//       });
//     } else {
//       console.log("❌ No couriers returned from FShip API or status false");
//       console.log("   Status:", rates.status);
//       console.log("   Response:", rates.response);
//     }
    
//     if (couriers.length > 0) {
//       return res.status(200).json({
//         success: true,
//         data: {
//           serviceable: true,
//           pincode: pincode,
//           weight: weight,
//           message: `Delivery available to ${pincode}`,
//           couriers: {
//             list: couriers,
//             cheapest: couriers[0],
//             count: couriers.length
//           }
//         }
//       });
//     } else {
//       // Check pincode serviceability as fallback
//       const serviceability = await checkPincodeServiceability(warehousePincode, pincode);
      
//       if (!serviceability.status || serviceability.delivery !== "Yes") {
//         const nearbyPincodes = await getNearbyPincodes(pincode);
//         return res.status(200).json({
//           success: true,
//           data: {
//             serviceable: false,
//             pincode,
//             message: `Delivery not available to ${pincode}`,
//             suggestions: { alternativePincodes: nearbyPincodes }
//           }
//         });
//       }
      
//       return res.status(200).json({
//         success: true,
//         data: {
//           serviceable: false,
//           pincode,
//           weight: weight,
//           message: `No couriers available for ${pincode} at ${weight}kg`,
//           couriers: { list: [], count: 0 }
//         }
//       });
//     }
    
//   } catch (error) {
//     console.error("Check delivery availability error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to check delivery availability",
//       error: error.message
//     });
//   }
// };

// // ✅ FIXED: CREATE SHIPMENT
// // export const createShipmentController = async (req, res) => {
// //   try {
// //     const { order, warehouseId } = req.body;
    
// //     console.log("\n" + "=".repeat(60));
// //     console.log("🚚 CREATE SHIPMENT");
// //     console.log("=".repeat(60));
// //     console.log("Order Number:", order?.orderNumber);
// //     console.log("Total Amount:", order?.totalAmount);
// //     console.log("Delivery Charge from frontend:", order?.deliveryCharge);
// //     console.log("Items:", order?.items?.length);
    
// //     if (!order || !warehouseId) {
// //       return res.status(400).json({ success: false, message: "Order and warehouseId are required" });
// //     }
    
// //     const warehousePincode = order.warehousePincode || process.env.FSHIP_WAREHOUSE_PINCODE || "305001";
// //     const customerPincode = order.customer?.pincode;
    
// //     if (!customerPincode) {
// //       return res.status(400).json({ success: false, message: "Customer pincode is required" });
// //     }
    
// //     // Check serviceability
// //     const serviceability = await checkPincodeServiceability(warehousePincode, customerPincode);
    
// //     if (!serviceability.status || serviceability.delivery !== "Yes") {
// //       return res.status(400).json({ 
// //         success: false, 
// //         message: `Delivery not available to pincode ${customerPincode}` 
// //       });
// //     }
    
// //     // Get rates
// //     const ratePayload = {
// //       source_Pincode: warehousePincode,
// //       destination_Pincode: customerPincode,
// //       payment_Mode: order.paymentMode === 1 ? 1 : 2,
// //       amount: order.totalAmount || 0,
// //       express_Type: "surface",
// //       shipment_Weight: order.orderWeight || 0.5,
// //       shipment_Length: 10,
// //       shipment_Width: 10,
// //       shipment_Height: 10,
// //       volumetric_Weight: 0
// //     };
    
// //     console.log("📊 Getting rates with payload:", ratePayload);
    
// //     const rates = await calculateRate(ratePayload);
    
// //     let availableCouriers = [];
    
// //     // Parse rates response
// //     if (rates.status && rates.charges && rates.charges.length > 0) {
// //       availableCouriers = rates.charges.map(rate => ({
// //         courier_id: rate.courier_id,
// //         courier_name: rate.courier_name,
// //         shipping_charge: parseFloat(rate.total_charge || 0),
// //         expectedDeliveryDate: rate.expected_delivery_days ? `${rate.expected_delivery_days} days` : '3-5 days'
// //       }));
// //     } else if (rates.shipment_rates && rates.shipment_rates.length > 0) {
// //       availableCouriers = rates.shipment_rates;
// //     }
    
// //     if (availableCouriers.length === 0) {
// //       return res.status(400).json({ 
// //         success: false, 
// //         message: "No couriers available for this route" 
// //       });
// //     }
    
// //     // Sort by shipping charge
// //     availableCouriers.sort((a, b) => a.shipping_charge - b.shipping_charge);
    
// //     console.log(`📦 Found ${availableCouriers.length} couriers, cheapest: ${availableCouriers[0].courier_name} - ₹${availableCouriers[0].shipping_charge}`);
    
// //     // Try each courier
// //     let shipmentResult = null;
    
// //     for (const courier of availableCouriers) {
// //       try {
// //         console.log(`Trying: ${courier.courier_name} - ₹${courier.shipping_charge}`);
        
// //         const orderWithCourier = { 
// //           ...order, 
// //           courierId: courier.courier_id,
// //           deliveryCharge: courier.shipping_charge  // ✅ Add delivery charge to order
// //         };
        
// //         const result = await createShipment(orderWithCourier, warehouseId);
        
// //         if (result.status === true && result.apiorderid > 0) {
// //           shipmentResult = {
// //             ...result,
// //             usedCourier: {
// //               id: courier.courier_id,
// //               name: courier.courier_name,
// //               charge: courier.shipping_charge,
// //               expectedDelivery: courier.expectedDeliveryDate
// //             }
// //           };
// //           console.log(`✅ Success with ${courier.courier_name}`);
// //           break;
// //         }
// //       } catch (error) {
// //         console.error(`Courier ${courier.courier_name} failed:`, error.message);
// //       }
// //     }
    
// //     if (!shipmentResult) {
// //       return res.status(400).json({ 
// //         success: false, 
// //         message: "All couriers failed for this route" 
// //       });
// //     }
    
// //     // Update order in database
// //     try {
// //       await Order.findOneAndUpdate(
// //         { orderNumber: order.orderNumber },
// //         {
// //           $set: {
// //             shipmentCreated: true,
// //             'shipment.waybill': shipmentResult.waybill,
// //             'shipment.courier': shipmentResult.usedCourier.name,
// //             'shipment.status': 'Booked',
// //             'shipment.lastUpdated': new Date(),
// //             'shipment.labelUrl': shipmentResult.labelurl || '',
// //             deliveryCharge: shipmentResult.usedCourier.charge,
// //             deliveryPartner: shipmentResult.usedCourier.id
// //           }
// //         }
// //       );
// //       console.log(`✅ Updated order ${order.orderNumber} with shipping info`);
// //     } catch (dbError) {
// //       console.error("Database update error:", dbError);
// //     }
    
// //     res.status(200).json({
// //       success: true,
// //       data: { 
// //         shipment: shipmentResult, 
// //         courier: { used: shipmentResult.usedCourier },
// //         deliveryCharge: shipmentResult.usedCourier.charge
// //       },
// //       message: `Shipment created successfully with ${shipmentResult.usedCourier.name}`
// //     });
    
// //   } catch (error) {
// //     console.error("Create shipment error:", error);
// //     res.status(500).json({ 
// //       success: false, 
// //       message: "Shipment creation failed", 
// //       error: error.message 
// //     });
// //   }
// // };



// // In shippingController.js - Fix the createShipmentController

// export const createShipmentController = async (req, res) => {
//   try {
//     const { order, warehouseId } = req.body;
    
//     console.log("\n" + "=".repeat(60));
//     console.log("🚚 CREATE SHIPMENT");
//     console.log("=".repeat(60));
//     console.log("Order Number:", order?.orderNumber);
//     console.log("Total Amount:", order?.totalAmount);
//     console.log("Delivery Charge from frontend:", order?.deliveryCharge);
//     console.log("Order Weight from frontend:", order?.orderWeight, "kg");
//     console.log("Items:", order?.items?.length);
    
//     if (!order || !warehouseId) {
//       return res.status(400).json({ success: false, message: "Order and warehouseId are required" });
//     }
    
//     const warehousePincode = order.warehousePincode || process.env.FSHIP_WAREHOUSE_PINCODE || "305001";
//     const customerPincode = order.customer?.pincode;
    
//     if (!customerPincode) {
//       return res.status(400).json({ success: false, message: "Customer pincode is required" });
//     }
    
//     // ✅ Use the weight from frontend
//     const actualWeight = order.orderWeight || order.weight || 0.5;
//     console.log(`📦 Using weight: ${actualWeight} kg`);
    
//     // Get rates from FShip API
//     const ratePayload = {
//       source_Pincode: warehousePincode,
//       destination_Pincode: customerPincode,
//       payment_Mode: order.paymentMode === 1 ? 1 : 2,
//       amount: order.totalAmount || 0,
//       express_Type: "surface",
//       shipment_Weight: actualWeight,
//       shipment_Length: 10,
//       shipment_Width: 10,
//       shipment_Height: 10,
//       volumetric_Weight: 0
//     };
    
//     console.log("📊 Getting rates with payload:", ratePayload);
    
//     const rates = await calculateRate(ratePayload);
    
//     let availableCouriers = [];
    
//     // ✅ Parse FShip response correctly (shipment_rates, not charges)
//     if (rates.status === true && rates.shipment_rates && rates.shipment_rates.length > 0) {
//       availableCouriers = rates.shipment_rates.map(rate => ({
//         courier_id: rate.courier_id,
//         courier_name: rate.courier_name,
//         shipping_charge: parseFloat(rate.shipping_charge || 0),
//         expectedDeliveryDate: rate.expectedDeliveryDate || '3-5 days'
//       }));
//     }
    
//     if (availableCouriers.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No couriers available for this route"
//       });
//     }
    
//     // Sort by shipping charge (cheapest first)
//     availableCouriers.sort((a, b) => a.shipping_charge - b.shipping_charge);
    
//     console.log(`📦 Found ${availableCouriers.length} couriers for ${actualWeight}kg:`);
//     availableCouriers.forEach(c => {
//       console.log(`   ${c.courier_name}: ₹${c.shipping_charge}`);
//     });
    
//     // Try each courier starting from cheapest
//     let shipmentResult = null;
    
//     for (const courier of availableCouriers) {
//       try {
//         console.log(`Trying: ${courier.courier_name} - ₹${courier.shipping_charge}`);
        
//         const orderWithCourier = {
//           ...order,
//           courierId: courier.courier_id,
//           deliveryCharge: courier.shipping_charge,
//           orderWeight: actualWeight
//         };
        
//         const result = await createShipment(orderWithCourier, warehouseId);
        
//         if (result.status === true && result.apiorderid > 0) {
//           shipmentResult = {
//             ...result,
//             usedCourier: {
//               id: courier.courier_id,
//               name: courier.courier_name,
//               charge: courier.shipping_charge,
//               expectedDelivery: courier.expectedDeliveryDate
//             }
//           };
//           console.log(`✅ Success with ${courier.courier_name}`);
//           break;
//         }
//       } catch (error) {
//         console.error(`Courier ${courier.courier_name} failed:`, error.message);
//       }
//     }
    
//     if (!shipmentResult) {
//       return res.status(400).json({
//         success: false,
//         message: "All couriers failed for this route"
//       });
//     }
    
//     // Update order in database
//     try {
//       await Order.findOneAndUpdate(
//         { orderNumber: order.orderNumber },
//         {
//           $set: {
//             shipmentCreated: true,
//             'shipment.waybill': shipmentResult.waybill,
//             'shipment.courier': shipmentResult.usedCourier.name,
//             'shipment.status': 'Booked',
//             'shipment.lastUpdated': new Date(),
//             'shipment.labelUrl': shipmentResult.labelurl || '',
//             deliveryCharge: shipmentResult.usedCourier.charge,
//             deliveryPartner: shipmentResult.usedCourier.id,
//             orderWeight: actualWeight
//           }
//         }
//       );
//       console.log(`✅ Updated order ${order.orderNumber} with shipping info`);
//     } catch (dbError) {
//       console.error("Database update error:", dbError);
//     }
    
//     res.status(200).json({
//       success: true,
//       data: {
//         shipment: shipmentResult,
//         courier: { used: shipmentResult.usedCourier },
//         deliveryCharge: shipmentResult.usedCourier.charge
//       },
//       message: `Shipment created successfully with ${shipmentResult.usedCourier.name}`
//     });
    
//   } catch (error) {
//     console.error("Create shipment error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Shipment creation failed",
//       error: error.message
//     });
//   }
// };

// // ---------------------- SHIP ORDER ----------------------
// export const shipOrderController = async (req, res) => {
//   try {
//     const { apiorderid, courierId } = req.body;
    
//     if (!apiorderid) {
//       return res.status(400).json({ success: false, message: "API Order ID is required" });
//     }
    
//     const result = await shipOrder(apiorderid, courierId);
//     res.status(200).json({ success: true, data: result, message: "Order shipped successfully" });
//   } catch (error) {
//     console.error("Ship order error:", error);
//     res.status(500).json({ success: false, message: "Ship order failed", error: error.message });
//   }
// };

// // ---------------------- GENERATE SHIPPING LABEL ----------------------
// export const generateShippingLabelController = async (req, res) => {
//   try {
//     const { waybill } = req.body;
    
//     if (!waybill) {
//       return res.status(400).json({ success: false, message: "Waybill required" });
//     }
    
//     const result = await generateShippingLabel(waybill);
//     res.status(200).json({ success: true, data: result, message: "Shipping label generated successfully" });
//   } catch (error) {
//     console.error("Generate shipping label error:", error);
//     res.status(500).json({ success: false, message: "Generate shipping label failed", error: error.message });
//   }
// };

// // ---------------------- REGISTER PICKUP ----------------------
// export const registerPickupController = async (req, res) => {
//   try {
//     const { waybills } = req.body;
    
//     if (!waybills) {
//       return res.status(400).json({ success: false, message: "Waybill(s) required" });
//     }
    
//     const result = await registerPickup(waybills);
//     res.status(200).json({ success: true, data: result, message: "Pickup registered successfully" });
//   } catch (error) {
//     console.error("Register pickup error:", error);
//     res.status(500).json({ success: false, message: "Register pickup failed", error: error.message });
//   }
// };

// // ---------------------- SHIPMENT STATUS ----------------------
// export const getShipmentStatusController = async (req, res) => {
//   try {
//     const { waybill } = req.body;
    
//     if (!waybill) {
//       return res.status(400).json({ success: false, message: "Waybill required" });
//     }
    
//     const result = await getShipmentStatus(waybill);
//     res.status(200).json({ success: true, data: result, message: "Shipment status fetched successfully" });
//   } catch (error) {
//     console.error("Get shipment status error:", error);
//     res.status(500).json({ success: false, message: "Fetch shipment status failed", error: error.message });
//   }
// };

// // ---------------------- TRACKING HISTORY ----------------------
// export const getTrackingHistoryController = async (req, res) => {
//   try {
//     const { waybill } = req.body;
    
//     if (!waybill) {
//       return res.status(400).json({ success: false, message: "Waybill required" });
//     }
    
//     const result = await getTrackingHistory(waybill);
//     res.status(200).json({ success: true, data: result, message: "Tracking history fetched successfully" });
//   } catch (error) {
//     console.error("Get tracking history error:", error);
//     res.status(500).json({ success: false, message: "Fetch tracking history failed", error: error.message });
//   }
// };

// // ---------------------- CANCEL SHIPMENT ----------------------
// export const cancelShipmentController = async (req, res) => {
//   try {
//     const { waybill, reason } = req.body;
    
//     if (!waybill) {
//       return res.status(400).json({ success: false, message: "Waybill required" });
//     }
    
//     const result = await cancelShipment(waybill, reason);
//     res.status(200).json({ success: true, data: result, message: "Shipment cancelled successfully" });
//   } catch (error) {
//     console.error("Cancel shipment error:", error);
//     res.status(500).json({ success: false, message: "Cancel shipment failed", error: error.message });
//   }
// };

// // ---------------------- RATE CALCULATOR ----------------------
// export const calculateRateController = async (req, res) => {
//   try {
//     const result = await calculateRate(req.body);
//     res.status(200).json({ success: true, data: result, message: "Rate calculated successfully" });
//   } catch (error) {
//     console.error("Rate calculation error:", error);
//     res.status(500).json({ success: false, message: "Rate calculation failed", error: error.message });
//   }
// };

// // ---------------------- PINCODE SERVICEABILITY ----------------------
// export const checkPincodeServiceabilityController = async (req, res) => {
//   try {
//     const { source_Pincode, destination_Pincode } = req.body;
    
//     if (!source_Pincode || !destination_Pincode) {
//       return res.status(400).json({ success: false, message: "Source and destination pincodes required" });
//     }
    
//     const result = await checkPincodeServiceability(source_Pincode, destination_Pincode);
//     res.status(200).json({ success: true, data: result, message: "Pincode serviceability checked successfully" });
//   } catch (error) {
//     console.error("Pincode serviceability error:", error);
//     res.status(500).json({ success: false, message: "Pincode serviceability check failed", error: error.message });
//   }
// };

// // ---------------------- RE-ATTEMPT ORDER ----------------------
// export const reattemptOrderController = async (req, res) => {
//   try {
//     const payload = req.body;
    
//     if (!payload.apiorderid || !payload.action) {
//       return res.status(400).json({ success: false, message: "apiorderid and action are required" });
//     }
    
//     const result = await reattemptOrder(payload);
//     res.status(200).json({ success: true, data: result, message: "Order re-attempt successful" });
//   } catch (error) {
//     console.error("Re-attempt order error:", error);
//     res.status(500).json({ success: false, message: "Re-attempt order failed", error: error.message });
//   }
// };

// // ---------------------- TRACK BY ORDER NUMBER ----------------------
// export const trackByOrderNumberController = async (req, res) => {
//   try {
//     const { orderNumber } = req.body;
    
//     if (!orderNumber) {
//       return res.status(400).json({ success: false, message: "Order number is required" });
//     }
    
//     const order = await Order.findOne({ orderNumber });
    
//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }
    
//     const firstItem = order.items?.[0] || {};
//     const waybill = order.shipment?.waybill || order.fship?.waybill;
    
//     res.status(200).json({
//       success: true,
//       data: {
//         orderId: order.orderNumber,
//         status: order.status,
//         createdAt: order.createdAt,
//         amount: order.totalAmount,
//         waybill: waybill,
//         courierName: order.shipment?.courier || order.fship?.courier,
//         items: {
//           pages: firstItem.pages || 0,
//           copies: firstItem.copies || 0
//         }
//       }
//     });
//   } catch (error) {
//     console.error("Track by order error:", error);
//     res.status(500).json({ success: false, message: "Failed to track order", error: error.message });
//   }
// };

// // // ---------------------- CREATE SHIPMENT WITH SERVICEABILITY CHECK ----------------------
// // export const createShipmentWithServiceabilityCheck = async (order, warehouseId) => {
// //   try {
// //     console.log("\n=== CREATE SHIPMENT WITH SERVICEABILITY CHECK ===");
    
// //     const warehousePincode = order.warehousePincode || process.env.FSHIP_WAREHOUSE_PINCODE || "305001";
// //     const customerPincode = order.customer?.pincode;
    
// //     if (!customerPincode) {
// //       throw new Error("Customer pincode is required");
// //     }
    
// //     console.log(`📍 Checking: ${warehousePincode} → ${customerPincode}`);
    
// //     const serviceability = await checkPincodeServiceability(warehousePincode, customerPincode);
    
// //     if (!serviceability.status || serviceability.delivery !== "Yes") {
// //       throw new Error(`Delivery not available to ${customerPincode}`);
// //     }
    
// //     const ratePayload = {
// //       source_Pincode: warehousePincode,
// //       destination_Pincode: customerPincode,
// //       payment_Mode: order.paymentMode === 1 ? 1 : 2,
// //       amount: order.totalAmount || 0,
// //       express_Type: "surface",
// //       shipment_Weight: order.orderWeight || 0.5,
// //       shipment_Length: 10,
// //       shipment_Width: 10,
// //       shipment_Height: 10,
// //       volumetric_Weight: 0
// //     };
    
// //     const rates = await calculateRate(ratePayload);
    
// //     let availableCouriers = [];
    
// //     if (rates.status && rates.charges && rates.charges.length > 0) {
// //       availableCouriers = rates.charges.map(rate => ({
// //         courier_id: rate.courier_id,
// //         courier_name: rate.courier_name,
// //         shipping_charge: parseFloat(rate.total_charge || 0),
// //         expectedDeliveryDate: rate.expected_delivery_days ? `${rate.expected_delivery_days} days` : '3-5 days'
// //       }));
// //     } else if (rates.shipment_rates && rates.shipment_rates.length > 0) {
// //       availableCouriers = rates.shipment_rates;
// //     }
    
// //     if (availableCouriers.length === 0) {
// //       throw new Error("No couriers available for this route");
// //     }
    
// //     availableCouriers.sort((a, b) => a.shipping_charge - b.shipping_charge);
    
// //     let shipmentResult = null;
    
// //     for (const courier of availableCouriers) {
// //       try {
// //         console.log(`Trying: ${courier.courier_name} - ₹${courier.shipping_charge}`);
        
// //         const orderWithCourier = { 
// //           ...order, 
// //           courierId: courier.courier_id,
// //           deliveryCharge: courier.shipping_charge
// //         };
        
// //         const result = await createShipment(orderWithCourier, warehouseId);
        
// //         if (result.status === true && result.apiorderid > 0) {
// //           shipmentResult = {
// //             ...result,
// //             usedCourier: {
// //               id: courier.courier_id,
// //               name: courier.courier_name,
// //               charge: courier.shipping_charge,
// //               expectedDelivery: courier.expectedDeliveryDate
// //             }
// //           };
// //           break;
// //         }
// //       } catch (error) {
// //         console.error(`Courier ${courier.courier_name} failed:`, error.message);
// //       }
// //     }
    
// //     if (!shipmentResult) {
// //       throw new Error("All couriers failed for this route");
// //     }
    
// //     return {
// //       shipment: shipmentResult,
// //       courier: { used: shipmentResult.usedCourier },
// //       deliveryCharge: shipmentResult.usedCourier.charge
// //     };
    
// //   } catch (error) {
// //     console.error("createShipmentWithServiceabilityCheck error:", error);
// //     throw error;
// //   }
// // };




// // ---------------------- CREATE SHIPMENT WITH SERVICEABILITY CHECK ----------------------
// export const createShipmentWithServiceabilityCheck = async (order, warehouseId) => {
//   try {
//     console.log("\n=== CREATE SHIPMENT WITH SERVICEABILITY CHECK ===");
    
//     const warehousePincode = order.warehousePincode || process.env.FSHIP_WAREHOUSE_PINCODE || "305001";
//     const customerPincode = order.customer?.pincode;
    
//     if (!customerPincode) {
//       throw new Error("Customer pincode is required");
//     }
    
//     console.log(`📍 Checking: ${warehousePincode} → ${customerPincode}`);
//     console.log(`📦 Order Weight received: ${order.orderWeight} kg`);
    
//     // ✅ Get weight from multiple sources
//     const actualWeight = order.orderWeight || order.weight || 0.5;
//     console.log(`📦 Using weight: ${actualWeight} kg`);
    
//     const serviceability = await checkPincodeServiceability(warehousePincode, customerPincode);
    
//     if (!serviceability.status || serviceability.delivery !== "Yes") {
//       throw new Error(`Delivery not available to ${customerPincode}`);
//     }
    
//     // ✅ Use actual weight in rate payload
//     const ratePayload = {
//       source_Pincode: warehousePincode,
//       destination_Pincode: customerPincode,
//       payment_Mode: order.paymentMode === 1 ? 1 : 2,
//       amount: order.totalAmount || 0,
//       express_Type: "surface",
//       shipment_Weight: actualWeight,  // ✅ Use actual weight
//       shipment_Length: 10,
//       shipment_Width: 10,
//       shipment_Height: 10,
//       volumetric_Weight: 0
//     };
    
//     console.log("📊 Rate payload:", JSON.stringify(ratePayload, null, 2));
    
//     const rates = await calculateRate(ratePayload);
    
//     console.log("📊 Rates response:", JSON.stringify(rates, null, 2));
    
//     let availableCouriers = [];
    
//     // ✅ FIX: Use shipment_rates (not charges)
//     if (rates.status === true && rates.shipment_rates && rates.shipment_rates.length > 0) {
//       availableCouriers = rates.shipment_rates.map(rate => ({
//         courier_id: rate.courier_id,
//         courier_name: rate.courier_name,
//         shipping_charge: parseFloat(rate.shipping_charge || 0),
//         expectedDeliveryDate: rate.expectedDeliveryDate || '3-5 days'
//       }));
//     }
    
//     if (availableCouriers.length === 0) {
//       throw new Error("No couriers available for this route");
//     }
    
//     // Sort by cheapest
//     availableCouriers.sort((a, b) => a.shipping_charge - b.shipping_charge);
    
//     console.log(`📦 Found ${availableCouriers.length} couriers for ${actualWeight}kg:`);
//     availableCouriers.forEach(c => {
//       console.log(`   ${c.courier_name}: ₹${c.shipping_charge}`);
//     });
    
//     let shipmentResult = null;
    
//     for (const courier of availableCouriers) {
//       try {
//         console.log(`Trying: ${courier.courier_name} - ₹${courier.shipping_charge}`);
        
//         const orderWithCourier = { 
//           ...order, 
//           courierId: courier.courier_id,
//           deliveryCharge: courier.shipping_charge,
//           orderWeight: actualWeight  // ✅ Pass the actual weight
//         };
        
//         const result = await createShipment(orderWithCourier, warehouseId);
        
//         if (result.status === true && result.apiorderid > 0) {
//           shipmentResult = {
//             ...result,
//             usedCourier: {
//               id: courier.courier_id,
//               name: courier.courier_name,
//               charge: courier.shipping_charge,
//               expectedDelivery: courier.expectedDeliveryDate
//             }
//           };
//           console.log(`✅ Success with ${courier.courier_name}`);
//           break;
//         }
//       } catch (error) {
//         console.error(`Courier ${courier.courier_name} failed:`, error.message);
//       }
//     }
    
//     if (!shipmentResult) {
//       throw new Error("All couriers failed for this route");
//     }
    
//     return {
//       shipment: shipmentResult,
//       courier: { used: shipmentResult.usedCourier },
//       deliveryCharge: shipmentResult.usedCourier.charge
//     };
    
//   } catch (error) {
//     console.error("createShipmentWithServiceabilityCheck error:", error);
//     throw error;
//   }
// };





import {
  createWarehouse,
  createShipment,
  shipOrder,
  generateShippingLabel,
  registerPickup,
  getShipmentStatus,
  getTrackingHistory,
  cancelShipment,
  calculateRate,
  checkPincodeServiceability,
  reattemptOrder,
} from "../services/fshipService.js";
import Order from '../models/Order.js';
import { updateWarehouse, getAllWarehouses } from '../services/fshipService.js';

// Helper function to get nearby serviceable pincodes
const getNearbyPincodes = async (pincode) => {
  const nearbyPincodes = {
    "560001": ["560001", "560002", "560025", "560034", "560038", "560017"],
    "560038": ["560038", "560037", "560075", "560017", "560001"],
    "400001": ["400001", "400002", "400003", "400004", "400005", "400020"],
    "400093": ["400093", "400092", "400094", "400095", "400001"],
    "110001": ["110001", "110002", "110003", "110005", "110006", "110016"],
    "600001": ["600001", "600002", "600003", "600004", "600005"],
    "700001": ["700001", "700002", "700003", "700004", "700005"]
  };
  
  for (const [key, pincodes] of Object.entries(nearbyPincodes)) {
    if (pincode.startsWith(key.substring(0, 3))) {
      return pincodes.filter(p => p !== pincode);
    }
  }
  return ["560001", "400001", "110001", "600001", "700001"];
};

// ---------------------- WAREHOUSE ----------------------
export const createWarehouseController = async (req, res) => {
  try {
    const { warehouseName, address, city, pincode, email, contactName, phoneNumber } = req.body;
    
    if (!warehouseName || !address || !city || !pincode || !email || !contactName || !phoneNumber) {
      return res.status(400).json({ success: false, message: "All warehouse fields are required" });
    }
    
    const result = await createWarehouse({ warehouseName, address, city, pincode, email, contactName, phoneNumber });
    res.status(200).json({ success: true, data: result, message: "Warehouse created successfully" });
  } catch (error) {
    console.error("Warehouse creation error:", error);
    res.status(500).json({ success: false, message: "Warehouse creation failed", error: error.response?.data || error.message });
  }
};

// ---------------------- CHECK DELIVERY AVAILABILITY ----------------------
export const checkDeliveryAvailabilityController = async (req, res) => {
  try {
    const { pincode, warehousePincode = "305001", weight = 0.5 } = req.body;
    
    console.log("\n=== CHECK DELIVERY AVAILABILITY ===");
    console.log("Destination Pincode:", pincode);
    console.log("Warehouse Pincode:", warehousePincode);
    console.log("Weight from frontend:", weight, "kg");
    
    if (!pincode) {
      return res.status(400).json({ success: false, message: "Pincode is required" });
    }
    
    const ratePayload = {
      source_Pincode: warehousePincode,
      destination_Pincode: pincode,
      payment_Mode: 2,
      amount: 0,
      express_Type: "surface",
      shipment_Weight: weight,
      shipment_Length: 10,
      shipment_Width: 10,
      shipment_Height: 10,
      volumetric_Weight: 0
    };
    
    console.log("📊 Calling FShip Rate API with payload:", JSON.stringify(ratePayload, null, 2));
    
    const rates = await calculateRate(ratePayload);
    
    console.log("📊 FShip API Response:", JSON.stringify(rates, null, 2));
    
    let couriers = [];
    
    if (rates.status === true && rates.shipment_rates && rates.shipment_rates.length > 0) {
      couriers = rates.shipment_rates.map(rate => ({
        courierId: rate.courier_id,
        courierName: rate.courier_name,
        shippingCharge: parseFloat(rate.shipping_charge || 0),
        expectedDelivery: rate.expectedDeliveryDate ? new Date(rate.expectedDeliveryDate).toLocaleDateString() : '3-5 days',
        serviceMode: rate.service_mode || 'surface',
        zoneName: rate.zone_name || 'Standard'
      }));
      
      couriers.sort((a, b) => a.shippingCharge - b.shippingCharge);
      
      console.log(`\n✅ FShip API returned ${couriers.length} couriers for ${weight}kg:`);
      couriers.forEach(c => {
        console.log(`   ${c.courierName}: ₹${c.shippingCharge}`);
      });
    } else {
      console.log("❌ No couriers returned from FShip API");
    }
    
    if (couriers.length > 0) {
      return res.status(200).json({
        success: true,
        data: {
          serviceable: true,
          pincode: pincode,
          weight: weight,
          message: `Delivery available to ${pincode}`,
          couriers: {
            list: couriers,
            cheapest: couriers[0],
            count: couriers.length
          }
        }
      });
    } else {
      const serviceability = await checkPincodeServiceability(warehousePincode, pincode);
      if (!serviceability.status || serviceability.delivery !== "Yes") {
        const nearbyPincodes = await getNearbyPincodes(pincode);
        return res.status(200).json({
          success: true,
          data: {
            serviceable: false,
            pincode,
            message: `Delivery not available to ${pincode}`,
            suggestions: { alternativePincodes: nearbyPincodes }
          }
        });
      }
      
      return res.status(200).json({
        success: true,
        data: {
          serviceable: false,
          pincode,
          weight: weight,
          message: `No couriers available for ${pincode} at ${weight}kg`,
          couriers: { list: [], count: 0 }
        }
      });
    }
    
  } catch (error) {
    console.error("Check delivery availability error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check delivery availability",
      error: error.message
    });
  }
};

// ---------------------- CREATE SHIPMENT ----------------------
export const createShipmentController = async (req, res) => {
  try {
    const { order, warehouseId } = req.body;
    
    console.log("\n" + "=".repeat(60));
    console.log("🚚 CREATE SHIPMENT");
    console.log("=".repeat(60));
    console.log("Order Number:", order?.orderNumber);
    console.log("Order Weight from frontend:", order?.orderWeight, "kg");
    console.log("Delivery Charge from frontend:", order?.deliveryCharge);
    
    if (!order || !warehouseId) {
      return res.status(400).json({ success: false, message: "Order and warehouseId are required" });
    }
    
    const warehousePincode = order.warehousePincode || process.env.FSHIP_WAREHOUSE_PINCODE || "305001";
    const customerPincode = order.customer?.pincode;
    
    if (!customerPincode) {
      return res.status(400).json({ success: false, message: "Customer pincode is required" });
    }
    
    const actualWeight = order.orderWeight || order.weight || 0.5;
    console.log(`📦 Using weight: ${actualWeight} kg`);
    
    const ratePayload = {
      source_Pincode: warehousePincode,
      destination_Pincode: customerPincode,
      payment_Mode: order.paymentMode === 1 ? 1 : 2,
      amount: order.totalAmount || 0,
      express_Type: "surface",
      shipment_Weight: actualWeight,
      shipment_Length: 10,
      shipment_Width: 10,
      shipment_Height: 10,
      volumetric_Weight: 0
    };
    
    console.log("📊 Getting rates with payload:", ratePayload);
    
    const rates = await calculateRate(ratePayload);
    
    let availableCouriers = [];
    
    if (rates.status === true && rates.shipment_rates && rates.shipment_rates.length > 0) {
      availableCouriers = rates.shipment_rates.map(rate => ({
        courier_id: rate.courier_id,
        courier_name: rate.courier_name,
        shipping_charge: parseFloat(rate.shipping_charge || 0),
        expectedDeliveryDate: rate.expectedDeliveryDate || '3-5 days'
      }));
    }
    
    if (availableCouriers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No couriers available for this route"
      });
    }
    
    availableCouriers.sort((a, b) => a.shipping_charge - b.shipping_charge);
    
    console.log(`📦 Found ${availableCouriers.length} couriers for ${actualWeight}kg:`);
    availableCouriers.forEach(c => {
      console.log(`   ${c.courier_name}: ₹${c.shipping_charge}`);
    });
    
    let shipmentResult = null;
    
    for (const courier of availableCouriers) {
      try {
        console.log(`Trying: ${courier.courier_name} - ₹${courier.shipping_charge}`);
        
        const orderWithCourier = {
          ...order,
          courierId: courier.courier_id,
          deliveryCharge: courier.shipping_charge,
          orderWeight: actualWeight
        };
        
        const result = await createShipment(orderWithCourier, warehouseId);
        
        if (result.status === true && result.apiorderid > 0) {
          shipmentResult = {
            ...result,
            usedCourier: {
              id: courier.courier_id,
              name: courier.courier_name,
              charge: courier.shipping_charge,
              expectedDelivery: courier.expectedDeliveryDate
            }
          };
          console.log(`✅ Success with ${courier.courier_name}`);
          break;
        }
      } catch (error) {
        console.error(`Courier ${courier.courier_name} failed:`, error.message);
      }
    }
    
    if (!shipmentResult) {
      return res.status(400).json({
        success: false,
        message: "All couriers failed for this route"
      });
    }
    
    try {
      await Order.findOneAndUpdate(
        { orderNumber: order.orderNumber },
        {
          $set: {
            shipmentCreated: true,
            'shipment.waybill': shipmentResult.waybill,
            'shipment.courier': shipmentResult.usedCourier.name,
            'shipment.status': 'Booked',
            'shipment.lastUpdated': new Date(),
            'shipment.labelUrl': shipmentResult.labelurl || '',
            deliveryCharge: shipmentResult.usedCourier.charge,
            deliveryPartner: shipmentResult.usedCourier.id,
            orderWeight: actualWeight
          }
        }
      );
      console.log(`✅ Updated order ${order.orderNumber} with shipping info`);
    } catch (dbError) {
      console.error("Database update error:", dbError);
    }
    
    res.status(200).json({
      success: true,
      data: {
        shipment: shipmentResult,
        courier: { used: shipmentResult.usedCourier },
        deliveryCharge: shipmentResult.usedCourier.charge
      },
      message: `Shipment created successfully with ${shipmentResult.usedCourier.name}`
    });
    
  } catch (error) {
    console.error("Create shipment error:", error);
    res.status(500).json({
      success: false,
      message: "Shipment creation failed",
      error: error.message
    });
  }
};

// ---------------------- CREATE SHIPMENT WITH SERVICEABILITY CHECK ----------------------
export const createShipmentWithServiceabilityCheck = async (order, warehouseId) => {
  try {
    console.log("\n=== CREATE SHIPMENT WITH SERVICEABILITY CHECK ===");
    
    const warehousePincode = order.warehousePincode || process.env.FSHIP_WAREHOUSE_PINCODE || "305001";
    const customerPincode = order.customer?.pincode;
    
    if (!customerPincode) {
      throw new Error("Customer pincode is required");
    }
    
    console.log(`📍 Checking: ${warehousePincode} → ${customerPincode}`);
    
    const actualWeight = order.orderWeight || order.weight || 0.5;
    console.log(`📦 Using weight: ${actualWeight} kg`);
    
    const serviceability = await checkPincodeServiceability(warehousePincode, customerPincode);
    if (!serviceability.status || serviceability.delivery !== "Yes") {
      throw new Error(`Delivery not available to ${customerPincode}`);
    }
    
    const ratePayload = {
      source_Pincode: warehousePincode,
      destination_Pincode: customerPincode,
      payment_Mode: order.paymentMode === 1 ? 1 : 2,
      amount: order.totalAmount || 0,
      express_Type: "surface",
      shipment_Weight: actualWeight,
      shipment_Length: 10,
      shipment_Width: 10,
      shipment_Height: 10,
      volumetric_Weight: 0
    };
    
    console.log("📊 Rate payload:", JSON.stringify(ratePayload, null, 2));
    
    const rates = await calculateRate(ratePayload);
    
    let availableCouriers = [];
    
    if (rates.status === true && rates.shipment_rates && rates.shipment_rates.length > 0) {
      availableCouriers = rates.shipment_rates.map(rate => ({
        courier_id: rate.courier_id,
        courier_name: rate.courier_name,
        shipping_charge: parseFloat(rate.shipping_charge || 0),
        expectedDeliveryDate: rate.expectedDeliveryDate || '3-5 days'
      }));
    }
    
    if (availableCouriers.length === 0) {
      throw new Error("No couriers available for this route");
    }
    
    availableCouriers.sort((a, b) => a.shipping_charge - b.shipping_charge);
    
    console.log(`📦 Found ${availableCouriers.length} couriers for ${actualWeight}kg:`);
    availableCouriers.forEach(c => {
      console.log(`   ${c.courier_name}: ₹${c.shipping_charge}`);
    });
    
    let shipmentResult = null;
    
    for (const courier of availableCouriers) {
      try {
        console.log(`Trying: ${courier.courier_name} - ₹${courier.shipping_charge}`);
        
        const orderWithCourier = { 
          ...order, 
          courierId: courier.courier_id,
          deliveryCharge: courier.shipping_charge,
          orderWeight: actualWeight
        };
        
        const result = await createShipment(orderWithCourier, warehouseId);
        
        if (result.status === true && result.apiorderid > 0) {
          shipmentResult = {
            ...result,
            usedCourier: {
              id: courier.courier_id,
              name: courier.courier_name,
              charge: courier.shipping_charge,
              expectedDelivery: courier.expectedDeliveryDate
            }
          };
          console.log(`✅ Success with ${courier.courier_name}`);
          break;
        }
      } catch (error) {
        console.error(`Courier ${courier.courier_name} failed:`, error.message);
      }
    }
    
    if (!shipmentResult) {
      throw new Error("All couriers failed for this route");
    }
    
    return {
      shipment: shipmentResult,
      courier: { used: shipmentResult.usedCourier },
      deliveryCharge: shipmentResult.usedCourier.charge
    };
    
  } catch (error) {
    console.error("createShipmentWithServiceabilityCheck error:", error);
    throw error;
  }
};

// ---------------------- SHIP ORDER ----------------------
export const shipOrderController = async (req, res) => {
  try {
    const { apiorderid, courierId } = req.body;
    if (!apiorderid) {
      return res.status(400).json({ success: false, message: "API Order ID is required" });
    }
    const result = await shipOrder(apiorderid, courierId);
    res.status(200).json({ success: true, data: result, message: "Order shipped successfully" });
  } catch (error) {
    console.error("Ship order error:", error);
    res.status(500).json({ success: false, message: "Ship order failed", error: error.message });
  }
};

// ---------------------- GENERATE SHIPPING LABEL ----------------------
export const generateShippingLabelController = async (req, res) => {
  try {
    const { waybill } = req.body;
    if (!waybill) {
      return res.status(400).json({ success: false, message: "Waybill required" });
    }
    const result = await generateShippingLabel(waybill);
    res.status(200).json({ success: true, data: result, message: "Shipping label generated successfully" });
  } catch (error) {
    console.error("Generate shipping label error:", error);
    res.status(500).json({ success: false, message: "Generate shipping label failed", error: error.message });
  }
};

// ---------------------- REGISTER PICKUP ----------------------
export const registerPickupController = async (req, res) => {
  try {
    const { waybills } = req.body;
    if (!waybills) {
      return res.status(400).json({ success: false, message: "Waybill(s) required" });
    }
    const result = await registerPickup(waybills);
    res.status(200).json({ success: true, data: result, message: "Pickup registered successfully" });
  } catch (error) {
    console.error("Register pickup error:", error);
    res.status(500).json({ success: false, message: "Register pickup failed", error: error.message });
  }
};

// ---------------------- SHIPMENT STATUS ----------------------
export const getShipmentStatusController = async (req, res) => {
  try {
    const { waybill } = req.body;
    if (!waybill) {
      return res.status(400).json({ success: false, message: "Waybill required" });
    }
    const result = await getShipmentStatus(waybill);
    res.status(200).json({ success: true, data: result, message: "Shipment status fetched successfully" });
  } catch (error) {
    console.error("Get shipment status error:", error);
    res.status(500).json({ success: false, message: "Fetch shipment status failed", error: error.message });
  }
};

// ---------------------- TRACKING HISTORY ----------------------
export const getTrackingHistoryController = async (req, res) => {
  try {
    const { waybill } = req.body;
    if (!waybill) {
      return res.status(400).json({ success: false, message: "Waybill required" });
    }
    const result = await getTrackingHistory(waybill);
    res.status(200).json({ success: true, data: result, message: "Tracking history fetched successfully" });
  } catch (error) {
    console.error("Get tracking history error:", error);
    res.status(500).json({ success: false, message: "Fetch tracking history failed", error: error.message });
  }
};

// ---------------------- CANCEL SHIPMENT ----------------------
export const cancelShipmentController = async (req, res) => {
  try {
    const { waybill, reason } = req.body;
    if (!waybill) {
      return res.status(400).json({ success: false, message: "Waybill required" });
    }
    const result = await cancelShipment(waybill, reason);
    res.status(200).json({ success: true, data: result, message: "Shipment cancelled successfully" });
  } catch (error) {
    console.error("Cancel shipment error:", error);
    res.status(500).json({ success: false, message: "Cancel shipment failed", error: error.message });
  }
};

// ---------------------- RATE CALCULATOR ----------------------
export const calculateRateController = async (req, res) => {
  try {
    const result = await calculateRate(req.body);
    res.status(200).json({ success: true, data: result, message: "Rate calculated successfully" });
  } catch (error) {
    console.error("Rate calculation error:", error);
    res.status(500).json({ success: false, message: "Rate calculation failed", error: error.message });
  }
};

// ---------------------- PINCODE SERVICEABILITY ----------------------
export const checkPincodeServiceabilityController = async (req, res) => {
  try {
    const { source_Pincode, destination_Pincode } = req.body;
    if (!source_Pincode || !destination_Pincode) {
      return res.status(400).json({ success: false, message: "Source and destination pincodes required" });
    }
    const result = await checkPincodeServiceability(source_Pincode, destination_Pincode);
    res.status(200).json({ success: true, data: result, message: "Pincode serviceability checked successfully" });
  } catch (error) {
    console.error("Pincode serviceability error:", error);
    res.status(500).json({ success: false, message: "Pincode serviceability check failed", error: error.message });
  }
};

// ---------------------- RE-ATTEMPT ORDER ----------------------
export const reattemptOrderController = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.apiorderid || !payload.action) {
      return res.status(400).json({ success: false, message: "apiorderid and action are required" });
    }
    const result = await reattemptOrder(payload);
    res.status(200).json({ success: true, data: result, message: "Order re-attempt successful" });
  } catch (error) {
    console.error("Re-attempt order error:", error);
    res.status(500).json({ success: false, message: "Re-attempt order failed", error: error.message });
  }
};

// ---------------------- TRACK BY ORDER NUMBER ----------------------
export const trackByOrderNumberController = async (req, res) => {
  try {
    const { orderNumber } = req.body;
    if (!orderNumber) {
      return res.status(400).json({ success: false, message: "Order number is required" });
    }
    const order = await Order.findOne({ orderNumber });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    const firstItem = order.items?.[0] || {};
    const waybill = order.shipment?.waybill || order.fship?.waybill;
    res.status(200).json({
      success: true,
      data: {
        orderId: order.orderNumber,
        status: order.status,
        createdAt: order.createdAt,
        amount: order.totalAmount,
        waybill: waybill,
        courierName: order.shipment?.courier || order.fship?.courier,
        items: {
          pages: firstItem.pages || 0,
          copies: firstItem.copies || 0
        }
      }
    });
  } catch (error) {
    console.error("Track by order error:", error);
    res.status(500).json({ success: false, message: "Failed to track order", error: error.message });
  }
};


// Example route to update warehouse
// export const updateWarehouseAddress = async (req, res) => {
//   try {
//     const {
//       warehouseId,
//       contactName,
//       addressLine1,
//       addressLine2,
//       pincode,
//       city,
//       stateId,
//       phoneNumber,
//       email
//     } = req.body;
    
//     // First, get existing warehouse to get the warehouseName
//     const warehouses = await getAllWarehouses();
//     const existingWarehouse = warehouses.warehouses.find(w => w.warehouseId === warehouseId);
    
//     if (!existingWarehouse) {
//       return res.status(404).json({ success: false, message: "Warehouse not found" });
//     }
    
//     // Update warehouse
//     const result = await updateWarehouse({
//       warehouseId,
//       warehouseName: existingWarehouse.warehouseName, // Use existing name
//       contactName,
//       addressLine1,
//       addressLine2,
//       pincode,
//       city,
//       stateId,
//       countryId: 0,
//       phoneNumber,
//       email
//     });
    
//     if (result.status) {
//       res.json({ success: true, message: "Warehouse updated successfully", data: result });
//     } else {
//       res.status(400).json({ success: false, message: "Update failed" });
//     }
    
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };








// // Add these functions to shippingController.js

// ---------------------- GET ALL WAREHOUSES CONTROLLER ----------------------
export const getAllWarehousesController = async (req, res) => {
  try {
    console.log("\n=== GET ALL WAREHOUSES ===");
    
    const result = await getAllWarehouses();
    
    if (result && result.status === true) {
      res.status(200).json({
        success: true,
        data: result.warehouses || [],
        message: "Warehouses fetched successfully"
      });
    } else {
      res.status(400).json({
        success: false,
        message: result?.response || "Failed to fetch warehouses"
      });
    }
  } catch (error) {
    console.error("Get all warehouses error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch warehouses",
      error: error.message
    });
  }
};

// ---------------------- UPDATE WAREHOUSE CONTROLLER ----------------------
export const updateWarehouseAddress = async (req, res) => {
  try {
    console.log("\n=== UPDATE WAREHOUSE ===");
    
    // Get warehouseId from params or body
    const warehouseId = req.params.warehouseId || req.body.warehouseId;
    
    const {
      contactName,
      addressLine1,
      addressLine2,
      pincode,
      city,
      stateId,
      phoneNumber,
      email
    } = req.body;
    
    // Validate required fields
    if (!warehouseId) {
      return res.status(400).json({ 
        success: false, 
        message: "Warehouse ID is required" 
      });
    }
    
    // First, get existing warehouse to get the warehouseName
    const warehouses = await getAllWarehouses();
    
    if (!warehouses || !warehouses.warehouses) {
      return res.status(404).json({ 
        success: false, 
        message: "No warehouses found" 
      });
    }
    
    const existingWarehouse = warehouses.warehouses.find(
      w => w.warehouseId === parseInt(warehouseId)
    );
    
    if (!existingWarehouse) {
      return res.status(404).json({ 
        success: false, 
        message: `Warehouse with ID ${warehouseId} not found` 
      });
    }
    
    console.log(`📦 Found warehouse: ${existingWarehouse.warehouseName} (ID: ${existingWarehouse.warehouseId})`);
    
    // Update warehouse
    const result = await updateWarehouse({
      warehouseId: parseInt(warehouseId),
      warehouseName: existingWarehouse.warehouseName, // Use existing name (cannot change)
      contactName: contactName || existingWarehouse.contactName,
      addressLine1: addressLine1 || existingWarehouse.addressLine1,
      addressLine2: addressLine2 || existingWarehouse.addressLine2 || "",
      pincode: pincode || existingWarehouse.pincode,
      city: city || existingWarehouse.city,
      stateId: parseInt(stateId) || existingWarehouse.stateId,
      countryId: existingWarehouse.countryId || 0,
      phoneNumber: phoneNumber || existingWarehouse.phoneNumber,
      email: email || existingWarehouse.email
    });
    
    if (result && result.status === true) {
      res.status(200).json({
        success: true,
        data: result,
        message: "Warehouse updated successfully"
      });
    } else {
      res.status(400).json({
        success: false,
        message: result?.response || "Failed to update warehouse"
      });
    }
    
  } catch (error) {
    console.error("Update warehouse error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update warehouse",
      error: error.message
    });
  }
};