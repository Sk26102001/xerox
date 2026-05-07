


// // models/Order.js
// import mongoose from "mongoose";

// // File schema
// const fileSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   size: { type: Number, required: true },
//   type: { type: String, required: true },
//   status: { type: String, enum: ['uploading', 'done', 'error'], default: 'done' },
//   url: { type: String, default: '' }
// }, { _id: true });

// // Order item schema
// const orderItemSchema = new mongoose.Schema({
//   pages: { type: Number, required: true },
//   copies: { type: Number, required: true },
//   paperSize: { type: String },
//   paperType: { type: String },
//   printColor: { type: String, enum: ['bw', 'color'] },
//   printSide: { type: String, enum: ['single', 'double'] },
//   bindingType: { type: String },
//   lamination: { type: String },
//   instructions: { type: String },
//   files: [fileSchema]
// }, { _id: true });

// // Main order schema
// const orderSchema = new mongoose.Schema({
//   userId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User',
//     required: true 
//   },
//   orderNumber: {
//     type: String,
//     unique: true,
//     required: true
//   },
//   items: [orderItemSchema],
//   orderMode: { 
//     type: String, 
//     enum: ['single', 'bulk'], 
//     default: 'single' 
//   },
//   deliveryType: { 
//     type: String, 
//     enum: ['pickup', 'courier'], 
//     default: 'pickup' 
//   },
//   customer: {
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     address: { type: String },
//     pincode: { type: String },
//     city: { type: String },
//     state: { type: String }
//   },
//   totalAmount: {
//     type: Number,
//     required: true
//   },
//   paymentStatus: {
//     type: String,
//     enum: ['pending', 'paid', 'failed', 'refunded'],
//     default: 'pending'
//   },
//   paymentId: String,        // ✅ Stores Razorpay payment ID (e.g., "pay_xxx")
//   razorpayOrderId: String,   // ✅ Stores Razorpay order ID
//   status: {
//     type: String,
//     enum: ['pending', 'processing', 'completed', 'cancelled'],
//     default: 'pending'
//   },
//   cartId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Cart'
//   },

// shipmentCreated: {
//   type: Boolean,
//   default: false
// },

// shipment: {
//   waybill: String,
//   courier: String,
//   status: String,
//   trackingData: mongoose.Schema.Types.Mixed
// },

//   // ✅ ADD THIS - Links to your Payment model document
//   payment: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Payment'
//   }

// }, { timestamps: true });

// // Indexes
// orderSchema.index({ userId: 1 });
// orderSchema.index({ status: 1 });
// orderSchema.index({ createdAt: -1 });

// const Order = mongoose.model('Order', orderSchema);
// export default Order;





// // models/Order.js
// import mongoose from "mongoose";


// // File schema
// const fileSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   size: { type: Number, required: true },
//   type: { type: String, required: true },
//   status: { type: String, enum: ['uploading', 'done', 'error'], default: 'done' },
//   url: { type: String, default: '' }
// }, { _id: true });

// // Order item schema
// const orderItemSchema = new mongoose.Schema({
//   pages: { type: Number, required: true },
//   copies: { type: Number, required: true },
//   paperSize: { type: String },
//   paperType: { type: String },
//   printColor: { type: String, enum: ['bw', 'color'] },
//   printSide: { type: String, enum: ['single', 'double'] },
//   bindingType: { type: String },
//   lamination: { type: String },
//   instructions: { type: String },
//   files: [fileSchema]
// }, { _id: true });




// const statusHistorySchema = new mongoose.Schema({
//   status: {
//     type: String,
//     enum: ['pending', 'processing', 'printing', 'ready', 'dispatched', 'completed', 'cancelled'],
//     required: true
//   },
//   changedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   changedAt: {
//     type: Date,
//     default: Date.now
//   },
//   note: String
// });



// // Main order schema
// const orderSchema = new mongoose.Schema({
//   userId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User',
//     required: true 
//   },
//   orderNumber: {
//     type: String,
//     unique: true,
//     required: true
//   },

//    statusHistory: [statusHistorySchema],

//   items: [orderItemSchema],
//   orderMode: { 
//     type: String, 
//     enum: ['single', 'bulk'], 
//     default: 'single' 
//   },
//   deliveryType: { 
//     type: String, 
//     enum: ['pickup', 'courier'], 
//     default: 'pickup' 
//   },
//   customer: {
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     address: { type: String },
//     pincode: { type: String },
//     city: { type: String },
//     state: { type: String },
//     landmark: { type: String } // optional, useful for shipping
//   },
//   totalAmount: { type: Number, required: true },
//   paymentStatus: {
//     type: String,
//     enum: ['pending', 'paid', 'failed', 'refunded'],
//     default: 'pending'
//   },
//     paymentMode: {
//     type: String,
//     enum: ['cod', 'upi', 'card', 'bank'],
//     default: 'cod'
//   },

//   paymentId: String,
//   razorpayOrderId: String,
//   razorpayPaymentId: {
//   type: String,
//   default: null
// },
//   // razorpayPaymentId: String,
//   // status: {
//   //   type: String,
//   //   enum: ['pending', 'processing', 'completed', 'cancelled'],
//   //   default: 'pending'
//   // },
//   status: {
//     type: String,
//     enum: ['pending', 'processing', 'printing', 'ready', 'dispatched', 'completed', 'cancelled'],
//     default: 'pending'
//   },


  
//   cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },

//   // ✅ Shipping info
//   shipmentCreated: { type: Boolean, default: false },
//   shipment: {
//     waybill: String,
//     courier: String,
//     status: String,                  // current shipment status
//     labelUrl: String,                // optional: link to PDF/shipping label
//     pickupRegistered: { type: Boolean, default: false },
//     cancelled: { type: Boolean, default: false },
//     lastUpdated: Date,
//     trackingData: mongoose.Schema.Types.Mixed // FShip tracking history
//   },

//   // ✅ Links to your Payment model document
//   payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }

// }, { timestamps: true });

// // Indexes
// orderSchema.index({ userId: 1 });
// orderSchema.index({ status: 1 });
// orderSchema.index({ createdAt: -1 });

// const Order = mongoose.model('Order', orderSchema);
// export default Order;








// models/Order.js
import mongoose from "mongoose";

// File schema
const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  type: { type: String, required: true },
  status: { type: String, enum: ['uploading', 'done', 'error'], default: 'done' },
  url: { type: String, default: '' }
}, { _id: true });

// Order item schema
const orderItemSchema = new mongoose.Schema({
  pages: { type: Number, required: true },
  copies: { type: Number, required: true },
  paperSize: { type: String },
  paperType: { type: String },
  printColor: { type: String, enum: ['bw', 'color'] },
  printSide: { type: String, enum: ['single', 'double'] },
  bindingType: { type: String },
  lamination: { type: String },
  instructions: { type: String },
  files: [fileSchema],
    // ✅ ADD THESE FIELDS
  amount: { type: Number, default: 0 },
  unitPrice: { type: Number, default: 0 }
}, { _id: true });

const statusHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'processing', 'printing', 'ready', 'dispatched', 'completed', 'cancelled'],
    required: true
  },
  changedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  changedAt: {
    type: Date,
    default: Date.now
  },
  note: String
});

// Discount schema for tracking applied discounts
const discountSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['promo', 'offer'],
    required: true
  },
  code: String,
  name: String,
  amount: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: false });

// Main order schema
const orderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  statusHistory: [statusHistorySchema],
  items: [orderItemSchema],
  orderMode: { 
    type: String, 
    enum: ['single', 'bulk'], 
    default: 'single' 
  },
  deliveryType: { 
    type: String, 
    enum: ['pickup', 'courier'], 
    default: 'pickup' 
  },


  deliveryPartner: { type: Number, default: null },
deliveryCharge: { type: Number, default: 0 },
orderWeight: { type: Number, default: 0 },
taxAmount: { type: Number, default: 0 },



  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    pincode: { type: String },
    city: { type: String },
    state: { type: String },
    landmark: { type: String }
  },
  
  // Original amount before any discounts
  totalAmount: { 
    type: Number, 
    required: true 
  },
  
  // Final amount after all discounts (what customer actually pays)
  finalAmount: { 
    type: Number, 
    required: true,
    default: function() {
      return this.totalAmount;
    }
  },
  
  // Total discount amount
  discountAmount: { 
    type: Number, 
    default: null 
  },
  
  // Track all discounts applied
  discountsApplied: {
    promo: discountSchema,
    offer: discountSchema,
    totalDiscount: {
      type: Number,
      default: null
    }
  },
  
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
paymentMode: {
  type: String,
  enum: ['upi', 'card', 'bank', 'wallet'],  // Add 'wallet'
  default: 'upi'
},
  paymentId: String,
  razorpayOrderId: String,
  razorpayPaymentId: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'printing', 'ready', 'dispatched', 'completed', 'cancelled'],
    default: 'pending'
  },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  
  // Shipping info
  shipmentCreated: { type: Boolean, default: false },
  shipment: {
    waybill: String,
    courier: String,
    status: String,
    labelUrl: String,
    pickupRegistered: { type: Boolean, default: false },
    cancelled: { type: Boolean, default: false },
    lastUpdated: Date,
    trackingData: mongoose.Schema.Types.Mixed
  },
  
  // Payment model reference
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }

}, { timestamps: true });

// Indexes
orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
// orderSchema.index({ orderNumber: 1 });

// Virtual to get formatted final amount
orderSchema.virtual('formattedFinalAmount').get(function() {
  return `₹${this.finalAmount.toFixed(2)}`;
});

// Virtual to get formatted discount
orderSchema.virtual('formattedDiscount').get(function() {
  return `₹${this.discountAmount.toFixed(2)}`;
});

// Method to check if discounts were applied
orderSchema.methods.hasDiscounts = function() {
  return this.discountAmount > 0;
};

const Order = mongoose.model('Order', orderSchema);
export default Order;












// // models/Order.js
// import mongoose from "mongoose";

// // File schema
// const fileSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   size: { type: Number, required: true },
//   type: { type: String, required: true },
//   status: { type: String, enum: ['uploading', 'done', 'error'], default: 'done' },
//   url: { type: String, default: '' }
// }, { _id: true });

// // Order item schema
// const orderItemSchema = new mongoose.Schema({
//   pages: { type: Number, required: true },
//   copies: { type: Number, required: true },
//   paperSize: { type: String },
//   paperType: { type: String },
//   printColor: { type: String, enum: ['bw', 'color'] },
//   printSide: { type: String, enum: ['single', 'double'] },
//   bindingType: { type: String },
//   lamination: { type: String },
//   instructions: { type: String },
//   files: [fileSchema]
// }, { _id: true });

// const statusHistorySchema = new mongoose.Schema({
//   status: {
//     type: String,
//     enum: ['pending', 'processing', 'printing', 'ready', 'dispatched', 'completed', 'cancelled'],
//     required: true
//   },
//   changedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   changedAt: {
//     type: Date,
//     default: Date.now
//   },
//   note: String
// });

// // Discount schema for tracking applied discounts
// const discountSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     enum: ['promo', 'offer'],
//     required: true
//   },
//   code: String,
//   name: String,
//   amount: {
//     type: Number,
//     required: true,
//     min: 0
//   }
// }, { _id: false });

// // Main order schema
// const orderSchema = new mongoose.Schema({
//   userId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User',
//     required: true 
//   },
//   orderNumber: {
//     type: String,
//     unique: true,
//     required: true
//   },
//   statusHistory: [statusHistorySchema],
//   items: [orderItemSchema],
//   orderMode: { 
//     type: String, 
//     enum: ['single', 'bulk'], 
//     default: 'single' 
//   },
//   deliveryType: { 
//     type: String, 
//     enum: ['pickup', 'courier'], 
//     default: 'pickup' 
//   },
  
//   // ✅ ADDED delivery partner fields
//   deliveryPartner: { 
//     type: Number, 
//     default: null 
//   },
//   deliveryCharge: { 
//     type: Number, 
//     default: 0 
//   },
  
//   customer: {
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     address: { type: String },
//     pincode: { type: String },
//     city: { type: String },
//     state: { type: String },
//     landmark: { type: String },
//     addressType: {                   // ✅ ADDED
//       type: String,
//       enum: ['Home', 'Office'],
//       default: 'Home'
//     }
//   },
  
//   // Original amount before any discounts
//   totalAmount: { 
//     type: Number, 
//     required: true 
//   },
  
//   // Final amount after all discounts (what customer actually pays)
//   finalAmount: { 
//     type: Number, 
//     required: true,
//     default: function() {
//       return this.totalAmount;
//     }
//   },
  
//   // Total discount amount
//   discountAmount: { 
//     type: Number, 
//     default: null 
//   },
  
//   // Track all discounts applied
//   discountsApplied: {
//     promo: discountSchema,
//     offer: discountSchema,
//     totalDiscount: {
//       type: Number,
//       default: null
//     }
//   },
  
//   paymentStatus: {
//     type: String,
//     enum: ['pending', 'paid', 'failed', 'refunded'],
//     default: 'pending'
//   },
//   paymentMode: {
//     type: String,
//     enum: ['upi', 'card', 'bank', 'wallet'],
//     default: 'upi'
//   },
//   paymentId: String,
//   razorpayOrderId: String,
//   razorpayPaymentId: {
//     type: String,
//     default: null
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'processing', 'printing', 'ready', 'dispatched', 'completed', 'cancelled'],
//     default: 'pending'
//   },
//   cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  
//   // Shipping info
//   shipmentCreated: { type: Boolean, default: false },
//   shipment: {
//     waybill: String,
//     courier: String,
//     status: String,
//     labelUrl: String,
//     pickupRegistered: { type: Boolean, default: false },
//     cancelled: { type: Boolean, default: false },
//     lastUpdated: Date,
//     trackingData: mongoose.Schema.Types.Mixed
//   },
//   fship: {
//   waybill: String,
//   apiOrderId: Number,
//   courier: String,
//   courierId: Number,
//   shippingCharge: Number,
//   status: String,
//   labelUrl: String,
//   pickupStatus: String,
//   lastUpdated: Date
// },
  
//   // Payment model reference
//   payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }

// }, { timestamps: true });

// // Indexes
// orderSchema.index({ userId: 1 });
// orderSchema.index({ status: 1 });
// orderSchema.index({ createdAt: -1 });

// // Virtual to get formatted final amount
// orderSchema.virtual('formattedFinalAmount').get(function() {
//   return `₹${this.finalAmount.toFixed(2)}`;
// });

// // Virtual to get formatted discount
// orderSchema.virtual('formattedDiscount').get(function() {
//   return `₹${this.discountAmount.toFixed(2)}`;
// });

// // Method to check if discounts were applied
// orderSchema.methods.hasDiscounts = function() {
//   return this.discountAmount > 0;
// };

// const Order = mongoose.model('Order', orderSchema);
// export default Order;