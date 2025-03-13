// backend/middleware/requireAuth.js
import jwt from "jsonwebtoken";
import User from "../Schema/User.js";

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, msg: "No authorization header" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, msg: "Invalid Bearer token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    if (!userId) {
      return res.status(401).json({ success: false, msg: "Invalid token payload" });
    }

    // Find user in DB
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // Attach user to req so next handlers can access it
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
