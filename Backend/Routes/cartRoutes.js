import express from "express";
import {
  getCartItems,
  addItemToCart,
  removeItemFromCart,
} from "../Controllers/cartController.js";
import { verifyToken } from "./../MiddleWare/Multer.js";

const router = express.Router();

router.get("/:userId", verifyToken, getCartItems);
router.post("/:userId/add", verifyToken, addItemToCart);
router.post("/:userId/remove", verifyToken, removeItemFromCart);

export default router;
