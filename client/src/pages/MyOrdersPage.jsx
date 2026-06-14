import { useState, useEffect } from "react";
import { dummyOrders } from "../assets/assets";
import OrderItemCard from "../components/OrderItemCard";
import toast from "react-hot-toast"
import { useAppContext } from "../context/AppContext";

const MyOrdersPage = () => {
	const [orders, setOrders] = useState([]);

	const {state, axios} = useAppContext()

	const fetchMyOrders = async ()=> {
		try {
			const {data} = await axios.get('/api/v1/order/user')

			if(data.status === "success") {
				setOrders(data.orders);
			} else {
				toast.error(data.message || "something went wrong")
			}

		} catch(err) {
			toast.error(err.response?.data.message || err.message)
			console.log(err.response?.data.message || err.message);
		}
		
	}

	useEffect(() => {
		if(state.user) {
			fetchMyOrders()
		}
	}, [state.user]);

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
