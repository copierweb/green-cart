import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import RatingStars from "../components/RatingStars";
import Button from "../components/Button";
import Product from "../components/Product";
import useCartActions from "../hooks/useCartActions";
import { useEffect, useState } from "react";

const SingleProductPage = () => {
	const [thumbnail, setThumbnail] = useState(null);

	const { state, navigate } = useAppContext();
	const allProducts = state.products;
	const { category, id: productId } = useParams();

	const product = allProducts.find((product) => product._id === productId);

	const { addToCart } = useCartActions();

	useEffect(() => {
		setThumbnail(product?.image[0] ? product.image[0] : null);
	}, [product]);

	return (
		product && (
			<div>
				<p>
					Home / Products / {product.category} /{" "}
					<span className="text-primary">{product?.name}</span>
				</p>
				<div
					className="
					mt-10
					flex flex-col md:flex-row 
					gap-5 md-gap-2
				"
				>
					{/*images*/}
					<div className="flex gap-5 flex-1">
						<div className="flex flex-col gap-2 ">
							{product?.image.map((img, index) => (
								<div
									className="
									max-w-24
									py-2 px-1 
									border border-gray-400 
									rounded-md
									cursor-pointer
								"
									onClick={() => setThumbnail(img)}
									key={index}
								>
									<img
										src={img}
										alt={img}
										className="w-full"
									/>
								</div>
							))}
						</div>
						<div
							className="
							max-w-100
							py-5 px-3 
							border border-gray-400 
							rounded-md
						"
						>
							<img
								src={thumbnail}
								alt={thumbnail}
								className="w-full h-auto"
							/>
						</div>
					</div>

					{/*details*/}
					<div className="flex-1">
						<h1 className="text-4xl text-gray-800 font-semibold mb-2">
							{product?.name}
						</h1>
						<RatingStars />
						<p
							className="
							mt-6
							text-md text-gray-400 font-normal 
							line-through
						"
						>
							MRP: ${product?.price}
						</p>
						<h1 className="text-2xl text-gray-800 font-semibold ">
							MRP: ${product?.offerPrice}
						</h1>
						<p className="tex-md font-normal text-gray-400">
							(inclusive of all taxes)
						</p>
						<h2 className="text-lg text-gray-800 font-medium mt-8">
							About Product
						</h2>
						<ul>
							{product?.description.map((des, index) => (
								<li
									className="
									list-disc tex-md text-gray-400 ml-5
									"
									key={index}
								>
									{des}
								</li>
							))}
						</ul>
						<div className="mt-10 flex gap-3">
							<Button
								variant="outline"
								className="py-2 px-20 text-4xl"
								onClick={() => addToCart(product?._id)}
							>
								Add to Cart
							</Button>
							<Button
								className="py-5 px-20 "
								onClick={() => {
									addToCart(product?._id);
									navigate("/cart");
								}}
							>
								Buy now
							</Button>
						</div>
					</div>
				</div>

				{/*------Related products--------*/}
				<div className="text-center">
					<h1
						className="
					relative inline-block
					mt-15
					text-4xl text-gray-800 text-center 
					font-medium
					after:absolute after:content-[''] after:w-25 after:h-1
					after:right-0 after:-bottom-2 after:bg-primary
				"
					>
						Related Products
					</h1>
				</div>

				<div
					className="
					mt-10 
					grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 
					gap-4
				"
				>
					{allProducts

						.filter(
							(item) =>
								item.inStock &&
								item.category.toLowerCase() === category,
						)
						.map((prod) => (
							<Product product={prod} key={prod._id} />
						))}
				</div>
			</div>
		)
	);
};

export default SingleProductPage;
