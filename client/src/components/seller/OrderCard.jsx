import { assets } from "../../assets/assets";
// import { useAppContext } from "../../context/AppContext"

const OrderCard = ({ order }) => {
	// const { state:{product}} = useAppContext()

	return (
		<div
			className="
				px-4 py-4
				border border-gray-300 rounded-md
				flex flex-col md:flex-row 
				md:justify-between md:items-center gap-4
			"
		>
			<div className="flex gap-3 items-center">
				<div className="border border-gray-300 w-16 rounded-md">
					<img
						src={assets.box_icon}
						alt="order-icon"
						className="w-full h-auto"
					/>
				</div>
				<div>
					{order.items?.map((item) => (
						<p key={item._id} className="text-gray-800">
							{item.product.name}{" "}
							<span className="text-primary">
								x {item.quantity}
							</span>
						</p>
					))}
				</div>
			</div>
			<div className="text-gray-500">
				<p className="text-gray-700">
					{order.address.firstName} {order.address.lastName}
				</p>
				<p>
					{order.address.street}, {order.address.city}
				</p>
				<p>
					{order.address.state}, {order.address.zipcode}
				</p>
				<p>
					{order.address.country} 
				</p>											
			</div>
			<p className="text-gray-800 text-xl font-medium">
				${order.amount}
			</p>
			<div className="text-gray-500">
				<p>Method: {order.paymentType}</p>
				<p>Date: {new Date(order.updatedAt).toLocaleDateString()}</p>
				<p>Payment: {order.isPaid ? 'Paid' : 'Pending'}</p>
			</div>
		</div>
	);
};

export default OrderCard;
