import Button from "./Button";
import CartIcon from "../assets/cart_icon.svg?react";
import RatingStars from "./RatingStars";
import { useAppContext } from "../context/AppContext";
import useCartActions  from '../hooks/useCartActions';

const Product = ({ product }) => {
	const { name, category, price, offerPrice, image, _id } = product;

	const {
		state: { cartItems },
		navigate,
		// addToCart,
		// removeFromCart,
	} = useAppContext();

	const { addToCart, removeFromCart }  = useCartActions()

	return (
		<div
			className="
				lg:flex-1
				px-2 py-4
				border border-gray-400 rounded-lg
				flex flex-col gap-1 
				items-center
				group 				
			"
		>
			<img
				src={image[0]}
				alt={name}
				className="
					group-hover:scale-110
					transition-transform duration-300
					max-w-40 h-auto max-sm:max-w-34
					cursor-pointer
				"
				onClick={()=>{
					navigate(`/products/${category.toLowerCase()}/${_id}`)
					scrollTo(0,0)
				}}
			/>
			<p
				className="
					text-xs text-gray-600 
					font-normal
				"
			>
				{category}
			</p>

			<h2
				className="
					text-gray-800 text-lg font-semibold
				"
			>
				{name}
			</h2>

			<RatingStars rating={4} />

			<div
				className="
					flex md:justify-center items-center md:gap-5
					max-sm:flex-col gap-4
					mt-3 
				"
			>
				<h1 className="text-2xl text-primary font-semibold">
					${offerPrice}
					<span
						className="
							text-sm text-gray-400 
							font-normal
							ml-1
							line-through
						"
					>
						${price}
					</span>
				</h1>
				{!cartItems[_id] ? (
					<Button
						variant="outline"
						iconLeft={<CartIcon className="text-primary" />}
						onClick={()=> addToCart(_id)}
					>
						Add
					</Button>
				) : (
					<div
						className="
							py-2 px-6
							text-sm text-primary 
							bg-gray-200
							border border-primary 
							shadow-lg rounded-md
							flex items-center gap-3
							transition-all duration-300
						"
					>
						<button 
							className="cursor-pointer hover:scale-150"
							onClick={() => removeFromCart(_id)}
						>
							-
						</button>
						<span>{cartItems[_id]}</span>
						<button
							className="cursor-pointer hover:scale-150"
							onClick={() => addToCart(_id)}
						>
							+
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Product;

// w-40 h-40
// max-w-6 max-h-6
// max-lg:flex-col max-lg:gap-5
