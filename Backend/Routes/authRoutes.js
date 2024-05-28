import express from "express";
import { verifyToken, singleUpload } from "../MiddleWare/Multer.js";
import { register,login, getUserPic } from "../Controllers/authController.js";

const router = express.Router();

router.post("/register",singleUpload, register);
router.post("/login", login);
router.get("/user",verifyToken, getUserPic)
router.use("/pic", express.static("public/userProfile"))

export default router;