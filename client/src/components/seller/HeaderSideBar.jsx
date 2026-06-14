import { assets } from "../../assets/assets"
import { useAppContext } from '../../context/AppContext';
import toast from "react-hot-toast"

const HeaderSideBar = ()=> {

	const { actions, axios, navigate } = useAppContext()

	const logout = async(e)=> {
		try {
			e.preventDefault()
			const {data} = await axios.post('/api/v1/seller/logout')

			if(data.status === 'success') {
				actions.setIsSeller(false)
				toast.success(data.message);
				navigate("/")
			} else {
				toast.error(data.message)
			}
		} catch(err) {
			toast.error(err.message)
			console.log(err.message);
		}
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