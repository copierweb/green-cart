import express from "express";
import * as authMiddleware from "../middlewares/authMiddlewares.js";
import * as addressController from "../controllers/addressControllers.js";


const router = express.Router();

router
	.post("/add", authMiddleware.protect, addressController.addAddress)
	.get("/get", authMiddleware.protect, addressController.getAddress)




export default router	