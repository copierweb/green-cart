import Product from "../models/productModel.js";
import {v2 as cloudinary} from "cloudinary"



// Add Product: POST - /api/v1/product/add
export const addProduct = async (req, res) => {
	let productData = JSON.parse(req.body.productValue);

	const images = req.files

	let imagesUrl = await Promise.all(
		images?.map(async (img) => {
			let result = await cloudinary.uploader.upload(img.path, {
				resource_type: "image",
			});
			return result.secure_url;
		}),
	);

	productData.image = imagesUrl

	const newProduct = await Product.create(productData)

	res.status(201).json({
		status: 'success',
		message: 'new product added successfully',
		product: newProduct
	})
};

// ------------------------------------------------------------- //

// get All products: /api/v1/product/allproducts
export const getAllProducts = async (req, res) => {
	const products = await Product.find()
	
	res.status(200).json({
		status: "success",
		totalProducts:products?.length,
		products
	})
};

// ------------------------------------------------------------- //
// get single product: /api/v1/product/*prodID*
export const getProductById = async (req, res) => {
	const { prodId } = req.params

	const product = await Product.findById(prodId)

	res.status(200).json({
		status: "success",
		product,
	})
};

// ------------------------------------------------------------- //
// change product in stock: /api/v1/product/in-stock
export const changeStock = async (req, res) => {
	const { id, inStock } = req.body

	const product = await Product.findByIdAndUpdate(id, {inStock})

	res.status(201).json({
		status: "success",
		message: "stock updated",
		// product
	})
};




// --------------------------------------------------------------------------- //
// File { name: "how-web-works-0.png", lastModified: 1773760802629, size: 171431 }
// {
//   "name": "iPhone 16",
//   "category": "Mobile",
//   "price": 1000,
//   "offerPrice": 900,
//   "description": [
//     "Latest model",
//     "256GB Storage"
//   ]
// }