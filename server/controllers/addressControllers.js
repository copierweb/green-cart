import Address from '../models/AddressModel.js';

// add new address : POST : /api/v1/address/add
export const addAddress = async(req, res) => {
	const { address } = req.body
	const userId = req.user._id

	const newAddress = await Address.create({...address, userId})

	res.status(200).json({
		status: "success",
		message: "New Address created",
		address: newAddress
	})
}

// ------------------------------------------------------------------ //
// Get AllAddress - GET: /api/v1/address/get
export const getAddress = async(req, res) => {
	const  id  = req.user._id

	const address = await Address.find({userId:id})

	res.status(200).json({
		status: "success",
		address
	})
}