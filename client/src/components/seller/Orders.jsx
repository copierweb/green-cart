import { useEffect, useState } from "react";
import { dummyOrders } from "../../assets/assets";
import OrderCard from "./OrderCard";
import { useAppContext } from "../../context/AppContext";

const Orders = () => {
	const [totalOrders, setTotalOrders] = useState([]);

	const {axios, state} = useAppContext()

	const fetchOrders = async () => {
		try {
			const {data} = await axios.get('/api/v1/order/seller')

			if(data.status === "success") {
				setTotalOrders(data.orders);
			} else {
				toast.error(data.message || "something went wrong")
			}

		} catch(err) {
			toast.error(err.response?.data.message || err.message)
			console.log(err.response?.data.message || err.message);
		}
	};

	useEffect(() => {
		if(state.isSeller) {
			fetchOrders();
		}
	}, [state.isSeller]);

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
