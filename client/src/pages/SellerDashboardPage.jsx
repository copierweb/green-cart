import { useState } from "react"
import AddProduct from '../components/seller/AddProduct';
import ProductList from '../components/seller/ProductList';
import Orders from '../components/seller/Orders';
import SideBar from '../components/seller/SideBar';
import HeaderSideBar from "../components/seller/HeaderSideBar";
// import { Outlet } from "react-router-dom";

const SellerDashboardPage = ()=> {

	const [activeMenu, setActiveMenu] = useState("addproduct")

	const components = {
		addproduct: <AddProduct />,
		productlist: <ProductList />,
		orders: <Orders />
	}

	return (
		<div
			className="
				min-h-screen 
				grid grid-cols-[auto_1fr]
				md:grid-cols-5 grid-rows-[auto_1fr] outline outline-green-800
			"
		>
			<header className="col-span-full border-b border-gray-300">
				<HeaderSideBar />
			</header>
			
			<aside className="pt-5 border-r border-gray-300 px-0">
				<SideBar 
					onClick={(menu)=> setActiveMenu(menu)}
					activeMenu={activeMenu}
				/>
			</aside>
			
			<main className="
					md:col-span-4 
					pt-10 md:px-10 px-2
					mb-20 
					
				"
			>
				{components[activeMenu]}
				{/*<Outlet />*/}
			</main>

		</div>
	)
}

export default SellerDashboardPage