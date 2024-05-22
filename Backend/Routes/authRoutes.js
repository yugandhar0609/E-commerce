import express from "express";
import { singleUpload } from "../MiddleWare/Multer.js";
import { register,login } from "../Controllers/authController.js";

const router = express.Router();

router.post("/register",singleUpload, register);
router.post("/login", login);

export default router;