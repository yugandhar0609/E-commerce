import express from 'express';
import { verifyToken } from '../MiddleWare/auth.js';
import { getUserProfile } from '../Controllers/authController.js';
import { getUserCart, addToCart, removeFromCart } from '../Controllers/cartController.js';

const cartRouter = express.Router();

// Cart routes
cartRouter.get('/cart/:userId', verifyToken, getUserCart);
cartRouter.post('/cart/:userId/add', verifyToken, addToCart);
cartRouter.post('/cart/:userId/remove', verifyToken, removeFromCart);

export default cartRouter;
