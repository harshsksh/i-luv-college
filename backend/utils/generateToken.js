import jwt from "jsonwebtoken";

const generateTokenandSetCookie = (user, res) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expiration remains 1 day for security reasons
  });

  res.cookie("i-luv-college-login-token", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use Secure flag in production
    sameSite: "lax", // Lax allows some cross-site requests, more compatible with iOS
  });
};

export default generateTokenandSetCookie;
