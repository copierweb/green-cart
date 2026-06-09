import { useLocation } from "react-router-dom";

const Container = ({ children }) => {
	
	const isSellerPath = useLocation().pathname.includes("seller");

	return (
		<div
			className={`
				${ isSellerPath
					? "md:px-0 py-0"
					: 'container mx-auto max-sm:px-4' 
				}
			`}
		>
			{children}
		</div>
	);
};

export default Container;
