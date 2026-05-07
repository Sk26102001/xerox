// import express from "express";
// import auth from "../middleware/auth.js";
// import adminAuth from "../middleware/adminAuth.js";
// import User from "../models/User.js";

// const router = express.Router();

// router.get("/", auth, adminAuth, async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });

// export default router;





// import express from "express";
// import auth from "../middleware/auth.js";
// import adminAuth from "../middleware/adminAuth.js";
// import User from "../models/User.js";

// const router = express.Router();

// // GET ALL USERS (Admin only)
// router.get("/", auth, adminAuth, async (req, res) => {
//   try {
//     const users = await User.find().select("-password"); // 🔥 hide password
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;



// import express from "express";
// import auth from "../middleware/auth.js";
// import adminAuth from "../middleware/adminAuth.js";
// import User from "../models/User.js";

// const router = express.Router();

// // GET ALL USERS - Admin only
// router.get("/", auth, adminAuth, async (req, res) => {
//   try {
//     const users = await User.find()
//       .select("-password -resetOtp -resetOtpExpiry") // exclude ALL sensitive fields
//       .sort({ createdAt: -1 }); // newest first

//     res.status(200).json({
//       success: true,
//       count: users.length,
//       data: users,
//     });
//   } catch (error) {
//     console.error("Get users error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch users",
//       error: error.message,
//     });
//   }
// });

// // Optional: GET SINGLE USER (by ID) - Admin only
// router.get("/:id", auth, adminAuth, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id)
//       .select("-password -resetOtp -resetOtpExpiry");

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.status(200).json({ success: true, data: user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });





// export default router;
import express from "express";
import auth from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import mongoose from "mongoose";

const router = express.Router();

// Helper function to validate ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// GET ALL USERS - Admin only (with pagination, search, and role filter)
router.get("/", auth, adminAuth, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      sortBy = "createdAt", 
      sortOrder = "desc", 
      role, 
      search 
    } = req.query;

    // Build query object
    const query = {};

    // Filter by role if provided
    if (role && ["user", "admin"].includes(role)) {
      query.role = role;
    }

    // Search by name, email, or phone
    if (search && search.trim()) {
      query.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { email: { $regex: search.trim(), $options: "i" } },
        { phone: { $regex: search.trim(), $options: "i" } },
      ];
    }

    // Pagination & sorting
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Fetch users
    const users = await User.find(query)
      .select("-password -resetOtp -resetOtpExpiry")
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const total = await User.countDocuments(query);

    // Get order stats for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const orders = await Order.find({ userId: user._id });
        const totalOrders = orders.length;
        const totalSpending = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        
        return {
          ...user.toObject(),
          totalOrders,
          totalSpending
        };
      })
    );

    res.status(200).json({
      success: true,
      count: usersWithStats.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      users: usersWithStats,
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});

// GET USER ORDERS - Admin only (must come before /:id)
router.get("/:id/orders", auth, adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }
    
    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Get pagination params
    const { page = 1, limit = 20, status } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build query
    const query = { userId: id };
    if (status) {
      query.status = status;
    }

    // Fetch all orders for this user with pagination
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('payment', 'status paymentMethod');

    const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      orders
    });
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
      error: error.message
    });
  }
});

// UPDATE USER STATUS - Admin only (must come before /:id)
router.put("/:id/status", auth, adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }

    // Validate isActive is boolean
    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: "isActive must be a boolean value"
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Prevent deactivating admin users
    if (user.role === 'admin' && !isActive) {
      return res.status(403).json({
        success: false,
        message: "Cannot deactivate admin users"
      });
    }

    user.isActive = isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error("Update user status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user status",
      error: error.message
    });
  }
});

// DELETE USER - Admin only (must come before /:id)
router.delete("/:id", auth, adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { deleteOrders = false } = req.query;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Prevent deleting admin users
    if (user.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: "Cannot delete admin users"
      });
    }

    // Delete associated orders if requested
    if (deleteOrders === 'true') {
      await Order.deleteMany({ userId: id });
    }

    // Delete the user
    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: `User deleted successfully${deleteOrders === 'true' ? ' with associated orders' : ''}`
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message
    });
  }
});

// GET SINGLE USER (by ID) - Admin only (MUST BE LAST)
router.get("/:id", auth, adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }

    const user = await User.findById(id)
      .select("-password -resetOtp -resetOtpExpiry");

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Get user's order stats
    const orders = await Order.find({ userId: user._id });
    const totalOrders = orders.length;
    const totalSpending = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    res.status(200).json({ 
      success: true, 
      user: {
        ...user.toObject(),
        totalOrders,
        totalSpending
      }
    });
  } catch (error) {
    console.error("Get user by ID error:", error);
    
    // Handle cast error
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch user",
      error: error.message 
    });
  }
});

export default router;