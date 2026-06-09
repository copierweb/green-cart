import { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, reducerCallback } from "../reducer/appReducer";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import {
	addProduct,
	removeProduct, setIsSeller, setSearchQuery,
	setUser,
	setUserLogout,
	showLoginBox,
	updateCart,
	closeLoginBox,
	setLoading,
	fetchProductsSuccess,
	setError,
} from "../reducer/actions";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducerCallback, initialState);
	const navigate = useNavigate();

	// products fetch function
	const fetchProducts = async () => {
		try {
			setLoading(dispatch);

			// later replace with API call using await
			fetchProductsSuccess(dispatch, dummyProducts);
		} catch (err) {
			console.log(err);

			setError(dispatch, err.message);
		}
	};

	// calling fetch function at initial rendering
	// useEffect(()=> {
	// 	fetchProducts()
	// },[])

	//(optional)
	useEffect(() => {
		const fetchData = async () => {
			await fetchProducts();
		};
		fetchData();
	}, []);

	// wrap dispatch functions for context
	const actions = {
		showLoginBox: () => showLoginBox(dispatch),
		closeLoginBox: () => closeLoginBox(dispatch),
		addProduct: (cartdata) => addProduct(dispatch, cartdata),
		removeProduct: (cartData) => removeProduct(dispatch, cartData),
		updateCart: (cartData) => updateCart(dispatch, cartData),
		setUser: (user) => setUser(dispatch, user),
		setUserLogout: () => setUserLogout(dispatch),
		setSearchQuery: (query) => setSearchQuery(dispatch, query),
		setIsSeller: () => setIsSeller(dispatch),
		
		// setLoading: () => setLoading(dispatch),
		// fetchProductsSuccess: (products) => 
		// fetchProductsSuccess(dispatch, products),

		// setError: (error) => setError(dispatch, error),
	};

	// creating context values
	const contextValue = {
		state,
		navigate,
		actions,
	};

	return (
		<AppContext.Provider value={contextValue}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};

// ===================================================================

// // products fetch function
// const fetchProducts = async () => {
// 	try {
// 		dispatch({ type: "SET_LOADING" });

// 		// later replace with API call using await

// 		dispatch({
// 			type: "FETCH_PRODUCTS",
// 			payload: dummyProducts,
// 		});
// 	} catch (err) {
// 		console.log(err);
// 		dispatch({
// 			type: "SET_ERROR",
// 			payload: err.message,
// 		});
// 	}
// };

// calling fetch function at initial rendering
// useEffect(()=> {
// 	fetchProducts()
// },[])
