// import User from "../models/User.js";

// export const getUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };




// import User from "../models/User.js";

// /**
//  * Get all users (Admin only)
//  * - Excludes password field
//  * - Supports optional query params for filtering/pagination/sorting
//  * - Returns user list with basic info
//  */
// export const getUsers = async (req, res) => {
//   try {
//     // Optional query parameters (you can extend these as needed)
//     const { 
//       page = 1, 
//       limit = 20, 
//       sortBy = "createdAt", 
//       sortOrder = "desc", 
//       role, 
//       search 
//     } = req.query;

//     // Build query object
//     const query = {};

//     // Filter by role if provided (e.g. ?role=admin or ?role=user)
//     if (role && ["user", "admin"].includes(role)) {
//       query.role = role;
//     }

//     // Search by name or email (partial match, case-insensitive)
//     if (search) {
//       query.$or = [
//         { name: { $regex: search.trim(), $options: "i" } },
//         { email: { $regex: search.trim(), $options: "i" } },
//         { phone: { $regex: search.trim(), $options: "i" } },
//       ];
//     }

//     // Pagination & sorting
//     const pageNum = parseInt(page, 10);
//     const limitNum = parseInt(limit, 10);
//     const skip = (pageNum - 1) * limitNum;

//     const sort = {};
//     sort[sortBy] = sortOrder === "asc" ? 1 : -1;

//     // Fetch users
//     const users = await User.find(query)
//       .select("-password -resetOtp -resetOtpExpiry") // exclude sensitive fields
//       .sort(sort)
//       .skip(skip)
//       .limit(limitNum);

//     // Get total count for pagination info
//     const total = await User.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       count: users.length,
//       total,
//       page: pageNum,
//       pages: Math.ceil(total / limitNum),
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
// };






import User from "../models/User.js";
import Order from "../models/Order.js";

/**
 * Get all users (Admin only)
 * - Excludes password field
 * - Supports optional query params for filtering/pagination/sorting
 * - Returns user list with basic info and order statistics
 */
export const getUsers = async (req, res) => {
  try {
    // Optional query parameters
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

    // Filter by role if provided (e.g. ?role=admin or ?role=user)
    if (role && ["user", "admin"].includes(role)) {
      query.role = role;
    }

    // Search by name, email, or phone (partial match, case-insensitive)
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
      .select("-password -resetOtp -resetOtpExpiry") // exclude sensitive fields
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination info
    const total = await User.countDocuments(query);

    // Get order statistics for each user
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
};

/**
 * Get single user by ID (Admin only)
 */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select("-password -resetOtp -resetOtpExpiry");

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Get user's order statistics
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
    
    // Handle invalid ObjectId
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
};

/**
 * Get user's orders (Admin only)
 */
export const getUserOrders = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Fetch all orders for this user with pagination
    const { page = 1, limit = 20, status } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build query
    const query = { userId: id };
    if (status) {
      query.status = status;
    }

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
};

/**
 * Update user status (active/inactive)
 */
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

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

    // Prevent deactivating admin users (optional security)
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
};

/**
 * Delete user (Admin only)
 * - Cannot delete admin users
 * - Optionally delete associated orders
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { deleteOrders = false } = req.query; // Optional: delete associated orders

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
};

/**
 * Get user statistics (Admin only)
 */
export const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const inactiveUsers = await User.countDocuments({ isActive: false });
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const customerUsers = await User.countDocuments({ role: 'user' });

    // Get recent user registrations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const newUsersLast30Days = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Get total spending across all users
    const allOrders = await Order.find();
    const totalSpending = allOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        adminUsers,
        customerUsers,
        newUsersLast30Days,
        totalSpending
      }
    });
  } catch (error) {
    console.error("Get user stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user statistics",
      error: error.message
    });
  }
};