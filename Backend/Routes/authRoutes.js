import express from "express";
import { verifyToken, singleUpload,authenticateToken} from "../MiddleWare/Multer.js";
import { register,login, getUserPic,getUser } from "../Controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register",singleUpload, register);
authRouter.post("/login", login);
authRouter.get("/user",verifyToken, getUserPic)
authRouter.use("/pic", express.static("public/userProfile"))
authRouter.get("/", authenticateToken, getUser);

export default authRouter;