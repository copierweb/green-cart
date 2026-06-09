import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import Button from "./Button";

const MainBanner = () => {
	const { navigate } = useAppContext();

	return (
		<div
			className="
				relative
			"
		>
			{/*			<img
				src={assets.main_banner_bg}
				alt="main-manner-img"
				className="
					
				"
			/>*/}
			<picture>
				<source
					srcSet={assets.main_banner_bg}
					media="(min-width: 768px)"
				/>
				<img
					src={assets.main_banner_bg_sm}
					alt="main-banner"
					className="w-full h-auto"
				/>
			</picture>
			<div
				className="
					max-sm:min-w-52 md:max-w-md 
					absolute md:left-20 md:top-15
					left-1/2 top-50
					max-sm:-translate-x-1/2 
					max-sm:text-center
					flex flex-col md:gap-10 gap-4
				"
			>
				<h1
					className="
						text-4xl leading-tight
						md:text-5xl font-bold text-gray-700 
					"
				>
					Freshness You Can Trust, Savings You will Love!
				</h1>

				<div
					className="
						md:flex md:gap-6
						md:self-start self-center
						group
					"
				>
					<Button
						variant="primary"
						onClick={() => navigate("/products")}
					>
						Shop now
					</Button>
					<div
						className="
							hidden md:flex
							items-center gap-3
						"
					>
						<h2>Explore deals</h2>
						<img
							src={assets.black_arrow_icon}
							alt="arrow-icon"
							className="
								w-5 h-5
								transition-transform duration-300
								group-hover:translate-x-4
							"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainBanner;
// max-sm: self-center
// bg-cover bg-center bg-no-repeat
// md:bg-[url('../assets/main_banner_bg.png')]
// bg-[url('../assets/main_banner_bg_sm.png')]
