import { categories } from "../assets/assets";
import Category from "./Category";
import { useAppContext } from "../context/AppContext";

const CategoriesList = () => {
	const { navigate } = useAppContext();

	return (
		<div className="">
			<h1
				className="
					font-semibold text-3xl text-gray-600
					max-sm:text-center
				"
			>
				Categories
			</h1>

			<div
				className="
					flex flex-wrap 
					justify-between gap-4
					mt-4
				"
			>
				{categories?.map((category) => (
					<Category
						category={category}
						key={category.text}
						onClick={() => {
							navigate(
								`/products/${category.path.toLowerCase()}`,
							);
							scrollTo(0,0)
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default CategoriesList;

// max-sm:flex-col