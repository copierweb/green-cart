export const initialState = {
	isLoginOpen: false,
	user: false,
	isSeller: false,
	products: [],
	cartItems: {},
	loading: false,
	uploading: false,
	searchQuery: "",
	error: null,
};
// gd50g67h
export const reducerCallback = (state, { type, payload }) => {
	switch (type) {
		case "SHOW_LOGIN_WINDOW":
			return {...state, isLoginOpen: true}

		case "CLOSE_LOGIN_WINDOW":
			return {...state, isLoginOpen: false}

		case "SET_LOADING":
			return { ...state, loading: true };

		case "SET_UPLOADING":
			return { ...state, uploading: payload };

		case "FETCH_PRODUCTS":
			return {
				...state,
				products: payload,
				loading: false,
			};

		case "SET_ERROR":
			return {
				...state,
				error: payload,
				loading: false,
			};

		case "ADD_TO_CART":
			return {
				...state,
				cartItems: payload,
			};

		case "UPDATE_CART":
			return {
				...state,
				cartItems: payload,
			};
		case "SET_CART_ITEMS":
			return {
				...state,
				cartItems: payload,
			};			

		case "REMOVE_ITEM_FROM_CART":
			return {
				...state,
				cartItems: payload,
			};

		case "SET_USER":
			return {
				...state,
				user: payload
			}

		case "SET_USER_LOGOUT":
			return {
				...state,
				user: initialState.user
			}

		case "SET_IS_SELLER": 
			return { 
				...state, 
				isSeller: payload
			}

		case "SET_SEARCH_QUERY":
			return {
				...state,
				searchQuery: payload
			}

		default:
			return state;
	}
};
