import express from "express";
import { authMiddleware, singleUpload } from "../MiddleWare/Multer.js";
import { register,login, getUserPic } from "../Controllers/authController.js";

const router = express.Router();

router.post("/register",singleUpload, register);
router.post("/login", login);
router.get("/user",authMiddleware, getUserPic)

export default router;