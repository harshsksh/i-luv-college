import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma-client.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["i-luv-college-login-token"]; // Use the correct cookie name

    if (!token) {
      return res.status(401).json({ error: "Login First" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid User" });
    }

    const username = decoded.user.username;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
