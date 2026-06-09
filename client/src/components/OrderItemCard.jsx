// import { dummyProducts } from "../assets/assets";

const OrderItemCard = ({ item, status, date }) => {
	const { product } = item;
	const crtDate = new Date(date).toLocaleDateString()

	return (
		<li
			className="
				px-2 py-4
				flex flex-col md:flex-row md:justify-between md:items-center
			"
		>
			<div className="flex items-center gap-2">
				<div>
					<img
						src={product?.image[0]}
						alt={product.name}
						className="w-24 h-24"
					/>
				</div>
				<div>
					<h2 className="text-lg text-gray-800 font-medium">
						{product.name}
					</h2>
					<p className="text-md text-gray-500">
						Category: {product.category}
					</p>
				</div>
			</div>
			<div>
				<p className="text-md text-gray-500"> 
					Quantity: {item.quantity}
				</p>
				<p className="text-md text-gray-500"> 
					Status: {status}
				</p>
				<p className="text-md text-gray-500"> 
					Date: {crtDate}
				</p>							
			</div>
			<div>
				<p className="text-lg text-gray-600 font-medium">
					Amount: ${product.offerPrice * item.quantity}
				</p>
			</div>
		</li>
	);
};

export default OrderItemCard;

// grid grid-cols-1 md:grid-cols-3
