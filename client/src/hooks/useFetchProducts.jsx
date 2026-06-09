import { dummyProducts } from "../assets/assets";
import { useAppContext } from '../context/AppContext';

const useFetchProducts = () => {
	
	const { actions } = useAppContext();
	// products fetch function
	const fetchProducts = async () => {
		try {
			actions.setLoading()
			
			// later replace with API call using await
			actions.fetchProductsSuccess(dummyProducts)
		
		} catch (err) {
			console.log(err);

			actions.setError(err.message)
		}
	};

	return { fetchProducts }
}

export default useFetchProducts