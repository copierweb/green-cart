const ProductCard = ({ product, outOfStock, onChange }) => {
	const { image, name, category, offerPrice, inStock, _id } = product;

	return (
		<div
			className="
				px-0 md:px-4 py-4 md:pr-8
				text-gray-600
				grid md:grid-cols-[2fr_1fr_1fr_auto] 
				grid-cols-3 max-sm:gap-2
				items-center md:justify-items-start justify-items-center
				
			"
		>
			<div className="md:flex gap-2 items-center">
				<div
					className="
					p-1 md:p-2 border border-gray-300 rounded-md max-sm:w-16"
				>
					<img src={image[0]} alt={name} className="w-full md:w-16 h-auto" />
				</div>
				<h1 className="max-sm:text-sm">{name}</h1>
			</div>
			<h2 className="max-sm:text-sm">{category}</h2>
			<h2 className="hidden md:block">${offerPrice}</h2>

			{/*toggle menu*/}
			<label className="relative inline-block">
				<input
					type="checkbox"
					name="product"
					value={_id}
					checked={outOfStock.includes(_id)}
					// checked={inStock}
					onChange={onChange}
					className="peer sr-only"
				/>
				<div
					className="
						w-11 h-6 bg-gray-300 rounded-full
						cursor-pointer relative
						transition-colors duration-300
						peer-checked:bg-blue-700
						after:content-[''] after:absolute after:w-5 after:h-5
						after:top-0.5 after:left-0.5 after:bg-white after:rounded-full
						after:shadow
						after:transition-transform after:duration-300
						
						peer-checked:after:translate-x-5
					"
				>
{/*					<div
						className="
							absolute top-0.5 left-0.5
							w-5 h-5 bg-white rounded-full shadow
							transition-transform duration-300
							peer-checked:translate-x-5
						"
					/>*/}
				</div>
			</label>
		</div>
	);
};

export default ProductCard;


	/*<div class="min-h-screen justify-center items-center">
  <div class="mt-50 ml-50 w-15 h-8 bg-blue-700
  rounded-full flex  items-center group">
    <div class="w-6 h-6 bg-white rounded-full
    group-hover:translate-x-7 transition-transform duration-300
    ml-1">

    </div>
  </div>
</div>*/


			/*toggle menu*/
			// <label className="relative inline-block">
			// 	<input
			// 		type="checkbox"
			// 		name="product"
			// 		value={_id}
			// 		checked={outOfStock.includes(_id)}
			// 		onChange={onChange}
			// 		className="peer sr-only"
			// 	/>

			// 	<div
			// 		className="
			// 			w-11 h-6 bg-gray-300 rounded-full
			// 			cursor-pointer relative
			// 			transition-colors duration-300
			// 			peer-checked:bg-blue-700
			// 		"
			// 	>
			// 		<div
			// 			className="
			// 				absolute top-0.5 left-0.5
			// 				w-5 h-5 bg-white rounded-full shadow
			// 				transition-transform duration-300
			// 				peer-checked:translate-x-5
			// 			"
			// 		/>
			// 	</div>
			// </label>
