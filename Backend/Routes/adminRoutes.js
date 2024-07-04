import express from 'express'
import {productUpload} from '../MiddleWare/Multer.js'
import { adminPost } from '../Controllers/adminController.js'

const AdminRouter = express.Router();

AdminRouter.post("/AdminPost",productUpload,adminPost)

export default AdminRouter;