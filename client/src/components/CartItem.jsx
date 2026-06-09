import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import useCartActions from "../hooks/useCartActions";

const CartItem = ({ id }) => {
	const { updateCartItem, removeFromCart } = useCartActions();

	const {
		state: { products, cartItems },
		navigate,
	} = useAppContext();

	const item = products?.find((item) => item._id === id);
	const itemQuantity = cartItems[item?._id];
	const subTotal = itemQuantity * item.offerPrice;

	return (
		item && (
			<div className="flex md:items-center justify-between">
				<div
					className="
					 flex flex-col md:flex-row md:items-center 
					gap-2
				"
				>
					<div
						className="
						w-24 h-24
						p-2 
						border border-gray-400 rounded-md
					"
					>
						<img
							src={item.image[0]}
							alt={item.name}
							className="
								w-full h-full object-cover 
								cursor-pointer 
							"
							onClick={() => {
								navigate(
									`/products/${item.category.toLowerCase()}/${item._id}`,
								);
								scrollTo(0, 0);
							}}
						/>
					</div>
					<div className=" flex flex-col items-center gap-1">
						<h2 className="text-lg text-gray-600 font-medium">
							{item.name}
						</h2>
						<p className="text-md text-gray-400 font-normal">
							Weight:{ item.weight || "N/A" }
						</p>
						<div>
							<label
								htmlFor="Quantity"
								className="text-md text-gray-400 font-normal"
							>
								Qty:
							</label>
							<select
								name="Quantity"
								id="Quantity"
								value={itemQuantity || ""}
								onChange={(e) => {
									updateCartItem(
										item._id,
										e.target.value * 1,
									);
								}}
								className="text-md text-gray-400 font-normal"
							>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
							</select>
						</div>
					</div>
				</div>
				<p className="text-lg text-gray-600">${subTotal}</p>
				<div className="">
					<img
						src={assets.remove_icon}
						alt="close-button"
						className="cursor-pointer"
						onClick={() => {
							removeFromCart(item._id);
						}}
					/>
				</div>
			</div>
		)
	);
};

export default CartItem;
