import User from '../models/UserModel.js';

// Update User CartData : /api/v1/cart/update

export const updateCart = async(req, res) => {
	const { cartItems } = req.body

	await User.findByIdAndUpdate(req.user._id, {cartItems})

	res.status(200).json({
		status: "success",
		message: "Cart Updated"
	})
}