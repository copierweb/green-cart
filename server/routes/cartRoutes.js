import express from "express";
import * as authMiddleware from "../middlewares/authMiddlewares.js";
import * as cartController from "../controllers/cartControllers.js";


const router = express.Router();

router
	.post("/update", authMiddleware.protect, cartController.updateCart)





export default router	