
const Category = ({ category, onClick }) => {
	const { text, image, bgColor } = category;

	return (
		<div
			style={{ backgroundColor: bgColor }}
			className={`
				px-2 py-4
				rounded-lg
				flex flex-col gap-5 
				items-center
				cursor-pointer
				group
				
			`}
			onClick={onClick}
		>
			<img
				src={image}
				alt={text}
				className="
					group-hover:scale-110
					transition-transform duration-300
					max-w-35 h-auto
				"
			/>

			<h2
				className="
					text-gray-950 text-sm font-semibold
				"
			>
				{text}
			</h2>
		</div>
	);
};

export default Category;
