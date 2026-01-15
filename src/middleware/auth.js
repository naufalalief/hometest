const jwt = require("jsonwebtoken");
require("dotenv").config();
const { errorResponse } = require("../helper/response");
function auth(req, res, next) {
  let token = req.header("Authorization");
  if (token?.startsWith("Bearer ")) token = token.slice(7).trim();
  if (!token) return errorResponse(res, 401, "Token tidak ditemukan");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return errorResponse(res, 401, "Token tidak valid");
  }
}

module.exports = auth;
