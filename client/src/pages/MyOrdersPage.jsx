import { useState, useEffect } from "react";
import { dummyOrders } from "../assets/assets";
import OrderItemCard from "../components/OrderItemCard";

const MyOrdersPage = () => {
	const [orders, setOrders] = useState([]);

	const fetchMyOrders = async ()=> {
		setOrders(dummyOrders);
	}

	useEffect(() => {
		fetchMyOrders()
	}, []);

	return (
		<div>
			<h1
				className="
					relative inline-block 
					text-2xl text-gray-800 font-semibold
					after:absolute after:content-[''] 
					after:w-25 after:h-1 after:bg-primary
					after:right-0 after:-bottom-2
				"
			>
				My orders
			</h1>
			{orders.length === 0 ? (
				<div className="mt-10">
					<p>There is no Order</p>
				</div>
			) : (
				<div className="mt-10 flex flex-col gap-5">
					{orders?.map((order) => (
						<div
							className="
								p-4
								flex flex-col gap-3
								border border-gray-400 
								rounded-md shadow-lg
							"
							key={order._id}
						>
							<div 
								className="
									md:flex md:justify-between
									p-3 bg-gray-100 shadow-lg
								"
							>
								<p className="text-gray-500">
									OrderId: {order._id}
								</p>
								<p className="text-gray-500">
									Payment: {order.paymentType}
								</p>
								<p className="text-primary text-lg font-medium">
									Total Amount : ${order.amount}
								</p>
							</div>
							
							<ul className="divide-y divide-gray-400 
									flex flex-col gap-3
								"
							>
								{order?.items?.map((item) => (
									
									<OrderItemCard 
										item={item} 
										key={item._id}
										status={order.status} 
										date={order.updatedAt}
									/>
								))}

							</ul>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default MyOrdersPage;
