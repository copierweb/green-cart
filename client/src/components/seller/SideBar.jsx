import { assets } from "../../assets/assets";
// import { useAppContext } from "../../context/AppContext";


// inline component
const Menu = ({title,menuName,img,activeMenu,onClick,path}) => {

	// const { navigate } = useAppContext()

	return (
		<div
			className={`
				py-2 px-4
				md:flex md:justify-start md:gap-5
				md:items-center
				hover:bg-gray-200
				cursor-pointer
					${activeMenu === menuName ? "bg-gray-200 border-r-6 border-primary" : ""}
				`}
			onClick={() => onClick(menuName)}
				// onClick={() => navigate(path)}
		>
			<img src={img} alt="add-icon" />
			<h2
				className="
						hidden md:block text-gray-600 text-lg font-medium
					"
			>
				{title}
			</h2>
		</div>
	);
};

// SideBar Component
const SideBar = ({ onClick, activeMenu }) => {

	return (
		<div className="flex flex-col gap-3">
			
			<Menu
				title={"Add Product"}
				menuName={"addproduct"}
				img={assets.add_icon}
				activeMenu={activeMenu}
				onClick={onClick}
			/>

{/*			<Menu
				title={"Add Product"}
				menuName={"addproduct"}
				img={assets.add_icon}
				activeMenu={activeMenu}
				onClick={onClick}
				path={"/seller"}
			/>			*/}

			<Menu
				title={"Product List"}
				menuName={"productlist"}
				img={assets.product_list_icon}
				activeMenu={activeMenu}
				onClick={onClick}
			/>
{/*			<Menu
				title={"Product List"}
				menuName={"productlist"}
				img={assets.product_list_icon}
				activeMenu={activeMenu}
				onClick={onClick}
				path={"/seller/product-list"}
			/>*/}

			<Menu
				title={"Orders"}
				menuName={"orders"}
				img={assets.order_icon}
				activeMenu={activeMenu}
				onClick={onClick}
			/>
		</div>
	);
};

export default SideBar;
