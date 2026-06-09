import express from "express";
import * as authController from "../controllers/authControllers.js";
import * as authMiddleware from "../middlewares/authMiddlewares.js";

const router = express.Router();

router
	.post("/login", authController.sellerLogin) // POST - /api/v1/seller/login
	.get("/is-auth", authMiddleware.protectSeller, authController.isSellerAuth) // get - /api/v1/seller/is-auth
	.post("/logout", authController.sellerLogout); // POST - /api/v1/seller/logout

export default router;
