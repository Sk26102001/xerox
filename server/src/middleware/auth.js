// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const auth = async (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: "No token" });
//   }

//   try {
//     const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

//     req.user = await User.findById(decoded.id).select("-password");
//     // add this line 👇
// req.user.id = req.user._id;

//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default auth;



import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id || decoded.user?.id).select("-password");
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // ✅ Set both user and user.id for compatibility
    req.user = user;
    req.user.id = user._id;

    next();
  } catch (error) {
    console.error("Auth error:", error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    
    res.status(401).json({ message: "Authentication failed" });
  }
};

export default auth;