import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "must have a product Name"],
	},
	description: {
		type: Array,
		required: [true, "must have a description"]
	},
	price: {
		type: Number,
		required: [true, "must have a product price"],
	},	
	offerPrice: {
		type: Number,
		required: [true, "must have a product offerPrice"],
	},
	image: {
		type: Array,
		required: [true, "must have a product image"],
	},	
	category: {
		type: String,
		required: [true, "must have a product category"],
	},					
	inStock: {
		type: Boolean,
		default: true
	},		
}, {timeStamp: true})




// creating model
const Product = mongoose.models.product || mongoose.model('Product', productSchema)





export default Product


