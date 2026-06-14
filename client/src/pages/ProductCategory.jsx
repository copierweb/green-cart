import { useAppContext } from "../context/AppContext";
import Product from "../components/Product";
import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";

const ProductCategory = () => {
	const { state } = useAppContext();
	// const [filteredProducts, setFilteredProducts] = useState([]);

	const allProducts = state.products;
	const { category } = useParams();

	const searchCategory = categories.find(
		(item) => item.path.toLowerCase() === category,
	);

	const filteredProducts = allProducts.filter(
		(item) => item.category.toLowerCase() === category,
	);

	return (
		<div>
			{searchCategory && (
				<>
					<h1
						className="
						relative inline-block 
						text-2xl text-gray-800 font-semibold
						after:absolute after:content-[''] 
						after:w-25 after:h-1 after:bg-primary
						after:right-0 after:-bottom-2
					"
					>
						{searchCategory.text.toUpperCase()}
					</h1>
					<div
						className="
					mt-10
					grid grid-cols-2 
					md:grid-cols-3 lg:grid-cols-5
					gap-3
				"
					>
						{filteredProducts.map((product) => (
							<Product product={product} key={product._id} />
						))}
					</div>
					{filteredProducts.length === 0 && (
						<p className="text-center"> 
							No products found in this category
						</p>
					)}
				</>
			)}
		</div>
	);
};

export default ProductCategory;
