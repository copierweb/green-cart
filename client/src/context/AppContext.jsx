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
	setCart,
	closeLoginBox,
	setLoading,
	fetchProductsSuccess,
	setError,
	setUploading,
} from "../reducer/actions";
import axios from "axios"
import toast from 'react-hot-toast'
// -------------------------------------------------------------------------- //

// setting axios base properties
axios.defaults.withCredentials = true // send cookies in the api reQuest
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

// create AppContext and export
export const AppContext = createContext();

// ------------------------------------------------------------------------- //
export const AppContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducerCallback, initialState);
	const navigate = useNavigate();

	// fetch Seller status
	const fetchSeller = async()=> {
		try{

			const {data} = await axios.get('/api/v1/seller/is-auth')
			if(data.status === "success") {
				setIsSeller(dispatch, true)
			} else {
				setIsSeller(dispatch, false)
			}
			// or  setIsSeller(dispatch, data.status === "success");
		} catch(err) {
			console.log(err.response?.data.message || err.message);
			setIsSeller(dispatch, false)
		}
	}

	// check user is authenticated (if authenticated hard refresh could not effect automatic logout)
	const fetchUser = async()=> {
		try{

			const {data} = await axios.get('/api/v1/users/is-auth')
			if(data.status === "success") {
				setUser(dispatch, data.user)
				setCart(dispatch, data.user.cartItems)
			} else {
				setUser(dispatch, false)
			}
			// or  setIsSeller(dispatch, data.status === "success");
		} catch(err) {
			console.log(err.response?.data.message || err.message);
			setUser(dispatch, false)
		}
	}	

	// products fetch function
	const fetchProducts = async () => {
		try {
			setLoading(dispatch);

			const {data} = await axios.get('/api/v1/product/allproducts')
			if(data.status === "success") {
				// action function for storing products in global state
				fetchProductsSuccess(dispatch, data.products)
			} else {
				toast.error(data.message || "something went wrong")
			}
			// fetchProductsSuccess(dispatch, dummyProducts);
		} catch (err) {
			console.log(err);
			toast.error(err.response?.data.message || err.message)
			setError(dispatch, err.response?.data.message || err.message);
		}
	};

	// calling fetch function at initial rendering
	// useEffect(()=> {
	// 	fetchProducts()
	// },[])

	//(optional)
	useEffect(() => {
		fetchUser()
		fetchSeller()
		const fetchData = async () => {
			await fetchProducts();
		};
		fetchData();
		
	}, []);

	// update database cart items
	useEffect(()=> {
		const updateDBCartItems = async()=> {

			try{
				const cartData = state.cartItems
				const {data} = await axios.post('/api/v1/cart/update',{cartData})

				if(!data.status === "success") {
					toast.error(data.message || "problem with updating the cart")
				}
			} catch(err) {
				toast.error(err.response?.data.message || err.message)
				console.log(err.response?.data.message || err.message);
			}
		}

		if(state.user) {
			updateDBCartItems()
		}
	},[state.cartItems])

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
		setIsSeller: (status) => setIsSeller(dispatch, status),
		setError: (errMsg) => setError(dispatch, errMsg),
		setUploading: (status) => setUploading(dispatch, status),
		setCart: (cartData)  => setCart(dispatch, cartData),
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
		axios,
		fetchProducts
	};

	return (
		<AppContext.Provider value={contextValue}>
			{children}
		</AppContext.Provider>
	);
};

// ------------------------------------------------------------------ //
// wrap AppContext in a function
export const useAppContext = () => {
	return useContext(AppContext);
};

// ===================================================================

// john78@gmail
// pass@123