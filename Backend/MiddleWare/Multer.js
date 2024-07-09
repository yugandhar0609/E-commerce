import multer from "multer";
import path from "path";
import fs from "fs";
import UserDB from "../Models/UserModels.js";
import jwt from 'jsonwebtoken'
import AdminDB from '../Models/adminModels.js';

//Resisger Upload
const uploadsDir = path.join("public", "userProfile");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const uniqueId = Date.now();
    const fileFormat = file.originalname.split(".").pop();
    const fileName = file.originalname.split(".")[0];
    cb(null, `${fileName}-${uniqueId}.${fileFormat}`);
  },
});

const upload = multer({ storage: storage });

export const singleUpload = upload.single("picture");

//Admin upload Image

const uploadsAdmin = path.join('public', 'productImage');
if (!fs.existsSync(uploadsAdmin)) {
  fs.mkdirSync(uploadsAdmin, { recursive: true });
}

const adminStorage = multer.diskStorage({
  destination: uploadsAdmin,
  filename: (req, file, cb) => {
    const uniqueId = Date.now();
    const fileFormat = file.originalname.split('.').pop();
    const fileName = file.originalname.split('.')[0];
    cb(null, `${fileName}-${uniqueId}.${fileFormat}`);
  }
});

const adminUpload = multer({ storage: adminStorage });
export const productUpload = adminUpload.single('image');



// Middleware to verify token
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Access denied, no token provided" });
    }

    console.log("Authorization Header:", authHeader);

    const tokenParts = authHeader.split(" ");
    if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
      return res.status(401).json({ message: "Access denied, malformed token" });
    }

    const token = tokenParts[1];
    console.log("JWT Token:", token);

    const decoded = jwt.verify(token, process.env.jwt_Token);
    const user = await UserDB.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Access denied, invalid token" });
    }

    req.user = user; // Set req.user to the authenticated user
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(500).json({ message: "Failed to authenticate user" });
  }
};


export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const jwtSecret = process.env.jwt_Token;
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};