// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import generateToken from "../utils/generateToken.js";

// export const register = async (req, res) => {
//   const { name, email, password,role } = req.body;

//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//     role: role === "admin" ? "admin" : "user" // ensure only admin or default
//   });

//   res.json({
//     token: generateToken(user._id)
//   });
// };

// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({
//       token: generateToken(user._id)
//     });
//   } else {
//     res.status(401).json({ message: "Invalid credentials" });
//   }
// };


// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import generateToken from "../utils/generateToken.js";

// // REGISTER
// export const register = async (req, res) => {
//   const { name, email, password, role } = req.body;

//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//     role: role === "admin" ? "admin" : "user"
//   });

//   res.status(201).json({
//     token: generateToken(user._id),
//     user: {
//       name: user.name,
//       email: user.email,
//       role: user.role
//     }
//   });
// };

// // LOGIN
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     res.json({
//       token: generateToken(user._id),
//       user: {
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import generateToken from "../utils/generateToken.js";

// import crypto from "crypto";
// import { sendOtpEmail } from "../utils/sendEmail.js";

// export const register = async (req, res) => {
//   const { name, email, phone, password } = req.body;

//   try {
//     if (!name || !email || !phone || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const emailExists = await User.findOne({ email });
//     if (emailExists) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     const phoneExists = await User.findOne({ phone });
//     if (phoneExists) {
//       return res.status(400).json({ message: "Phone already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//       role: "user"
//     });

//     res.status(201).json({
//       token: generateToken(user._id),
//       user: {
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role
//       }
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
// export const login = async (req, res) => {
//   const { emailOrPhone, password } = req.body;

//   try {
//     if (!emailOrPhone || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const user = await User.findOne({
//       $or: [
//         { email: emailOrPhone },
//         { phone: emailOrPhone }
//       ]
//     }).select("+password");

//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     res.json({
//       token: generateToken(user._id),
//       user: {
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role
//       }
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     user.otp = otp;
//     user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min

//     await user.save();

//     await sendOtpEmail(email, otp);

//     res.json({ message: "OTP sent to your email" });

//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };








// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import generateToken from "../utils/generateToken.js";
// import crypto from "crypto";
// import { sendOtpEmail } from "../utils/sendEmail.js";

// export const register = async (req, res) => {
//   const { name, email, phone, password } = req.body;

//   try {
//     if (!name || !email || !phone || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const emailExists = await User.findOne({ email });
//     if (emailExists) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     const phoneExists = await User.findOne({ phone });
//     if (phoneExists) {
//       return res.status(400).json({ message: "Phone already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email: email.toLowerCase(),
//       phone,
//       password: hashedPassword,
//       role: "user"
//     });

//     res.status(201).json({
//       token: generateToken(user._id),
//       user: {
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     console.error("Register error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const login = async (req, res) => {
//   const { emailOrPhone, password } = req.body;

//   try {
//     if (!emailOrPhone || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const user = await User.findOne({
//       $or: [
//         { email: emailOrPhone.toLowerCase() },
//         { phone: emailOrPhone }
//       ]
//     }).select("+password");

//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     res.json({
//       token: generateToken(user._id),
//       user: {
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const user = await User.findOne({ email: email.toLowerCase() });

//     if (!user) {
//       return res.status(404).json({ message: "No account found with this email" });
//     }

//     // Generate 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Store OTP and expiry (5 minutes)
//     user.resetOtp = otp;
//     user.resetOtpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

//     await user.save();

//     // Send OTP via email
//     await sendOtpEmail(email, otp);

//     res.status(200).json({ message: "OTP sent to your email" });
//   } catch (error) {
//     console.error("Forgot password error:", error);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// export const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   try {
//     const user = await User.findOne({ email: email.toLowerCase() })
//       .select("+resetOtp +resetOtpExpiry +password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     console.log("DB OTP:", user.resetOtp);
//     console.log("INPUT OTP:", otp);

//     // FIXED OTP CHECK
//     if (
//       !user.resetOtp ||
//       String(user.resetOtp).trim() !== String(otp).trim()
//     ) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     // Expiry check
//     if (!user.resetOtpExpiry || user.resetOtpExpiry < Date.now()) {
//       return res.status(400).json({ message: "OTP has expired" });
//     }

//     if (newPassword.length < 6) {
//       return res.status(400).json({ message: "Password must be at least 6 characters" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);

//     user.resetOtp = undefined;
//     user.resetOtpExpiry = undefined;

//     await user.save();

//     res.status(200).json({ message: "Password reset successful" });
//   } catch (error) {
//     console.error("Reset password error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };




// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import generateToken from "../utils/generateToken.js";
// import crypto from "crypto";
// import { sendOtpEmail } from "../utils/sendEmail.js";

// export const register = async (req, res) => {
//   const { name, email, phone, password } = req.body;

//   try {
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Name, email, and password are required" });
//     }

//     const emailExists = await User.findOne({ email });
//     if (emailExists) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     // Make phone optional
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const userData = {
//       name,
//       email: email.toLowerCase(),
//       password: hashedPassword,
//       role: "user"
//     };

//     // Only add phone if provided
//     if (phone) {
//       const phoneExists = await User.findOne({ phone });
//       if (phoneExists) {
//         return res.status(400).json({ message: "Phone already exists" });
//       }
//       userData.phone = phone;
//     }

//     const user = await User.create(userData);

//     res.status(201).json({
//       success: true,
//       token: generateToken(user._id),
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone || '',
//         role: user.role
//       }
//     });
//   } catch (error) {
//     console.error("Register error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const login = async (req, res) => {
//   const { emailOrPhone, password } = req.body;

//   try {
//     if (!emailOrPhone || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const user = await User.findOne({
//       $or: [
//         { email: emailOrPhone.toLowerCase() },
//         { phone: emailOrPhone }
//       ]
//     }).select("+password");

//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Update last login
//     user.lastLogin = new Date();
//     await user.save();

//     res.json({
//       success: true,
//       token: generateToken(user._id),
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone || '',
//         role: user.role
//       }
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const user = await User.findOne({ email: email.toLowerCase() });

//     if (!user) {
//       return res.status(404).json({ message: "No account found with this email" });
//     }

//     // Generate 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Store OTP and expiry (5 minutes)
//     user.resetOtp = otp;
//     user.resetOtpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

//     await user.save();

//     // Send OTP via email
//     await sendOtpEmail(email, otp);

//     res.status(200).json({ 
//       success: true,
//       message: "OTP sent to your email" 
//     });
//   } catch (error) {
//     console.error("Forgot password error:", error);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// export const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   try {
//     const user = await User.findOne({ email: email.toLowerCase() })
//       .select("+resetOtp +resetOtpExpiry +password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     console.log("DB OTP:", user.resetOtp);
//     console.log("INPUT OTP:", otp);

//     // FIXED OTP CHECK
//     if (
//       !user.resetOtp ||
//       String(user.resetOtp).trim() !== String(otp).trim()
//     ) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     // Expiry check
//     if (!user.resetOtpExpiry || user.resetOtpExpiry < Date.now()) {
//       return res.status(400).json({ message: "OTP has expired" });
//     }

//     if (newPassword.length < 6) {
//       return res.status(400).json({ message: "Password must be at least 6 characters" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);

//     user.resetOtp = undefined;
//     user.resetOtpExpiry = undefined;

//     await user.save();

//     res.status(200).json({ 
//       success: true,
//       message: "Password reset successful" 
//     });
//   } catch (error) {
//     console.error("Reset password error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ============ PROFILE MANAGEMENT FUNCTIONS ============

// // Get current user profile (protected)
// export const getCurrentUser = async (req, res) => {
//   try {
//     console.log("Getting current user, req.user:", req.user);
    
//     // User is already attached by auth middleware
//     if (!req.user) {
//       return res.status(401).json({ 
//         success: false,
//         message: "User not authenticated" 
//       });
//     }

//     // Fetch fresh user data
//     const user = await User.findById(req.user._id).select("-password -resetOtp -resetOtpExpiry");
    
//     if (!user) {
//       return res.status(404).json({ 
//         success: false,
//         message: "User not found" 
//       });
//     }

//     res.json({
//       success: true,
//       data: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone || '',
//         role: user.role,
//         isActive: user.isActive !== undefined ? user.isActive : true,
//         isVerified: user.isVerified !== undefined ? user.isVerified : false,
//         createdAt: user.createdAt,
//         lastLogin: user.lastLogin
//       }
//     });
//   } catch (error) {
//     console.error("Get current user error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to fetch user profile",
//       error: error.message 
//     });
//   }
// };

// // Update user profile (protected)
// export const updateProfile = async (req, res) => {
//   try {
//     console.log("Update profile request body:", req.body);
//     console.log("User from token:", req.user);
    
//     const { name, email, currentPassword, newPassword } = req.body;
    
//     // Get user with password field
//     const user = await User.findById(req.user._id).select("+password");
    
//     if (!user) {
//       return res.status(404).json({ 
//         success: false,
//         message: "User not found" 
//       });
//     }

//     // Update name if provided
//     if (name && name.trim()) {
//       user.name = name.trim();
//     }

//     // Update email if provided and changed
//     if (email && email.trim() && email.toLowerCase() !== user.email) {
//       // Check if email is already taken
//       const existingUser = await User.findOne({ email: email.toLowerCase() });
//       if (existingUser && existingUser._id.toString() !== user._id.toString()) {
//         return res.status(400).json({
//           success: false,
//           message: "Email already in use by another account",
//         });
//       }
//       user.email = email.toLowerCase();
//     }

//     // Update password if provided
//     if (currentPassword && newPassword) {
//       // Verify current password
//       const isMatch = await bcrypt.compare(currentPassword, user.password);
//       if (!isMatch) {
//         return res.status(400).json({
//           success: false,
//           message: "Current password is incorrect",
//         });
//       }

//       // Validate new password length
//       if (newPassword.length < 6) {
//         return res.status(400).json({
//           success: false,
//           message: "New password must be at least 6 characters",
//         });
//       }

//       // Hash new password
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(newPassword, salt);
//     }

//     await user.save();

//     // Return updated user without sensitive fields
//     res.json({
//       success: true,
//       message: "Profile updated successfully",
//       data: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone || '',
//         role: user.role,
//         isActive: user.isActive,
//         isVerified: user.isVerified,
//         createdAt: user.createdAt,
//         lastLogin: user.lastLogin
//       }
//     });
//   } catch (error) {
//     console.error("Update profile error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to update profile",
//       error: error.message 
//     });
//   }
// };



import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import { sendOtpEmail } from "../utils/sendEmail.js";

export const register = async (req, res) => {
  const { name, email, phone, password, role = "user" } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // Phone validation for users only
    if (role === "user" && (!phone || phone.trim() === '')) {
      return res.status(400).json({ message: "Phone number is required for user registration" });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role === "admin" ? "admin" : "user"
    };

    // Only add phone if provided
    if (phone && phone.trim()) {
      const phoneExists = await User.findOne({ phone });
      if (phoneExists) {
        return res.status(400).json({ message: "Phone already exists" });
      }
      userData.phone = phone;
    }

    const user = await User.create(userData);

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role
      }
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    console.log("Login attempt for:", emailOrPhone);
    
    if (!emailOrPhone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({
      $or: [
        { email: emailOrPhone.toLowerCase() },
        { phone: emailOrPhone }
      ]
    }).select("+password");

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.isActive === false) {
      return res.status(401).json({ message: "Account is deactivated. Please contact admin." });
    }

    // ONLY update lastLogin - this is the only save operation
    user.lastLogin = new Date();
    await user.save(); // This is line 828

    const token = generateToken(user._id);

    res.json({
      success: true,
      token: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role
      }
    });
    
  } catch (error) {
    console.error("Login error details:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "No account found with this email" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP and expiry (5 minutes)
    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    // Send OTP via email
    await sendOtpEmail(email, otp);

    res.status(200).json({ 
      success: true,
      message: "OTP sent to your email" 
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() })
      .select("+resetOtp +resetOtpExpiry +password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.resetOtp || String(user.resetOtp).trim() !== String(otp).trim()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (!user.resetOtpExpiry || user.resetOtpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetOtp = undefined;
    user.resetOtpExpiry = undefined;

    await user.save();

    res.status(200).json({ 
      success: true,
      message: "Password reset successful" 
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get current user profile
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: "User not authenticated" 
      });
    }

    const user = await User.findById(req.user._id).select("-password -resetOtp -resetOtpExpiry");
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
        isActive: user.isActive !== undefined ? user.isActive : true,
        isVerified: user.isVerified !== undefined ? user.isVerified : false,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch user profile"
    });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user._id).select("+password");
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Update name if provided
    if (name && name.trim()) {
      user.name = name.trim();
    }

    // Update email if provided and changed
    if (email && email.trim() && email.toLowerCase() !== user.email) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res.status(400).json({
          success: false,
          message: "Email already in use by another account",
        });
      }
      user.email = email.toLowerCase();
    }

    // Update password if provided
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: "New password must be at least 6 characters",
        });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
        isActive: user.isActive,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to update profile"
    });
  }
};