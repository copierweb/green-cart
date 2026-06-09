import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import ProductCard from "./ProductCard";

const ProductList = () => {
	const {
		state: { products },
	} = useAppContext();
	
	const [outOfStock, setoutOfStock] = useState([]);

	const handleCheckChange = (e) => {
		const { checked , value } = e.target;
		// console.log(e.target.value);
		if (checked) {
			setoutOfStock((prev) => [...prev, value]);
		} else {
			setoutOfStock((prev) => prev.filter((item) => item !== value));
		}
	};

	return (
		<div>
			<h1 className="text-gray-600 text-xl font-medium">All Product</h1>
			<div
				className="
					mt-8
					border border-gray-300 rounded-md shadow-lg
					divide-y divide-gray-300
				"
			>
				<div
					className="
						py-2 md:py-4 md:px-8
						text-gray-800 text-lg font-medium
						grid md:grid-cols-[2fr_1fr_1fr_auto]
						grid-cols-3
						justify-items-center md:justify-items-start
					"
				>
					<h2 className="max-sm:text-sm">Product</h2>
					<h2 className="max-sm:text-sm">Category</h2>
					<h2 className="hidden md:block">Selling Price</h2>
					<h2 className="max-sm:text-sm">In Stock</h2>
				</div>
				<div
					className="
						flex flex-col
						divide-y divide-gray-300
					"
				>
					{products?.map((product) => (
						<ProductCard 
							product={product} 
							key={product._id} 
							outOfStock={outOfStock}
							onChange={(e)=> handleCheckChange(e)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductList;
