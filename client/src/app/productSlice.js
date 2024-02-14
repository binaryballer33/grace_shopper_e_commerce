import { createSlice } from "@reduxjs/toolkit";
import productApi from "../api/productApi"; // HAVE TO IMPORT productApi HERE and NOT api!!!

const initialState = {
	products: [],
	product: {},
};

const productSlice = createSlice({
	name: "product",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			productApi.endpoints.getProducts.matchFulfilled,
			(state, action) => {
				state.products = action.payload.products;
			}
		);
		builder.addMatcher(
			productApi.endpoints.getProductById.matchFulfilled,
			(state, action) => {
				state.product = action.payload.product;
			}
		);
	},
});

export default productSlice.reducer;
