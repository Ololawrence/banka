import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const checkAuthToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers.authorization;

  if (!token) {
    res.status(401).json({
      status: res.statusCode,
      error: "Access Denied. No Token Provided",
    });
    return;
  }
  try {
    if (token.startsWith("Bearer ")) token = token.slice(7, token.length);
    const decoded = jwt.verify(token, process.env.KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(500).json({
      error: "Invalid Token",
      message:err
    });
  }
};

export default checkAuthToken;
