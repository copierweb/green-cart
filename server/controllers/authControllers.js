import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import AppError from "../error/appError.js";
import { promisify } from "util";

const cookieOptions = {
	httpOnly: true, // Prevent Javascript to access cookie
	secure: process.env.NODE_ENV === "production", // (true or false value) use secure cookie in production(true)
	sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // CSRF protection
	// sameSite: "lax",
	maxAge: 90 * 24 * 60 * 60 * 1000, // converting 7 days into milliseconds(cookie expiration time)
};

// ------------------------------------------------------------------------
// helper function for generating jwt token
const generateToken = (id) => {
	const token = jwt.sign(
		{
			id: id, // or just id
		},
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRES_IN,
		},
	);

	return token;
};

// ------------------------------------------------------------------------
// Register new user and login after creation : /api/v1/users/register
export const register = async (req, res) => {
	const { name, email, password } = req.body;
	// if(!req.body) return res.status(200).json({message: "fail"})

	// 1). check email is alredy exists in the data base
	const existingUser = await User.findOne({ email });

	if (existingUser) {
		return res.status(400).json({
			status: "fail",
			message: "email already exists.Use another email",
		});
	}

	// 2).if provided email is not in the database, creating new user
	const newUser = await User.create({
		name,
		email,
		password,
	});

	// 3).generating jwt token and send token to client
	const token = generateToken(newUser._id);
	res.cookie("jwt", token, cookieOptions);

	// remove the password from response
	newUser.password = undefined;

	res.status(201).json({
		status: "success",
		token,
		user: newUser,
	});
};

// ------------------------------------------------------------------------
// -- authentication .. //
// login existing user : /api/v1/users/login

export const login = async (req, res, next) => {
	const { email, password } = req.body;

	// 1). checking email and password are provided
	if (!email || !password) {
		return next(new AppError("please provide email and password", 401));
	}

	// 2). check user exists and password is correct
	const user = await User.findOne({ email }).select("+password");

	if (!user || !(await user.checkPassword(password))) {
		return next(new AppError("Incorrect password or email", 400));
	}

	// 3) if everything is ok send jwt token
	const token = generateToken(user._id);
	res.cookie("jwt", token, cookieOptions);

	user.password = undefined;

	res.status(200).json({
		status: "success",
		message: "user loggedin successfull",
		user,
	});
};
// -------------------------------------------------------------------------- //
// logout current loggedin user ---> /api/v1/users/logout

export const logout = async (req, res) => {
	res.clearCookie("jwt", cookieOptions);

	res.status(200).json({
		status: "success",
		message: "user successfully Logged out",
	});
};



// ======================================================================= //
// -------- SELLER Controllers -------------//
// seller-Authentication: SELLER login --> /api/v1/seller/login

export const sellerLogin = async (req, res, next) => {
	const { email, password } = req.body;

	// 1). checking email and password are provided
	if (!email || !password) {
		return next(new AppError("please provide email and password", 401));
	}

	// 2). check seller email and password is correct
	if (
		!(email === process.env.SELLER_EMAIL) ||
		!(password === process.env.SELLER_PASSWORD)
	) {
		return next(new AppError("Incorrect seller password or email", 400));
	}

	// 3). if email and password is correct create jwt token
	const token = generateToken(email)

	// 4) sending jwt token
	res.cookie("sellerJWT", token, cookieOptions);

	res.status(200).json({
		status: "success",
		message: "seller logedin successfully"
	})
};

// --------------------------------------------------------------------- //
// Seller Auth : /api/v1/seller/is-auth
export const isSellerAuth = async (req, res) => {
	res.status(200).json({status: "success"})
}
// --------------------------------------------------------------------- //

// seller logOut: /api/v1/seller/logout

export const sellerLogout = async (req, res) => {
	res.clearCookie("sellerJWT", cookieOptions);

	res.status(200).json({
		status: "success",
		message: "seller successfully Logged out",
	});
};