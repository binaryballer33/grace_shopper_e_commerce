import { configureStore } from "@reduxjs/toolkit";
import api from "../api/api";
import productReducer from "../app/productSlice";
import userReducer from "../app/userSlice";
import logger from "redux-logger";
import orderReducer from "../app/orderSlice";

/* TODO: figure out how to use these libraries with redux toolkit after cart is built
 * import { persistStore, persistReducer } from "redux-persist";
 * import storage from "redux-persist/lib/storage";
 * allows for redux state to persist through a page refresh
 * code reference: https://github.com/binaryballer33/crwn-clothing/blob/378762933033b5e3bb87b4c66e4ff344cd71e4b2/src/store/store.js
 */

// Create a Redux store
export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer, // key reducer path, value reducer
		product: productReducer,
		user: userReducer,
		order: orderReducer,
	},
	middleware: (getDefaultMiddleware) =>
		import.meta.env.DEV
			? getDefaultMiddleware().concat(api.middleware)
			: getDefaultMiddleware().concat(api.middleware),
});
