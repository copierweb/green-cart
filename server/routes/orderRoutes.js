import express from 'express'
import * as authMiddleware from "../middlewares/authMiddlewares.js";
import * as orderController from '../controllers/orderControllers.js'

const router = express.Router()


router
	.post("/cod", authMiddleware.protect, orderController.placeOrderCod)
	.get("/user", authMiddleware.protect, orderController.getUserOrders)
	.get("/seller", authMiddleware.protectSeller, orderController.getAllOrders)



export default router	