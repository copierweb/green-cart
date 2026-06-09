import express from "express";
import { upload } from "../config/multer.js";
// import * as authController from "../controllers/authControllers.js";
import * as authMiddleware from "../middlewares/authMiddlewares.js";
import * as productController from "../controllers/productControllers.js";

const router = express.Router();

router
	.post(
		"/add",
		upload.array("images", 4),
		authMiddleware.protectSeller,
		productController.addProduct,
	)
	.get("/allproducts", productController.getAllProducts)
	.post(
		"/in-stock",
		authMiddleware.protectSeller,
		productController.changeStock,
	)
	.get("/:prodId", productController.getProductById);

export default router;

// upload.array("images", 4)
// upload.array([images]),
