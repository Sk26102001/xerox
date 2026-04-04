// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: String,
//     email: {
//       type: String,
//       unique: true
//     },
    
//     password: String,
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user"
//     }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", userSchema);


// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//   email: {
//   type: String,
//   required: true,
//   unique: true,
//   lowercase: true,
//   trim: true,
//   match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
// },

//     phone: {
//       type: String,
//       required: true,
//       unique: true,
//       match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
//     },

//    password: {
//   type: String,
//   required: true,
//   select: false,
// },

//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", userSchema);


// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
//     },

//     phone: {
//       type: String,
//       required: true,
//       unique: true,
//       match: [/^\+?[1-9]\d{9,14}$/, "Invalid phone number"],
//     },

//     password: {
//       type: String,
//       required: true,
//       select: false, // 🔥 hidden by default
//     },

//     otp: String,
//   otpExpiry: Date,

//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },

//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// // Indexes
// userSchema.index({ email: 1 });
// userSchema.index({ phone: 1 });

// export default mongoose.model("User", userSchema);




// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//       match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
//     },

//     phone: {
//       type: String,
//       required: true,
//       unique: true,
//       match: [/^\+?[1-9]\d{9,14}$/, "Invalid phone number"],
//     },

//     password: {
//       type: String,
//       required: true,
//       select: false, // hidden by default
//     },

//     // ── Password Reset OTP fields ────────────────────────────────
//     resetOtp: {
//       type: String,
//       select: false,          // never return in queries by default
//     },
//     resetOtpExpiry: {
//       type: Date,
//       select: false,
//     },

//     // Optional: track last successful login
//     lastLogin: {
//       type: Date,
//     },

//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },

//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// // Indexes
// // userSchema.index({ email: 1 });
// // userSchema.index({ phone: 1 });

// // Optional: compound index if you frequently query by email + role
// // userSchema.index({ email: 1, role: 1 });

// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
      match: [/^\+?[1-9]\d{9,14}$/, "Invalid phone number"],
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    resetOtp: {
      type: String,
      select: false,
    },
    resetOtpExpiry: {
      type: Date,
      select: false,
    },

    lastLogin: {
      type: Date,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// NO pre-save hooks here - completely removed

export default mongoose.model("User", userSchema);