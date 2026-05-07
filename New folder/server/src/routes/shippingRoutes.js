// import express from "express";
// import { createWarehouseController, createShipmentController } from "../controllers/shippingController.js";

// const router = express.Router();

// // Create warehouse
// router.post("/create-warehouse", createWarehouseController);

// // Create shipment
// router.post("/create-shipment", createShipmentController);

// export default router;   



// // routes/shippingRoutes.js
// import express from "express";
// import {
//   createWarehouseController,
//   createShipmentController,
//   shipOrderController,
//   generateShippingLabelController,
//   registerPickupController,
//   getShipmentStatusController,
//   getTrackingHistoryController,
//   cancelShipmentController,
//   calculateRateController,
//   checkPincodeServiceabilityController,
//   reattemptOrderController
// } from "../controllers/shippingController.js";

// const router = express.Router();

// // ---------------------- WAREHOUSE ----------------------
// router.post("/create-warehouse", createWarehouseController);

// // ---------------------- SHIPMENT ----------------------
// router.post("/create-shipment", createShipmentController);

// // ---------------------- SHIP ORDER ----------------------
// router.post("/ship-order", shipOrderController);

// // ---------------------- SHIPPING LABEL ----------------------
// router.post("/shipping-label", generateShippingLabelController);

// // ---------------------- REGISTER PICKUP ----------------------
// router.post("/register-pickup", registerPickupController);

// // ---------------------- SHIPMENT STATUS ----------------------
// router.post("/shipment-status", getShipmentStatusController);

// // ---------------------- TRACKING HISTORY ----------------------
// router.post("/tracking-history", getTrackingHistoryController);

// // ---------------------- CANCEL SHIPMENT (optional) ----------------------
// router.post("/cancel-shipment", cancelShipmentController);

// // ---------------------- RATE CALCULATOR (optional) ----------------------
// router.post("/calculate-rate", calculateRateController);

// // ---------------------- PINCODE SERVICEABILITY (optional) ----------------------
// router.post("/pincode-serviceability", checkPincodeServiceabilityController);

// // ---------------------- RE-ATTEMPT ORDER (optional) ----------------------
// router.post("/reattempt-order", reattemptOrderController);

// export default router;





// // routes/shippingRoutes.js
// import express from "express";
// import {
//   createWarehouseController,
//   createShipmentController,
//   shipOrderController,
//   generateShippingLabelController,
//   registerPickupController,
//   getShipmentStatusController,
//   getTrackingHistoryController,
//   cancelShipmentController,
//   calculateRateController,
//   checkPincodeServiceabilityController,
//   reattemptOrderController,
//   trackByOrderNumberController,
//   checkDeliveryAvailabilityController  // Add this
// } from "../controllers/shippingController.js";

// const router = express.Router();


// // Direct shipment creation from order (called by orderController)
// router.post("/create-from-order", async (req, res) => {
//   try {
//     const { order, warehouseId } = req.body;
    
//     console.log("=== Create Shipment From Order ===");
//     console.log("Order Number:", order.orderNumber);
//     console.log("Warehouse ID:", warehouseId);
    
//     // Call the same logic as createShipmentController but without req/res
//     const result = await createShipmentWithServiceabilityCheck(order, warehouseId);
    
//     res.status(200).json({
//       success: true,
//       data: result,
//       message: "Shipment created successfully"
//     });
//   } catch (error) {
//     console.error("Create from order error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Shipment creation failed",
//       error: error.message
//     });
//   }
// });

// // ---------------------- WAREHOUSE ----------------------
// router.post("/create-warehouse", createWarehouseController);

// // ---------------------- DELIVERY CHECK ----------------------
// router.post("/check-delivery", checkDeliveryAvailabilityController);

// // ---------------------- SHIPMENT ----------------------
// router.post("/create-shipment", createShipmentController);

// // ---------------------- SHIP ORDER ----------------------
// router.post("/ship-order", shipOrderController);

// // ---------------------- SHIPPING LABEL ----------------------
// router.post("/shipping-label", generateShippingLabelController);

// // ---------------------- REGISTER PICKUP ----------------------
// router.post("/register-pickup", registerPickupController);

// // ---------------------- SHIPMENT STATUS ----------------------
// router.post("/shipment-status", getShipmentStatusController);

// // ---------------------- TRACKING HISTORY ----------------------
// router.post("/tracking-history", getTrackingHistoryController);

// // ---------------------- CANCEL SHIPMENT ----------------------
// router.post("/cancel-shipment", cancelShipmentController);

// // ---------------------- RATE CALCULATOR ----------------------
// router.post("/calculate-rate", calculateRateController);


// router.post("/track-by-order", trackByOrderNumberController);

// // ---------------------- PINCODE SERVICEABILITY ----------------------
// router.post("/pincode-serviceability", checkPincodeServiceabilityController);

// // ---------------------- RE-ATTEMPT ORDER ----------------------
// router.post("/reattempt-order", reattemptOrderController);

// export default router;






// routes/shippingRoutes.js
import express from "express";
import {
  createWarehouseController,
  createShipmentController,
  shipOrderController,
  generateShippingLabelController,
  registerPickupController,
  getShipmentStatusController,
  getTrackingHistoryController,
  cancelShipmentController,
  calculateRateController,
  checkPincodeServiceabilityController,
  reattemptOrderController,
  trackByOrderNumberController,
  checkDeliveryAvailabilityController,
  createShipmentWithServiceabilityCheck , // ✅ Add this import
    updateWarehouseAddress,        // ✅ ADD THIS
  getAllWarehousesController 
} from "../controllers/shippingController.js";

const router = express.Router();

// ✅ Direct shipment creation from order (called by orderController)
router.post("/create-from-order", async (req, res) => {
  try {
    const { order, warehouseId } = req.body;
    
    console.log("=== Create Shipment From Order ===");
    console.log("Order Number:", order?.orderNumber);
    console.log("Warehouse ID:", warehouseId);
    
    // Call the same logic as createShipmentController but without req/res
    const result = await createShipmentWithServiceabilityCheck(order, warehouseId);
    
    res.status(200).json({
      success: true,
      data: result,
      message: "Shipment created successfully"
    });
  } catch (error) {
    console.error("Create from order error:", error);
    res.status(500).json({
      success: false,
      message: "Shipment creation failed",
      error: error.message
    });
  }
});

// ---------------------- WAREHOUSE ----------------------
router.post("/create-warehouse", createWarehouseController);

// ---------------------- DELIVERY CHECK ----------------------
router.post("/check-delivery", checkDeliveryAvailabilityController);

// ---------------------- SHIPMENT ----------------------
router.post("/create-shipment", createShipmentController);

// ---------------------- SHIP ORDER ----------------------
router.post("/ship-order", shipOrderController);

// ---------------------- SHIPPING LABEL ----------------------
router.post("/shipping-label", generateShippingLabelController);

// ---------------------- REGISTER PICKUP ----------------------
router.post("/register-pickup", registerPickupController);

// ---------------------- SHIPMENT STATUS ----------------------
router.post("/shipment-status", getShipmentStatusController);

// ---------------------- TRACKING HISTORY ----------------------
router.post("/tracking-history", getTrackingHistoryController);

// ---------------------- CANCEL SHIPMENT ----------------------
router.post("/cancel-shipment", cancelShipmentController);

// ---------------------- RATE CALCULATOR ----------------------
router.post("/calculate-rate", calculateRateController);

// ---------------------- TRACK BY ORDER ----------------------
router.post("/track-by-order", trackByOrderNumberController);

// ---------------------- PINCODE SERVICEABILITY ----------------------
router.post("/pincode-serviceability", checkPincodeServiceabilityController);

// ---------------------- RE-ATTEMPT ORDER ----------------------
router.post("/reattempt-order", reattemptOrderController);

// Add these routes after your existing routes
// ---------------------- WAREHOUSE MANAGEMENT ----------------------

// Get all warehouses
router.get("/warehouses", getAllWarehousesController);

// Update warehouse
router.put("/warehouse/:warehouseId", updateWarehouseAddress);

// Or using POST (if you prefer)
router.post("/update-warehouse", updateWarehouseAddress);

export default router;