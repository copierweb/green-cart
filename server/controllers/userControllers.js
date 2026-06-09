import User from '../models/UserModel.js';

// gettin all users details
export const getAllUsers = async(req, res) => {

	const users = await User.find()

	res.status(200).json({
		status: 'success',
		users,
	})
}

// ---------------------------------------------------------- //
// getting loged in user details

export const getCurrentUserDetails = async(req, res) => {
	const userId = req.user.id
	const loggedInUser = req.user
	// const user = await User.findById(userId);

	res.status(200).json({
		status: "success",
		loggedInUser,
	})
}


// ------------------------------------------------------------- //