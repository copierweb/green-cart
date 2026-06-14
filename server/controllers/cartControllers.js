import User from '../models/UserModel.js';

// Update User CartData : POST:/api/v1/cart/update

export const updateCart = async(req, res) => {
	const { cartData } = req.body


	await User.findByIdAndUpdate(req.user._id, {cartItems:cartData})

	res.status(200).json({
		status: "success",
		message: "Cart Updated"
	})
}