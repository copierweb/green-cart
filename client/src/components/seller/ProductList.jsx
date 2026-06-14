import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast"

const ProductList = () => {
	const {
		state: { products },
		axios,
		fetchProducts,
	} = useAppContext();

	const [outOfStock, setoutOfStock] = useState([]);

	// const handleCheckChange = (e) => {
	// 	const { checked , value } = e.target;
	// 	// console.log(e.target.value);
	// 	if (checked) {
	// 		setoutOfStock((prev) => [...prev, value]);
	// 	} else {
	// 		setoutOfStock((prev) => prev.filter((item) => item !== value));
	// 	}
	// };

	const handleCheckChange = async (id, inStock) => {
		try {
			const { data } = await axios.post("/api/v1/product/in-stock", {
				id,
				inStock,
			});
			if (data.status === "success") {
				fetchProducts()
				toast.success(data.message)
			} else {
				toast.error(data.message)
			}
		} catch (err) {
			toast.error(err.response.data.message || err.message)
			console.log(err.message);
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
							onChange={handleCheckChange}
							// onChange={() =>
							// 	handleCheckChange(product._id, !product.inStock)
							// }
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductList;
