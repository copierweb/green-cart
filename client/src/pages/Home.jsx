import MainBanner from "../components/MainBanner";
import CategoriesList from "../components/CategoriesList";
import BestSeller from '../components/BestSeller';
import BottomBanner from '../components/BottomBanner';
import Subscribe from '../components/Subscribe';
import Login from '../components/Login';
import { useAppContext } from "../context/AppContext";

const Home = () => {
	
	const { state: {isLoginOpen}} = useAppContext()

	return (
		<div
			className={`
				flex flex-col md:gap-15 gap-10
			`}
			
		>
			{isLoginOpen && <Login />}
			<MainBanner />
			<CategoriesList />
			<BestSeller />
			<BottomBanner />
			<Subscribe />

		</div>
	);
};

export default Home;
