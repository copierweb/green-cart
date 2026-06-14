// actions for open/close login model

export const showLoginBox = (dispatch)=> {
  dispatch({type:"SHOW_LOGIN_WINDOW"})
}

export const closeLoginBox = (dispatch)=> {
  dispatch({type:"CLOSE_LOGIN_WINDOW"})
}
// ------------------------------------------------------------- //
// actions for product card 
export const addProduct = (dispatch, cartData) => {
  dispatch({ type: "ADD_TO_CART", payload: cartData });
};

export const removeProduct = (dispatch, cartData) => {
  dispatch({ type: "REMOVE_ITEM_FROM_CART", payload: cartData });
};

export const updateCart = (dispatch, cartDatata) => {
  dispatch({ type: "UPDATE_CART", payload: cartDatata});
};

// add cartItems to DB when user login (if it any item in the cart before login)
export const setCart = (dispatch, cartData) => {
  dispatch({ type: "SET_CART_ITEMS", payload: cartData});
};

// ------------------------------------------------------------- //
// actions for product fetching
export const setLoading = (dispatch) => {
  dispatch({ type: "SET_LOADING" });
};

export const fetchProductsSuccess = (dispatch, products) => {
  dispatch({ type: "FETCH_PRODUCTS", payload: products });
};

export const setError = (dispatch, error) => {
  dispatch({ type: "SET_ERROR", payload: error });
};

// ------------------------------------------------------------- //
// actions for users

export const setUser = (dispatch,user)=> {
  dispatch({type:"SET_USER", payload: user})
}

export const setUserLogout = (dispatch)=> {
  dispatch({type:"SET_USER_LOGOUT"})
}
// ------------------------------------------------------------- //
// actions for seller dashboard
export const setIsSeller = (dispatch, status)=> {
  dispatch({type:"SET_IS_SELLER", payload: status})
}

// ------------------------------------------------------------- //
// action for set search Query
export const setSearchQuery = (dispatch,query)=> {
  dispatch({type:"SET_SEARCH_QUERY", payload: query})
}

// ----------------------------------------------------------------- //
// action for post reQuest
export const setUploading = (dispatch, status)=> {
  dispatch({type:"SET_UPLOADING", payload: status})
}