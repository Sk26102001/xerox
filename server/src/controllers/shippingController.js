

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






// controllers/shippingController.js
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
  reattemptOrder
} from "../services/fshipService.js";

// Helper function to get nearby serviceable pincodes
const getNearbyPincodes = async (pincode) => {
  // Common serviceable pincodes for major cities
  const nearbyPincodes = {
    "560001": ["560001", "560002", "560025", "560034", "560038", "560017"],
    "560038": ["560038", "560037", "560075", "560017", "560001"],
    "400001": ["400001", "400002", "400003", "400004", "400005", "400020"],
    "400093": ["400093", "400092", "400094", "400095", "400001"],
    "110001": ["110001", "110002", "110003", "110005", "110006", "110016"],
    "600001": ["600001", "600002", "600003", "600004", "600005"],
    "700001": ["700001", "700002", "700003", "700004", "700005"]
  };
  
  // Check if we have nearby pincodes for this area
  for (const [key, pincodes] of Object.entries(nearbyPincodes)) {
    if (pincode.startsWith(key.substring(0, 3))) {
      return pincodes.filter(p => p !== pincode);
    }
  }
  
  // Return default suggestions
  return ["560001", "400001", "110001", "600001", "700001"];
};

// ---------------------- WAREHOUSE ----------------------
export const createWarehouseController = async (req, res) => {
  try {
    const { warehouseName, address, city, pincode, email, contactName, phoneNumber } = req.body;
    
    console.log("=== Create Warehouse Request ===");
    console.log("Request body:", req.body);
    
    if (!warehouseName || !address || !city || !pincode || !email || !contactName || !phoneNumber) {
      return res.status(400).json({ 
        success: false,
        message: "All warehouse fields are required",
        required: ["warehouseName", "address", "city", "pincode", "email", "contactName", "phoneNumber"]
      });
    }
    
    const result = await createWarehouse({ 
      warehouseName, 
      address, 
      city, 
      pincode, 
      email, 
      contactName, 
      phoneNumber 
    });
    
    res.status(200).json({
      success: true,
      data: result,
      message: "Warehouse created successfully"
    });
  } catch (error) {
    console.error("Warehouse creation error:", error);
    res.status(500).json({ 
      success: false,
      message: "Warehouse creation failed", 
      error: error.response?.data || error.message 
    });
  }
};

// ---------------------- CHECK DELIVERY AVAILABILITY ----------------------
export const checkDeliveryAvailabilityController = async (req, res) => {
  try {
    const { pincode, warehousePincode = "400001", weight = 0.5 } = req.body;
    
    if (!pincode) {
      return res.status(400).json({
        success: false,
        message: "Pincode is required"
      });
    }
    
    console.log(`\n🔍 Checking delivery availability for pincode: ${pincode}`);
    console.log(`Warehouse Pincode: ${warehousePincode}`);
    
    // Check serviceability
    const serviceability = await checkPincodeServiceability(warehousePincode, pincode);
    
    console.log("Serviceability Result:", JSON.stringify(serviceability, null, 2));
    
    if (!serviceability.status || serviceability.delivery !== "Yes") {
      const nearbyPincodes = await getNearbyPincodes(pincode);
      
      return res.status(200).json({
        success: true,
        data: {
          serviceable: false,
          pincode: pincode,
          message: serviceability.response || "Delivery not available for this pincode",
          details: {
            source: serviceability.source,
            destination: serviceability.destination,
            pickup: serviceability.pickup,
            delivery: serviceability.delivery,
            cod: serviceability.cod
          },
          suggestions: {
            alternativePincodes: nearbyPincodes,
            message: "Try one of these nearby pincodes or contact support"
          }
        }
      });
    }
    
    // Get available couriers and rates
    const rates = await calculateRate({
      source_Pincode: warehousePincode,
      destination_Pincode: pincode,
      payment_Mode: "P",
      amount: 0,
      express_Type: "surface",
      shipment_Weight: weight,
      shipment_Length: 10,
      shipment_Width: 10,
      shipment_Height: 10,
      volumetric_Weight: 0
    });
    
    let couriers = [];
    let cheapestCourier = null;
    let fastestCourier = null;
    
    if (rates.status && rates.shipment_rates && rates.shipment_rates.length > 0) {
      couriers = rates.shipment_rates.map(rate => ({
        courierId: rate.courier_id,
        courierName: rate.courier_name,
        shippingCharge: rate.shipping_charge,
        codCharge: rate.cod_charge,
        rtoCharge: rate.rto_charge,
        serviceMode: rate.service_mode,
        zoneName: rate.zone_name,
        expectedDelivery: rate.expectedDeliveryDate
      }));
      
      // Find cheapest courier
      cheapestCourier = couriers.reduce((min, rate) => 
        rate.shippingCharge < min.shippingCharge ? rate : min
      );
      
      // Find fastest courier (earliest delivery)
      fastestCourier = couriers.reduce((fastest, rate) => {
        if (!fastest) return rate;
        return new Date(rate.expectedDelivery) < new Date(fastest.expectedDelivery) ? rate : fastest;
      }, null);
    }
    
    res.status(200).json({
      success: true,
      data: {
        serviceable: true,
        pincode: pincode,
        message: "Delivery available for this pincode",
        details: {
          source: serviceability.source,
          destination: serviceability.destination,
          zone: serviceability.zone,
          pickup: serviceability.pickup,
          delivery: serviceability.delivery,
          cod: serviceability.cod
        },
        couriers: {
          total: couriers.length,
          list: couriers,
          recommendations: {
            cheapest: cheapestCourier,
            fastest: fastestCourier
          }
        }
      },
      message: "Delivery availability checked successfully"
    });
    
  } catch (error) {
    console.error("Check delivery availability error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check delivery availability",
      error: error.message
    });
  }
};

// controllers/shippingController.js - Replace createShipmentController with this

export const createShipmentController = async (req, res) => {
  try {
    const { order, warehouseId } = req.body;
    
    console.log("\n" + "=".repeat(60));
    console.log("🚚 CREATE SHIPMENT WITH SERVICEABILITY CHECK");
    console.log("=".repeat(60));
    console.log("Warehouse ID:", warehouseId);
    console.log("Order Number:", order?.orderNumber);
    console.log("Customer Pincode:", order?.customer?.pincode);
    
    // Validate required fields
    if (!order) {
      return res.status(400).json({ 
        success: false,
        message: "Order data is required"
      });
    }
    
    if (!warehouseId) {
      return res.status(400).json({ 
        success: false,
        message: "Warehouse ID is required"
      });
    }
    
    if (!order.customer) {
      return res.status(400).json({ 
        success: false,
        message: "Customer details are required"
      });
    }
    
    // Validate required customer fields
    const requiredCustomerFields = ['name', 'phone', 'email', 'address', 'pincode', 'city', 'state'];
    const missingFields = requiredCustomerFields.filter(field => !order.customer[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: "Missing required customer fields",
        missingFields: missingFields
      });
    }
    
    // STEP 1: Check Pincode Serviceability
    const warehousePincode = order.warehousePincode || "400001";
    const customerPincode = order.customer.pincode;
    
    console.log("\n🔍 STEP 1: Checking pincode serviceability...");
    console.log(`   Source: ${warehousePincode} → Destination: ${customerPincode}`);
    
    const serviceability = await checkPincodeServiceability(warehousePincode, customerPincode);
    
    if (!serviceability.status || serviceability.delivery !== "Yes") {
      const nearbyPincodes = await getNearbyPincodes(customerPincode);
      
      return res.status(400).json({
        success: false,
        message: "Delivery not available for this pincode",
        data: {
          serviceable: false,
          pincode: customerPincode,
          suggestions: { alternativePincodes: nearbyPincodes }
        }
      });
    }
    
    console.log("✅ Pincode is serviceable!");
    
    // STEP 2: Get available couriers and EXCLUDE Blue Dart
    console.log("\n💰 STEP 2: Getting available couriers...");
    
    const rates = await calculateRate({
      source_Pincode: warehousePincode,
      destination_Pincode: customerPincode,
      payment_Mode: "P",
      amount: order.totalAmount || 0,
      express_Type: order.expressType || "surface",
      shipment_Weight: order.weight || 0.5,
      shipment_Length: 10,
      shipment_Width: 10,
      shipment_Height: 10,
      volumetric_Weight: 0
    });
    
    // CRITICAL: Exclude Blue Dart (courier_id: 1)
    const EXCLUDED_COURIERS = [1]; // Blue Dart - causes "Pickup pincode not serviceable"
    
    let availableCouriers = [];
    
    if (rates.status && rates.shipment_rates && rates.shipment_rates.length > 0) {
      // Filter out Blue Dart
      availableCouriers = rates.shipment_rates.filter(rate => !EXCLUDED_COURIERS.includes(rate.courier_id));
      
      console.log(`   Total couriers: ${rates.shipment_rates.length}`);
      console.log(`   Excluded: Blue Dart (ID: 1)`);
      console.log(`   Available couriers: ${availableCouriers.length}`);
      
      if (availableCouriers.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No couriers available after excluding Blue Dart"
        });
      }
      
      // Sort by price (cheapest first)
      availableCouriers.sort((a, b) => a.shipping_charge - b.shipping_charge);
      
      console.log("   Available couriers (cheapest first):");
      availableCouriers.slice(0, 5).forEach((c, i) => {
        console.log(`      ${i + 1}. ${c.courier_name}: ₹${c.shipping_charge} (ID: ${c.courier_id})`);
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No couriers available for this route"
      });
    }
    
    // STEP 3: Try each available courier (skip Blue Dart)
    console.log("\n📦 STEP 3: Trying couriers...");
    
    let shipmentResult = null;
    let failedAttempts = [];
    
    for (const courier of availableCouriers) {
      try {
        console.log(`   Trying: ${courier.courier_name} (ID: ${courier.courier_id}) - ₹${courier.shipping_charge}`);
        
        const orderWithCourier = {
          ...order,
          courierId: courier.courier_id
        };
        
        const result = await createShipment(orderWithCourier, warehouseId);
        
        if (result.status === true && result.apiorderid > 0) {
          console.log(`   ✅ SUCCESS with ${courier.courier_name}!`);
          console.log(`   API Order ID: ${result.apiorderid}`);
          console.log(`   Waybill: ${result.waybill}`);
          
          shipmentResult = {
            ...result,
            usedCourier: {
              id: courier.courier_id,
              name: courier.courier_name,
              charge: courier.shipping_charge,
              expectedDelivery: courier.expectedDeliveryDate
            }
          };
          break;
        } else {
          console.log(`   ❌ Failed: ${result.response || "Unknown error"}`);
          failedAttempts.push({
            courierId: courier.courier_id,
            courierName: courier.courier_name,
            error: result.response || "Unknown error"
          });
        }
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
        failedAttempts.push({
          courierId: courier.courier_id,
          courierName: courier.courier_name,
          error: error.message
        });
      }
    }
    
    // If all couriers failed
    if (!shipmentResult) {
      console.log("\n❌ All couriers failed!");
      
      return res.status(400).json({
        success: false,
        message: "All couriers failed for this route",
        data: {
          serviceable: true,
          pincode: customerPincode,
          failedAttempts: failedAttempts,
          availableCouriers: availableCouriers.map(c => ({
            id: c.courier_id,
            name: c.courier_name,
            charge: c.shipping_charge
          }))
        }
      });
    }
    
    // STEP 4: Return success
    console.log("\n✅ Shipment created successfully!");
    console.log(`   Courier: ${shipmentResult.usedCourier.name}`);
    console.log(`   Charge: ₹${shipmentResult.usedCourier.charge}`);
    console.log(`   API Order ID: ${shipmentResult.apiorderid}`);
    console.log(`   Waybill: ${shipmentResult.waybill}`);
    
    res.status(200).json({
      success: true,
      data: {
        shipment: shipmentResult,
        serviceability: {
          checked: true,
          serviceable: true,
          sourcePincode: warehousePincode,
          destinationPincode: customerPincode,
          zone: serviceability.zone,
          pickupAvailable: serviceability.pickup === "Yes",
          deliveryAvailable: serviceability.delivery === "Yes",
          codAvailable: serviceability.cod === "Yes"
        },
        courier: {
          used: shipmentResult.usedCourier,
          available: availableCouriers.map(c => ({
            id: c.courier_id,
            name: c.courier_name,
            charge: c.shipping_charge,
            expectedDelivery: c.expectedDeliveryDate
          })),
          excluded: [{
            id: 1,
            name: "Blue Dart",
            reason: "Pickup pincode not serviceable for this route"
          }]
        }
      },
      message: `Shipment created successfully with ${shipmentResult.usedCourier.name}`
    });
    
  } catch (error) {
    console.error("\n❌ Create shipment controller error:", error);
    
    if (error.response?.status === 400) {
      return res.status(400).json({ 
        success: false,
        message: "Shipment creation failed - Validation error", 
        error: error.response.data
      });
    }


    if (result.status === true && result.apiorderid > 0) {
  // Find and update the order with shipping info
  await Order.findOneAndUpdate(
    { orderNumber: order.orderNumber },
    {
      $set: {
        shipmentCreated: true,
        'shipment.waybill': result.waybill,
        'shipment.courier': result.usedCourier?.name || cheapestCourier?.courier_name,
        'shipment.status': 'Booked',
        'shipment.lastUpdated': new Date(),
        'shipment.labelUrl': result.labelurl || ''
      }
    }
  );
  
  console.log(`✅ Updated order ${order.orderNumber} with shipping info`);
}
    
    res.status(500).json({ 
      success: false,
      message: "Shipment creation failed", 
      error: error.response?.data || error.message 
    });
  }
};





// controllers/shippingController.js - Add this new endpoint

export const trackByOrderNumberController = async (req, res) => {
  try {
    const { orderNumber } = req.body;
    
    console.log("=== Track Order Request ===");
    console.log("Order Number:", orderNumber);
    
    if (!orderNumber) {
      return res.status(400).json({
        success: false,
        message: "Order number is required"
      });
    }
    
    // Import Order model (make sure path is correct)
    const Order = await import('../models/Order.js').then(m => m.default);
    
    // Find order in database
    const order = await Order.findOne({ orderNumber });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    
    console.log("Order found:", order.orderNumber);
    console.log("Shipment waybill:", order.shipment?.waybill);
    
    // Prepare response data
    const firstItem = order.items && order.items[0] || {};
    
    let trackingStatus = null;
    let currentLocation = 'Processing';
    let expectedDelivery = 'Pending';
    let courierName = order.shipment?.courier || 'Not assigned';
    let currentStatus = order.status;
    
    // If shipment exists and has waybill, fetch live tracking
    if (order.shipment?.waybill) {
      try {
        // Get current status from fship
        const statusResponse = await getShipmentStatus(order.shipment.waybill);
        
        if (statusResponse.status && statusResponse.summary) {
          currentLocation = statusResponse.summary.location || 'Shipping Hub';
          expectedDelivery = statusResponse.summary.lastscanned || 'Pending';
          courierName = statusResponse.summary.fulfilledby || order.shipment.courier;
          currentStatus = statusResponse.summary.status;
          trackingStatus = statusResponse.summary;
          
          // Update order with latest tracking info
          await Order.updateOne(
            { orderNumber },
            {
              $set: {
                'shipment.status': currentStatus,
                'shipment.lastUpdated': new Date(),
                'shipment.trackingData': trackingStatus
              }
            }
          );
        }
      } catch (error) {
        console.error("Error fetching tracking from fship:", error.message);
      }
    }
    
    // Map status for frontend
    let frontendStatus = 'pending';
    if (currentStatus === 'Delivered') {
      frontendStatus = 'completed';
    } else if (currentStatus === 'Out for Delivery' || currentStatus === 'In Transit') {
      frontendStatus = 'dispatched';
    } else if (order.shipment?.waybill) {
      frontendStatus = 'printing';
    } else if (order.status === 'paid') {
      frontendStatus = 'confirmed';
    }
    
    res.status(200).json({
      success: true,
      data: {
        orderId: order.orderNumber,
        status: frontendStatus,
        createdAt: order.createdAt.toLocaleString(),
        estimatedReady: expectedDelivery,
        items: {
          pages: firstItem.pages || 0,
          copies: firstItem.copies || 0,
          paperSize: firstItem.paperSize || 'A4',
          printColor: firstItem.printColor === 'color' ? 'Color' : 'B&W',
          bindingType: firstItem.bindingType || 'Perfect Glue'
        },
        amount: order.totalAmount,
        deliveryType: order.deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup',
        waybill: order.shipment?.waybill || null,
        courierName: courierName,
        currentLocation: currentLocation,
        trackingHistory: []
      },
      message: "Order tracked successfully"
    });
    
  } catch (error) {
    console.error("Track by order error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to track order",
      error: error.message
    });
  }
};

// ---------------------- SHIP ORDER ----------------------
export const shipOrderController = async (req, res) => {
  try {
    const { apiorderid, courierId } = req.body;
    
    console.log("=== Ship Order Request ===");
    console.log("API Order ID:", apiorderid);
    console.log("Courier ID:", courierId);
    
    if (!apiorderid) {
      return res.status(400).json({ 
        success: false,
        message: "API Order ID is required",
        error: "Missing apiorderid"
      });
    }
    
    const result = await shipOrder(apiorderid, courierId);
    
    res.status(200).json({
      success: true,
      data: result,
      message: "Order shipped successfully"
    });
  } catch (error) {
    console.error("Ship order error:", error);
    res.status(500).json({ 
      success: false,
      message: "Ship order failed", 
      error: error.response?.data || error.message 
    });
  }
};

// ---------------------- GENERATE / PRINT LABEL ----------------------
export const generateShippingLabelController = async (req, res) => {
  try {
    const { waybills } = req.body;
    
    console.log("=== Generate Shipping Label Request ===");
    console.log("Waybill(s):", waybills);
    
    if (!waybills) {
      return res.status(400).json({ 
        success: false,
        message: "Waybill(s) required",
        error: "Missing waybills"
      });
    }
    
    const result = await generateShippingLabel(waybills);
    
    res.status(200).json({
      success: true,
      data: result,
      message: "Shipping label generated successfully"
    });
  } catch (error) {
    console.error("Generate shipping label error:", error);
    res.status(500).json({ 
      success: false,
      message: "Generate shipping label failed", 
      error: error.response?.data || error.message 
    });
  }
};

// ---------------------- REGISTER PICKUP ----------------------
export const registerPickupController = async (req, res) => {
  try {
    const { waybills } = req.body;
    
    console.log("=== Register Pickup Request ===");
    console.log("Waybill(s):", waybills);
    
    if (!waybills) {
      return res.status(400).json({ 
        success: false,
        message: "Waybill(s) required for pickup",
        error: "Missing waybills"
      });
    }
    
    const result = await registerPickup(waybills);
    
    res.status(200).json({
      success: true,
      data: result,
      message: "Pickup registered successfully"
    });
  } catch (error) {
    console.error("Register pickup error:", error);
    res.status(500).json({ 
      success: false,
      message: "Register pickup failed", 
      error: error.response?.data || error.message 
    });
  }
};

// ---------------------- SHIPMENT CURRENT STATUS ----------------------
export const getShipmentStatusController = async (req, res) => {
  try {
    const { waybill } = req.body;
    
    console.log("=== Get Shipment Status Request ===");
    console.log("Waybill:", waybill);
    
    if (!waybill) {
      return res.status(400).json({ 
        success: false,
        message: "Waybill required",
        error: "Missing waybill"
      });
    }
    
    const result = await getShipmentStatus(waybill);
    
    res.status(200).json({
      success: true,
      data: result,
      message: "Shipment status fetched successfully"
    });
  } catch (error) {
    console.error("Get shipment status error:", error);
    res.status(500).json({ 
      success: false,
      message: "Fetch shipment status failed", 
      error: error.response?.data || error.message 
    });
  }
};

// ---------------------- TRACKING HISTORY ----------------------
export const getTrackingHistoryController = async (req, res) => {
  try {
    const { waybill } = req.body;
    
    console.log("=== Get Tracking History Request ===");
    console.log("Waybill:", waybill);
    
    if (!waybill) {
      return res.status(400).json({ 
        success: false,
        message: "Waybill required",
        error: "Missing waybill"
      });
    }
    
    const result = await getTrackingHistory(waybill);
    
    res.status(200).json({
      success: true,
      data: result,
      message: "Tracking history fetched successfully"
    });
  } catch (error) {
    console.error("Get tracking history error:", error);
    res.status(500).json({ 
      success: false,
      message: "Fetch tracking history failed", 
      error: error.response?.data || error.message 
    });
  }
};

// ---------------------- CANCEL SHIPMENT ----------------------
export const cancelShipmentController = async (req, res) => {
  try {
    const { waybill, reason } = req.body;
    
    console.log("=== Cancel Shipment Request ===");
    console.log("Waybill:", waybill);
    console.log("Reason:", reason);
    
    if (!waybill) {
      return res.status(400).json({ 
        success: false,
        message: "Waybill required to cancel shipment",
        error: "Missing waybill"
      });
    }
    
    const result = await cancelShipment(waybill, reason);
    
    res.status(200).json({
      success: true,
      data: result,
      message: "Shipment cancelled successfully"
    });
  } catch (error) {
    console.error("Cancel shipment error:", error);
    res.status(500).json({ 
      success: false,
      message: "Cancel shipment failed", 
      error: error.response?.data || error.message 
    });
  }
};

// ---------------------- RATE CALCULATOR ----------------------
export const calculateRateController = async (req, res) => {
  try {
    const payload = req.body;
    
    console.log("=== Calculate Rate Request ===");
    console.log("Payload:", payload);
    
    const result = await calculateRate(payload);
    
    res.status(200).json({
      success: true,
      data: result,
      message: "Rate calculated successfully"
    });
  } catch (error) {
    console.error("Rate calculation error:", error);
    res.status(500).json({ 
      success: false,
      message: "Rate calculation failed", 
      error: error.response?.data || error.message 
    });
  }
};

// ---------------------- PINCODE SERVICEABILITY ----------------------
export const checkPincodeServiceabilityController = async (req, res) => {
  try {
    const { source_Pincode, destination_Pincode } = req.body;
    
    console.log("=== Check Pincode Serviceability Request ===");
    console.log("Source Pincode:", source_Pincode);
    console.log("Destination Pincode:", destination_Pincode);
    
    if (!source_Pincode || !destination_Pincode) {
      return res.status(400).json({ 
        success: false,
        message: "Source and destination pincodes required",
        error: "Missing pincodes"
      });
    }
    
    const result = await checkPincodeServiceability(source_Pincode, destination_Pincode);
    
    res.status(200).json({
      success: true,
      data: result,
      message: "Pincode serviceability checked successfully"
    });
  } catch (error) {
    console.error("Pincode serviceability error:", error);
    res.status(500).json({ 
      success: false,
      message: "Pincode serviceability check failed", 
      error: error.response?.data || error.message 
    });
  }
};

// ---------------------- RE-ATTEMPT ORDER ----------------------
export const reattemptOrderController = async (req, res) => {
  try {
    const payload = req.body;
    
    console.log("=== Re-attempt Order Request ===");
    console.log("Payload:", payload);
    
    if (!payload.apiorderid || !payload.action) {
      return res.status(400).json({ 
        success: false,
        message: "apiorderid and action are required",
        error: "Missing required fields"
      });
    }
    
    const result = await reattemptOrder(payload);
    
    res.status(200).json({
      success: true,
      data: result,
      message: "Order re-attempt successful"
    });
  } catch (error) {
    console.error("Re-attempt order error:", error);
    res.status(500).json({ 
      success: false,
      message: "Re-attempt order failed", 
      error: error.response?.data || error.message 
    });
  }
};