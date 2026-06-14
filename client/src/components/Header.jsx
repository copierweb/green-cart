import { assets } from "../assets/assets";
import Button from "./Button";
import CartIcon from "../assets/cart_icon.svg?react";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";
import useCartActions from "../hooks/useCartActions";
import toast from "react-hot-toast"

const Header = () => {
	const {
		actions,
		state: { user, searchQuery, cartItems },
		navigate,
		axios
	} = useAppContext();

	const { getCartItemCount } = useCartActions();
	const totalCartItems = Object.values(cartItems)?.reduce(
		(acc, item) => acc + item,
		0,
	) 

	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

	const logout = async(e) => {
		try {
			e.preventDefault()

			const {data} = await axios.post("/api/v1/users/logout",{})
			if(data.status === 'success') {
				toast.success(data.message)
				actions.setUserLogout();
				setMobileSidebarOpen(false);
				navigate("/")
			} else {
				toast.error(data.message || "some error when logout")
			}

		} catch(err) {
			console.log(err.response?.data.message || err.message);
			toast.error(err.response?.data.message || err.message);
		}

	};

	const login = () => {
		actions.showLoginBox();
		setMobileSidebarOpen(false);
	};

	useEffect(() => {
		if (searchQuery.length > 0) {
			navigate("/products");
		}
	}, [searchQuery]);

	return (
		<header
			className="
				py-4
				border-b border-gray-400
				shadow-lg 
				relative z-50
			"
		>
			<div
				className="
					container mx-auto
					flex md:justify-between justify-evenly items-center
				"
			>
				<div className="cursor-pointer">
					<NavLink to="/" onClick={() => setMobileSidebarOpen(false)}>
						<img src={assets.logo} alt="logo" />
					</NavLink>
				</div>
				{/*seller dasboard link*/}
				<div
					className="
						hidden md:block
						px-4 py-2 border border-gray-300
						text-sm text-gray-500 rounded-full
						items-center
					"
				>
					<NavLink to="/seller">
						<p>Seller Dashboard</p>
					</NavLink>
				</div>

				{/*-----------------------------------------------------------------*/}
				{/*desktop nav bar*/}
				<nav
					className="hidden md:flex gap-8
					items-center"
				>
					<ul className="flex items-center gap-4">
						<li
							className="text-gray-700 text-lg hover:text-gray-900 
							transition-all duration-300
							"
						>
							<NavLink
								to="/"
								// onClick={}
							>
								Home
							</NavLink>
						</li>

						<li
							className="text-gray-700 text-lg hover:text-gray-900 
							transition-all duration-300 
							"
						>
							<NavLink
								to="/products"
								// onClick={}
							>
								AllProducts
							</NavLink>
						</li>
					</ul>

					{/*searchBar*/}
					<div className="relative">
						<input
							className="
								py-1 px-4
								border border-gray-400
								outline-none
								rounded-4xl
								hover:ring-2 hover:ring-primary 
								hover:border-transparent
								shadow-lg
							"
							type="text"
							placeholder="Search Products"
							onChange={(e) =>
								actions.setSearchQuery(e.target.value)
							}
						/>
						<img
							src={assets.search_icon}
							alt="search-icon"
							className="w-6 h-6 absolute right-2 top-1"
						/>
					</div>

					{/*cartLogo*/}
					<div
						className="relative cursor-pointer"
						onClick={() => navigate("/cart")}
					>
						<CartIcon className="w-8 h-8 text-gray-600" />
						<span
							className="bg-primary px-2 py-1 rounded-full 
							 text-xs absolute -top-2 -right-5
							text-white "
						>
							{getCartItemCount()}
						</span>
					</div>

					{/*login button / logout / myorders*/}
					{!user ? (
						<Button variant="secondary" onClick={login}>
							Login
						</Button>
					) : (
						<div className="relative group">
							<img
								src={assets.profile_icon}
								alt="user-image"
								className="w-10 h-10"
							/>
							<ul
								className="hidden group-hover:block absolute right-0 top-10 
									p-2 border border-gray-300 rounded-md text-sm shadow 
									bg-white z-40 w-30
								"
							>
								<li
									className="p-2 hover:bg-primary/30 cursor-pointer"
									onClick={() => navigate("my-orders")}
								>
									My Orders
								</li>
								<li
									className="p-2 hover:bg-primary/30 cursor-pointer"
									onClick={logout}
								>
									LogOut
								</li>
							</ul>
						</div>
					)}
				</nav>
				{/*{!user ? "Login" : "LogOut"}*/}
				{/*--------------------------------------------------------------*/}
				{/*mobile nav bar*/}
				<nav
					className={`md:hidden flex fixed bg-gray-200 max-h-60 w-full  
							left-0 top-0 overflow-x-hidden p-4 
							-z-10 transition-transform duration-700 flex-col gap-4 
							${mobileSidebarOpen ? "translate-y-0 top-17" : "-translate-y-full"}
						 `}
				>
					<ul className="flex flex-col gap-4">
						<li
							className="text-gray-700 text-lg hover:text-gray-900 
							transition-all duration-300"
						>
							<NavLink
								to="/"
								onClick={() => setMobileSidebarOpen(false)}
							>
								Home
							</NavLink>
						</li>

						<li
							className="text-gray-700 text-lg hover:text-gray-900  
							transition-all duration-300"
						>
							<NavLink
								to="/products"
								onClick={() => setMobileSidebarOpen(false)}
							>
								AllProducts
							</NavLink>
						</li>

						{user && (
							<li
								className="text-gray-700 text-lg hover:text-gray-900 
								transition-all duration-300"
							>
								<NavLink
									to="/products"
									onClick={() => setMobileSidebarOpen(false)}
								>
									My Orders
								</NavLink>
							</li>
						)}
					</ul>
					{/*login button*/}
					<Button
						variant="secondary"
						className="self-start"
						onClick={!user ? login : logout}
					>
						{!user ? "Login" : "LogOut"}
					</Button>
				</nav>
				{/*---------------------------------------------------------*/}
				{/*cartLogo*/}
				<div
					className="relative md:hidden cursor-pointer"
					onClick={() => navigate("/cart")}
				>
					<CartIcon className="w-8 h-8 text-gray-600" />
					<span
						className="bg-primary px-2 py-1 rounded-full 
						 text-xs absolute -top-2 -right-5
						text-white "
					>
						{getCartItemCount()}
					</span>
				</div>

				{/*mobilemenu*/}
				<button
					className="md:hidden cursor-pointer hover:scale-110 transition-all 
					duration-300"
					onClick={() => setMobileSidebarOpen((prev) => !prev)}
				>
					<img
						src={`
							${!mobileSidebarOpen ? assets.menu_icon : assets.remove_icon}
						`}
						alt="mobile menu"
					/>
				</button>
			</div>
		</header>
	);
};

export default Header;
