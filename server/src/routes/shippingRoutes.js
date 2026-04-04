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
  checkDeliveryAvailabilityController  // Add this
} from "../controllers/shippingController.js";

const router = express.Router();

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


router.post("/track-by-order", trackByOrderNumberController);

// ---------------------- PINCODE SERVICEABILITY ----------------------
router.post("/pincode-serviceability", checkPincodeServiceabilityController);

// ---------------------- RE-ATTEMPT ORDER ----------------------
router.post("/reattempt-order", reattemptOrderController);

export default router;