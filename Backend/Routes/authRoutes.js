import express from "express";
import { singleUpload} from "../MiddleWare/Multer.js";
import { verifyToken } from "../MiddleWare/auth.js";

import { register,login, getUserPic,getUser } from "../Controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register",singleUpload, register);
authRouter.post("/login", login);
authRouter.get("/user",verifyToken, getUserPic)
authRouter.use("/pic", express.static("public/userProfile"))
authRouter.get("/", verifyToken, getUser);

export default authRouter;