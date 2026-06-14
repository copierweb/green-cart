import { useState, useEffect } from "react";
import Button from "../components/Button";
import CartItem from "../components/CartItem";
import { useAppContext } from "../context/AppContext";
import { assets, dummyAddress } from "../assets/assets";
import useCartActions from "../hooks/useCartActions";
import toast from "react-hot-toast";

const CartPage = () => {
	const [addresses, setAddresses] = useState([]);
	const [selectedAddresses, setSelectedAddresses] = useState(null);
	const [showAddAddress, setShowAddAddress] = useState(false);

	const [paymentOption, setPaymentOption] = useState("COD");

	const { getTotalPrice, getCartItemCount } = useCartActions();

	const {
		axios,
		state: { cartItems, user },
		navigate,
		actions,
	} = useAppContext();

	const cartItemsIDs = Object.keys(cartItems);


	const tax = (getTotalPrice() * 2) / 100;
	const totalAmount = getTotalPrice() + tax;
// ---------------------------------------------------------------
	// function for getting address from DB
	const getUserAddress = async () => {
		try {
			const { data } = await axios.get("/api/v1/address/get");

			if (data.status === "success") {
				setAddresses(data.address);

				if (data.address?.length > 0) {
					setSelectedAddresses(data.address[0]);
				}
			} else {
				toast.error(data.message || "something went wrong");
			}
		} catch (err) {
			toast.error(err.response?.data.message || err.message);
			console.log(err.response?.data.message || err.message);
		}
	};
// -----------------------------------------------
	// place order function
	const placeOrder = async (e) => {
		e.preventDefault();

		try {
			if (!setSelectedAddresses) {
				return toast.error("Please Select An Address");
			}

			// place Oreder With COD
			if (paymentOption === "COD") {
				
				const { data } = await axios.post("/api/v1/order/cod", {
					items: cartItemsIDs.map((id)=> ({
						product: id,
						quantity: cartItems[id]
					})),
					address: selectedAddresses._id,
				});

				if(data.status === "success") {
					toast.success(data.message)
					actions.setCart({})
					navigate("/my-orders")
					
				} else {
					toast.error(data.message || "something went wrong")
				}
			}
		} catch (err) {
			toast.error(err.response?.data.message || err.message)
			console.log(err.response?.data.message || err.message);
		}
	};
// -------------------------------------------------------------
	// calling getUserAddress function (only user is available then only this function is executed)
	useEffect(() => {
		if (user) {
			getUserAddress();
		}
	}, [user]);
// ------------------------------------------------------------
	return (
		<div className="flex flex-col md:flex-row max-sm:gap-8 md:gap-20">
			{/*---- shopping cart -----*/}
			<div className="md:flex-3 flex flex-col gap-5">
				<div className="flex gap-2 items-center">
					<h1 className="text-gray-800 text-3xl font-semibold">
						Shopping Cart
					</h1>{" "}
					<span className="text-primary">
						{getCartItemCount()} items
					</span>
				</div>
				<div className="flex justify-between ">
					<div className=" text-gray-600">Product Details</div>
					<div className=" text-gray-600">Subtotal</div>
					<div className=" text-gray-600">Action</div>
				</div>
				<div className="flex flex-col gap-4">
					{cartItemsIDs.length > 0 ? (
						cartItemsIDs.map((productID) => (
							<CartItem id={productID} key={productID} />
						))
					) : (
						<div>
							<p className="text-center">no items in cart</p>
						</div>
					)}
				</div>
				<div
					className="flex gap-2 cursor-pointer group"
					onClick={() => navigate("/products")}
				>
					<img
						src={assets.arrow_right_icon_colored}
						alt="arrow-left"
						className="
							w-5
							transition-transform duration-300
							group-hover:-translate-x-2

						"
					/>
					<h2 className="text-primary font-medium">
						Continue Shopping
					</h2>
				</div>
			</div>

			{/*------ order Summary -------*/}
			<div
				className="
					md:flex-1
					flex flex-col gap-5
					p-4 
					bg-gray-200 
					rounded-lg 
				"
			>
				<div className="border-b border-gray-400">
					<h1
						className="
							pb-3
							text-gray-800 text-2xl 
							font-semibold
						"
					>
						Order Summary
					</h1>
				</div>
				{/*delivery address*/}
				<div className="flex flex-col gap-6">
					<div>
						<h2 className="text-gray-800 text-lg font-medium">
							DELIVERY ADDRESS
						</h2>
						<div
							className="
							flex justify-between items-center relative"
						>
							{selectedAddresses ? (
								<p className="text-gray-600">
									{selectedAddresses.street},
									{selectedAddresses.city},
									{selectedAddresses.state},
									{selectedAddresses.country},
								</p>
							) : (
								<p className="text-gray-600">
									No address found
								</p>
							)}

							<span
								className="text-primary cursor-pointer"
								onClick={() =>
									setShowAddAddress((prev) => !prev)
								}
							>
								Change
							</span>
							{showAddAddress && (
								<div
									className="
										py-1 w-full
										text-sm bg-white
										border border-gray-300
										absolute top-12
									"
								>
									{addresses.map((address, index) => (
										<p
											className="text-gray-500 p-2 
												hover:bg-gray-100 
												cursor-pointer"
											onClick={() => {
												setShowAddAddress(false);
												setSelectedAddresses(address);
											}}
											key={index}
										>
											{address.firstName},{address.street}
										</p>
									))}
									<p
										className="text-gray-500 p-2 
											hover:bg-gray-100 cursor-pointer"
										onClick={() => {
											navigate("/add-address");
										}}
									>
										Add Address
									</p>
								</div>
							)}
						</div>
					</div>
					{/*payment method*/}
					<div className="border-b border-gray-400 pb-2">
						<h2 className="text-gray-800 text-lg font-medium">
							PAYMENT METHOD
						</h2>
						<select
							name=""
							id=""
							className="
								w-full 
								text-gray-600
								py-2 px-2
								border border-gray-400 
								rounded-md
							"
							onChange={(e) => setPaymentOption(e.target.value)}
						>
							<option value="COD">Cash On Delivery</option>
							<option value="online">Online Payment</option>
						</select>
					</div>
					{/*price section*/}
					<div className="flex flex-col gap-1">
						<div className="flex justify-between">
							<p className="text-lg text-gray-600 font-normal">
								price
							</p>
							<p className="text-lg text-gray-600 font-normal">
								${getTotalPrice()}
							</p>
						</div>
						<div className="flex justify-between">
							<p className="text-lg text-gray-600 font-normal">
								Shipping Fee
							</p>
							<p className="text-lg text-primary font-normal">
								free
							</p>
						</div>
						<div className="flex justify-between">
							<p className="text-lg text-gray-600 font-normal">
								Tax (2%)
							</p>
							<p className="text-lg text-gray-600 font-normal">
								${tax}
							</p>
						</div>
						<div className="flex justify-between">
							<p className="text-xl text-gray-600 font-medium">
								Total Amount:
							</p>
							<p className="text-xl text-gray-600 font-medium">
								${totalAmount}
							</p>
						</div>
					</div>
					<Button
						className="font-bold text-lg justify-center"
						onClick={placeOrder}
					>
						{paymentOption === "COD"
							? "Place Order"
							: "Proceed to Checkout"}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
