import { useAppContext } from "../context/AppContext";
import Product from "./Product";

const BestSeller = () => {
	const {
		state: { products },
	} = useAppContext();
	const productsCopy = [...products];
	const bestSellers = productsCopy
		.filter((product) => product.inStock)
		.slice(4, 9);

	return (
		<div
			className="
				
			"
		>
			<h1
				className="
					font-semibold text-3xl text-gray-600
					max-sm:text-center
				"
			>
				BestSeller
			</h1>

			<div
				className="
					flex flex-wrap
					justify-between gap-4 
					mt-4
				"
			>
				{bestSellers?.map((product) => (
					<Product
						product={product}
						key={product._id}
						onClick={() => {
							navigate(`/products/${product._id}`);
							scrollTo(0, 0);
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default BestSeller;
