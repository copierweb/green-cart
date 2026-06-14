import Product from "../models/productModel.js";
import Order from "../models/OrderModel.js";

// Place Order COD: -> POST-/api/v1/order/cod
export const placeOrderCod = async (req, res) => {

	const { items, address} = req.body;
	const userId = req.user._id;

	if (!address || items?.length === 0) {
		return res.status(500).json({
			status: "fail",
			message: "Invalid Data",
		});
	}

	// calculate Amount Using Items
	// ------------------------- //
	// .reduce method
	// let amount = await items.reduce(async (acc, item) => {
	// 	const product = await Product.findById(item.product);
	
	// 	return (await acc) + (product.offerPrice * item.quantity); //acc becomes a Promise → you have to await acc every time (bad pattern)
	//  }, 0);

	// for---of method
	let amount = 0;

	for (const item of items) {
	  const product = await Product.findById(item.product);
	  if (!product) throw new Error("Product not found");
	  amount += product.offerPrice * item.quantity;
	}

	// Add Tax Charge (2%)
	amount += Math.floor(amount * 0.02);

	// creating Order
	const newOrder = await Order.create({
		userId,
		items,
		amount,
		address,
		paymentType: "COD",
	});

	res.status(200).json({
		status: "success",
		message: "Order placed successfully",
		newOrder,
	});
}

// --------------------------------------------------------------------- //
// get order details of indivitual user by ther id:--> GET-/api/v1/order/user

export const getUserOrders = async (req, res) => {
	const userId = req.user._id;

	const orders = await Order.find({ userId }) //$or:[{payment:"COD", {isPaid: true}}]
		.populate("items.product address")
		.sort({ cretedAt: -1 });

	res.status(200).json({
		status: "success",
		orders,
	});
};

// ------------------------------------------------------------------------- //
// get all order details for Admin/seller: --> GET-/api/v1/order/seller

export const getAllOrders = async (req, res) => {

	const orders = await Order.find({
		//$or:[{payment:"COD", {isPaid: true}}]
	}) 
		.populate("items.product address")
		.sort({ cretedAt: -1 });
	
	res.status(200).json({
		status: "success",
		orders,
	});
};





