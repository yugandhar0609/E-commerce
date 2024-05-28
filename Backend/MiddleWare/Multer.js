import multer from "multer";
import path from "path";
import fs from "fs";
import UserDB from "../Models/UserModels.js";

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





export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied, no token provided" });
    }
    let withoutBearer = token.split(" ")[1];
    if (!withoutBearer) {
      return res
        .status(401)
        .json({ message: "Access denied, no Bearer provided" });
    }
    console.log("withoutBearer",withoutBearer);

    const decoded = jwt.verify(withoutBearer, process.env.JWT_TOKEN);
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
