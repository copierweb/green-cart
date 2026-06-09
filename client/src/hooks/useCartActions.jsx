import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const useCartActions = () => {
	const { state, actions } = useAppContext(); // actions = dispatch functions
	const { products, cartItems } = state;

	// cart item count
	const getCartItemCount = () => {
		return Object.values(state.cartItems).reduce(
			(acc, item) => acc + item,
			0,
		);
	};

	// Add Product to cart
	const addToCart = (itemId) => {
		let cartData = state.cartItems;

		if (cartData[itemId]) {
			cartData[itemId] += 1;
		} else {
			cartData[itemId] = 1;
		}

		actions.addProduct(cartData); // caling dispatch
		toast.success("Added to Cart");
	};

	// Update Cart Item Quantity
	const updateCartItem = (itemId, quantity) => {
		let cartData = structuredClone(state.cartItems);

		cartData[itemId] = quantity;

		actions.updateCart(cartData); // caling dispatch
		toast.success(" Cart Updated");
	};

	// remove item from cart
	const removeFromCart = (itemId) => {
		let cartData = structuredClone(state.cartItems);

		if (cartData[itemId]) {
			cartData[itemId] -= 1;

			if (cartData[itemId] === 0) {
				delete cartData[itemId];
			}
		}

		// delete cartData[itemId]

		actions.removeProduct(cartData); // caling dispatch
		toast.success("Removed from Cart");
	};

	// calculate total cart items price (tax not included)
	const getTotalPrice = () => {
		const proIds = Object.keys(cartItems);

		const total = proIds?.reduce((acc, id) => {
			const prodInfo = products?.find((product) => product._id === id);

			acc += prodInfo?.offerPrice * cartItems[id];

			return acc;
		}, 0);

		return total;
	};

	return {
		addToCart,
		updateCartItem,
		removeFromCart,
		getTotalPrice,
		getCartItemCount,
	};
};

export default useCartActions;
