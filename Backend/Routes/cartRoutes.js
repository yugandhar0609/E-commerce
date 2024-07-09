import express from "express";
import {
  getCartItems,
  addItemToCart,
  removeItemFromCart,
} from "../Controllers/cartController.js";
import { verifyToken } from "./../MiddleWare/Multer.js";

const cartRouter = express.Router();

cartRouter.get("/:userId", verifyToken, getCartItems);
cartRouter.post("/:userId/add", verifyToken, addItemToCart);
cartRouter.post("/:userId/remove", verifyToken, removeItemFromCart);

export default cartRouter;
