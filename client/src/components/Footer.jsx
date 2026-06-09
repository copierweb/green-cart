import { assets } from "../assets/assets";
import Container from "./Container";

const Footer = () => {
	return (
		<div
			className="
				
				pt-15
				bg-green-100
			"
		>
			<Container>
				<div
					className="
						flex max-sm:flex-col
						gap-10 md:justify-between
					"
				>
					{/*left column*/}
					<div
						className="
							md:flex-1
							flex flex-col gap-10
						"
					>
						<img
							src={assets.logo}
							alt="footer-logo"
							className="w-34 height-auto "
						/>
						<p
							className="
								text-gray-500 text-md font-medium
								md:max-w-md
							"
						>
							We deliver fresh groceries and snacks straight to
							your door. Trusted by thousands, we aim to make your
							shopping experience simple and affordable.
						</p>
					</div>
					{/*right column*/}
					<div
						className="
							md:flex-1
							flex flex-col gap-10
							md:grid md:grid-cols-3 md:gap-5
							
						"
					>
						{/*right column one*/}
						<div className="flex flex-col gap-2 md:gap-5">
							<h1 className="text-gray-900 text-lg font-bold">
								QickLinks?
							</h1>
							<ul className="flex flex-col gap-1">
								<li className="text-gray-500 text-sm">Home</li>
								<li className="text-gray-500 text-sm">
									Best Sellers
								</li>
								<li className="text-gray-500 text-sm">
									Offers & Deals
								</li>
								<li className="text-gray-500 text-sm">
									Contact Us
								</li>
								<li className="text-gray-500 text-sm">FAQs</li>
							</ul>
						</div>

						{/*right column two*/}
						<div className="flex flex-col gap-2 md:gap-5">
							<h1 className="text-gray-900 text-lg font-bold">
								Need help?
							</h1>
							<ul className="flex flex-col gap-1">
								<li className="text-gray-500 text-sm">
									Delivery Information
								</li>
								<li className="text-gray-500 text-sm">
									Return & Refund Policy
								</li>
								<li className="text-gray-500 text-sm">
									Payment Methods
								</li>
								<li className="text-gray-500 text-sm">
									Track your Order
								</li>
								<li className="text-gray-500 text-sm">
									Contact Us
								</li>
							</ul>
						</div>
						{/*right column three*/}
						<div className="flex flex-col gap-2 md:gap-5">
							<h1 className="text-gray-900 text-lg font-bold">
								Follow Us
							</h1>
							<ul className="flex flex-col gap-1">
								<li className="text-gray-500 text-sm">
									Instagram
								</li>
								<li className="text-gray-500 text-sm">
									Twitter
								</li>
								<li className="text-gray-500 text-sm">
									Facebook
								</li>
								<li className="text-gray-500 text-sm">
									YouTube
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div
					className="
						mt-15
						border-t border-t-gray-400
						text-center
					"
				>
					<p
						className="
							text-sm md:text-lg text-gray-500 
							font-medium py-2
						"
					>
						Copyright {new Date().getFullYear()} © GreatStack.dev
						All Right Reserved
					</p>
				</div>
			</Container>
		</div>
	);
};

export default Footer;
