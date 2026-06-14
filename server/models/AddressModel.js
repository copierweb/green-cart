import mongoose from "mongoose"

const addressScheme = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},

	firstName: {
		type: String,
		required: [true,"please enter firstName"],
	},	

	lastName: {
		type: String,
		required: [true,"please enter lastName"],
	},	

	email: {
		type: String,
		required: [true,"please enter email"],
	},	

	street: {
		type: String,
		required: [true,"please enter street"],
	},	

	city: {
		type: String,
		required: [true,"please enter city"],
	},

	state: {
		type: String,
		required: [true,"please enter state"],
	},	

	zipcode: {
		type: Number,
		required: [true,"please enter zipcode"],
	},	

	country: {
		type: String,
		required: [true,"please enter country"],
	},	

	phone: {
		type: Number,
		required: [true,"please enter phone"],
	},									
})

const Address = mongoose.models.Address || mongoose.model("Address", addressScheme)

export default Address