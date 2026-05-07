// import mongoose from "mongoose";

// const cartItemSchema = new mongoose.Schema({
//   pages: { type: Number, required: true },
//   copies: { type: Number, required: true },

//   paperSize: String,
//   paperType: String,

//   printColor: { type: String, enum: ['bw', 'color'] },
//   printSide: { type: String, enum: ['single', 'double'] },

//   bindingType: String,
//   lamination: String,
//   instructions: String,

//   pricePerCopy: { type: Number, default: 0 },
//   totalPrice: { type: Number, default: 0 },

//   files: [
//     {
//       name: String,
//       size: Number,
//       type: String,
//       status: String,
//       url: String
//     }
//   ]
// }, { _id: true });

// const cartSchema = new mongoose.Schema({
//   userId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User',
//     required: true,
//     unique: true 
//   },

//   items: [cartItemSchema],

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
//     name: String,
//     phone: String,
//     address: String,
//     pincode: String,
//     city: String,
//     state: String
//   },

//   totals: {
//     printingCost: { type: Number, default: 0 },
//     gst: { type: Number, default: 0 },
//     totalWithDelivery: { type: Number, default: 0 }
//   },

//   status: {
//     type: String,
//     enum: ['active', 'ordered'],
//     default: 'active'
//   },

//   payment: {
//     razorpayOrderId: String,
//     razorpayPaymentId: String,
//     razorpaySignature: String,
//     status: {
//       type: String,
//       enum: ['pending', 'success', 'failed'],
//       default: 'pending'
//     }
//   }

// }, { timestamps: true });

// export default mongoose.model("Cart", cartSchema);  // ✅ IMPORTANT





// import mongoose from "mongoose";

// // File schema
// const fileSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   size: { type: Number, required: true },
//   type: { type: String, required: true },
//   status: { type: String, enum: ['uploading', 'done', 'error'], default: 'done' },
//   url: { type: String, default: '' }
// }, { _id: true }); // ✅ Allow _id for each file

// // Cart item schema
// const cartItemSchema = new mongoose.Schema({
//   pages: { type: Number, required: true },
//   copies: { type: Number, required: true },
//   paperSize: { type: String },
//   paperType: { type: String },
//   printColor: { type: String, enum: ['bw', 'color'] },
//   printSide: { type: String, enum: ['single', 'double'] },
//   bindingType: { type: String },
//   lamination: { type: String },
//   instructions: { type: String },
//   files: [fileSchema] // ✅ Array of file objects, NOT strings
// }, { _id: true });

// // Main cart schema
// const cartSchema = new mongoose.Schema({
//   userId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User',
//     required: true,
//     unique: true 
//   },
//   items: [cartItemSchema],
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
//     name: { type: String },
//     phone: { type: String },
//     address: { type: String },
//     pincode: { type: String },
//     city: { type: String },
//     state: { type: String }
//   },
//   totals: {
//     printingCost: { type: Number, default: 0 },
//     gst: { type: Number, default: 0 },
//     totalWithDelivery: { type: Number, default: 0 }
//   },
//   status: {
//     type: String,
//     enum: ['active', 'ordered'],
//     default: 'active'
//   },
//   payment: {
//     razorpayOrderId: String,
//     razorpayPaymentId: String,
//     razorpaySignature: String,
//     status: {
//       type: String,
//       enum: ['pending', 'success', 'failed'],
//       default: 'pending'
//     }
//   }
// }, { timestamps: true });

// export default mongoose.model("Cart", cartSchema);




import mongoose from "mongoose";

// File schema
const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  type: { type: String, required: true },
  status: { type: String, enum: ['uploading', 'done', 'error'], default: 'done' },
  url: { type: String, default: '' }
}, { _id: true });

// Cart item schema
const cartItemSchema = new mongoose.Schema({
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
  amount: { type: Number, default: 0 },      // Add this
  unitPrice: { type: Number, default: 0 }    // Add this
}, { _id: true });

// Main cart schema
const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
    unique: true 
  },
  items: [cartItemSchema],
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
  
  // ✅ ADDED missing fields
  deliveryPartner: { 
    type: Number, 
    default: null 
  },
  deliveryCharge: { 
    type: Number, 
    default: 0 
  },
  
  customer: {
    name: { type: String },
    phone: { type: String },
    address: { type: String },
    pincode: { type: String },
    city: { type: String },
    state: { type: String },
    landmark: { type: String },      // ✅ ADDED
    addressType: {                   // ✅ ADDED
      type: String,
      enum: ['Home', 'Office'],
      default: 'Home'
    }
  },
  
  totals: {
    printingCost: { type: Number, default: 0 },
    gst: { type: Number, default: 0 },
    totalWithDelivery: { type: Number, default: 0 }
  },
  
  status: {
    type: String,
    enum: ['active', 'ordered'],
    default: 'active'
  },
  
  payment: {
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending'
    }
  }
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);