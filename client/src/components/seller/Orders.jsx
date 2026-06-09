import { useEffect, useState } from "react";
import { dummyOrders } from "../../assets/assets";
import OrderCard from "./OrderCard";

const Orders = () => {
	const [totalOrders, setTotalOrders] = useState([]);

	const fetchOrders = async () => {
		setTotalOrders(dummyOrders);
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	return (
		<div>
			<h1 className="text-gray-600 text-xl font-medium">All Product</h1>
			<div className="flex flex-col gap-3 mt-10">
				{totalOrders?.map((order) => (
					<OrderCard key={order._id} order={order}/>
				))}
			</div>
		</div>
	);
};

export default Orders;
