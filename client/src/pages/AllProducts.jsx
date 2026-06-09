import { useAppContext } from "../context/AppContext";
import Product from "../components/Product";
import { useEffect, useState } from "react";

const AllProducts = () => {
	const { state } = useAppContext();
	const [filteredProducts, setFilteredProducts] = useState([]);

	const allProducts = state.products;
	const searchQuery = state.searchQuery;

	useEffect(() => {
		if (searchQuery.length > 0) {
			setFilteredProducts(
				allProducts.filter((product) =>
					product.name
						.toLowerCase()
						.includes(searchQuery.toLowerCase()),
				),
			);
		} else {
			setFilteredProducts(allProducts);
		}
	}, [allProducts, searchQuery]);

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
				ALL PRODUCTS
			</h1>
			{filteredProducts.length === 0 ? (
				<div className="flex justify-center  mt-10">
					<p>no products found for this search</p>
				</div>
			) : (
				<div
					className="
					mt-10
					grid grid-cols-2 
					md:grid-cols-3 lg:grid-cols-5
					gap-3
				"
				>
					{filteredProducts
						?.filter((product) => product.inStock)
						.map((product) => (
							<Product product={product} key={product._id} />
						))}
				</div>
			)}
		</div>
	);
};

export default AllProducts;
