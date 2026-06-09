const BottomBannerIcon = ({ icon, heading, subheading }) => {
	return (
		<div
			className="
				flex gap-4
				items-center
			"
		>
			<img src={icon} alt="banner-icon" className="" />

			<div>
				<h1
					className="
						md:text-2xl text-gray-950 font-semibold
						text-lg
					"
				>
					{heading}
				</h1>
				<p className="text-sm text-gray-600">{subheading}</p>
			</div>
		</div>
	);
};

export default BottomBannerIcon;
