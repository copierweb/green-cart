import express from "express";
import * as authController from "../controllers/authControllers.js";
import * as userController from "../controllers/userControllers.js";
import * as authMiddleware from "../middlewares/authMiddlewares.js";

const router = express.Router();

// user register/login/logout
router
	.post("/register", authController.register) // POST - /api/v1/users/register
	.post("/login", authController.login) // POST - /api/v1/users/login
	.post("/logout", authController.logout); // POST - /api/v1/users/logout

// adding me end point
router.get("/me", authMiddleware.protect, userController.getCurrentUserDetails);

// getting all users route
router.route("/").get(userController.getAllUsers); // get - /api/v1/users

export default router;
