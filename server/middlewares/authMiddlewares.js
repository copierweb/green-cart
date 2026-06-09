import AppError from '../error/appError.js';
import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from '../models/UserModel.js';


// creating a middleware protect USER routes//
export const protect = async (req, res, next) => {
	// 1) getting jwt token from cookies
	const token = req.cookies.jwt;
	if (!token) {
		return next(new AppError("You are not logged in ! please login", 401));
	}

	//2) verifying jwt token
	// (with the help of promisify, if token verification fails our global error handler catches the error)
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// 3) Check if user still exists
	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(
			new AppError("The user belong to this token does not exist", 401),
		);
	}

	// in req body setting current user as req.user
	req.user = currentUser;

	next();
};

// ====================================================================== //
// -------------------- SELLER ------------------------- //
// middleware for protect seller based routes

export const protectSeller = async (req, res, next) => {

	const sellerToken = req.cookies.sellerJWT

	if(!sellerToken) {
		return next( new AppError("Not Authorized", 401))
	}

	const decoded = await promisify(jwt.verify)(sellerToken, process.env.JWT_SECRET)

	const isSeller = decoded.id === process.env.SELLER_EMAIL

	if(!isSeller) {
		return next(
			new AppError("Authentication fail", 401), 
		);		
	}

	next()
}