import { assets } from "../../assets/assets"
import { useAppContext } from '../../context/AppContext';

const HeaderSideBar = ()=> {

	const { actions, navigate } = useAppContext()

	const logout = async(e)=> {
		e.preventDefault()
		actions.setIsSeller()

		// navigate('/seller')
	}

	return (
		<div 
			className="
				py-4 px-6 shadow-lg 
				flex 
				justify-between items-center
			"
		>
			{/*logo*/}
			<img src={assets.logo} alt="logo" />

			{/*nav*/}
			<nav className="flex justify-between items-center gap-4">
				<h2 className="text-gray-500">
					Hi! Admin
				</h2>
				<button 
					variant="outline"
					className="
						py-1 px-2
						text-gray-500
						border border-primary rounded-xl
						hover:text-gray-700 transition-colors duration-300
						cursor-pointer
					"
					onClick={logout}
				>
					Logout
				</button>
			</nav>
		</div>
	)
}

export default HeaderSideBar