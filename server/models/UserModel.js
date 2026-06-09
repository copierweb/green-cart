import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "must have a Name"],
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: [true, "must have an email"]
	},
	password: {
		type: String,
		required: [true, "password can not be empty"],
		select: false
	},	
	cartItems: {
		type: Object,
		default: {}
	},		
}, {minimize: false})

// -----------------------------------------------------------------------------

// ========= middlewares========= //

// document middleware for hashing the password : (runs only for .save() or .create())
userSchema.pre('save', async function() {
	// if password is not modified don't hash the password
	if(!this.isModified('password')) return 

	this.password = await bcrypt.hash(this.password, 12)

	
})

// -------------------------------------------------------------------------- //
// ---- authentication (when login check password is correct) --- //
// (creating an instance method for checkin the password (available on all documents of User collection))

userSchema.methods.checkPassword = async function(typedPassword) {
	return await bcrypt.compare(typedPassword, this.password)
}

// creating model
const User = mongoose.model('User', userSchema)





export default User