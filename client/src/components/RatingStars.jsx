import { assets } from "../assets/assets";

const RatingStars = ({ rating=4 }) => {
	const maxRating = 5;

	const starsArr = Array.from({ length: maxRating });

	return (
		<div
			className="
				flex gap-1 items-center
			"
		>
			{starsArr.map((_, index) => {
				const isBright = index < rating;

				return isBright ? (
					<img
						src={assets.star_icon}
						alt="star"
						key={index}
						className="w-4 h-4"
					/>
				) : (
					<img
						src={assets.star_dull_icon}
						alt="star"
						key={index}
						className="w-4 h-4"
					/>
				);
			})}
			<span className="text-gray-400 text-md font-normal">
				({rating})
			</span>
		</div>
	);
};

export default RatingStars;
