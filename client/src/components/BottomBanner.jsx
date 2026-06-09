import { assets } from "../assets/assets";
import BottomBannerIcon from "./BottomBannerIcon";

const BottomBanner = () => {
	return (
		<div
			className="
				relative
			"
		>
			<picture className="flex-1">
				<source
					srcSet={assets.bottom_banner_image}
					media="(min-width: 768px)"
				/>
				<img
					src={assets.bottom_banner_image_sm}
					alt="banner-image-2"
					className="w-full h-auto"
				/>
			</picture>

			<div
				className="
					flex flex-col md:gap-5 gap-4
					absolute md:top-20 md:right-35
					top-10 max-sm:left-5
				"
			>
				<h1 className="text-primary font-semibold text-2xl">
					Why We Are the Best?
				</h1>
				<BottomBannerIcon
					icon={assets.delivery_truck_icon}
					heading={"Fastest Delivery"}
					subheading={"Groceries delivered in under 30 minutes."}
				/>
				<BottomBannerIcon
					icon={assets.leaf_icon}
					heading={"Freshness Guaranteed"}
					subheading={"Fresh produce straight from the source."}
				/>
				<BottomBannerIcon
					icon={assets.coin_icon}
					heading={"Affordable Prices"}
					subheading={"Quality groceries at unbeatable prices."}
				/>
				<BottomBannerIcon
					icon={assets.trust_icon}
					heading={"Trusted by Thousands"}
					subheading={"Loved by 10,000+ happy customers."}
				/>
			</div>
		</div>
	);
};

export default BottomBanner;

// flex md:justify-center md:items-center max-sm:flex-col-reverse
// 	md:gap-5 gap-3
