import express from 'express';
import { getUserCart, addToCart, removeFromCart } from '../controllers/cartController.js';
import { verifyToken } from '../MiddleWare/auth.js';

const cartRouter = express.Router();

cartRouter.get('/cart/:userId', verifyToken, getUserCart);
cartRouter.post('/cart/:userId/add', verifyToken, addToCart);
cartRouter.post('/cart/:userId/remove', verifyToken, removeFromCart);

export default cartRouter;
