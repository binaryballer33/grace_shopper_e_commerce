import { createSlice } from "@reduxjs/toolkit";
import orderApi from "../api/orderApi";
import { USER_CREDENTIALS } from "../utils/constant";

// TODO: edit this later, probaly split order and cart into two slices
const orderSlice = createSlice({
	name: "orderSlice",
	initialState: {
		order: {},
		items: [], // this is products in order
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			orderApi.endpoints.getCart.matchFulfilled,
			(state, { payload }) => {
				state.order = payload.order.order;
				state.items = payload.order.orderDetailsWithDescriptions;

				// get the current session storage
				const sessionStorage = JSON.parse(
					window.sessionStorage.getItem(USER_CREDENTIALS)
				);

				// modify the current session storage
				sessionStorage.order = payload.order.order;
				sessionStorage.productsInOrder =
					payload.order.orderDetailsWithDescriptions;

				// update session storage to include orders and products in order
				window.sessionStorage.setItem(
					USER_CREDENTIALS,
					JSON.stringify(sessionStorage)
				);
			}
		);
		builder.addMatcher(
			orderApi.endpoints.increaseProductQuantity.matchFulfilled,
			(state, { payload }) => {
				state.order = payload.order.order;
				state.items = state.items.map((item) => {
					return item.productId === payload.order.orderItem.productId
						? {
								...item,
								quantity: payload.order.orderItem.quantity,
						  }
						: item;
				});
			}
		);
		builder.addMatcher(
			orderApi.endpoints.decreaseProductQuantity.matchFulfilled,
			(state, { payload }) => {
				state.order = payload.order.order;
				state.items = state.items
					.map((item) => {
						return item.productId ===
							payload.order.orderItem.productId
							? {
									...item,
									quantity: payload.order.orderItem.quantity,
							  }
							: item;
					})
					.filter((item) => item.quantity);
			}
		);
		builder.addMatcher(
			orderApi.endpoints.removeProductFromCart.matchFulfilled,
			(state, { payload }) => {
				state.order = payload.order.order;
				state.items = payload.order.items.map((item) => {
					return {
						orderId: item.orderId,
						productId: item.productId,
						quantity: item.quantity,
						itemDescription: item.itemInfo,
					};
				});
			}
		);
		builder.addMatcher(
			orderApi.endpoints.cancelOrder.matchFulfilled,
			(state) => {
				state.order = {};
				state.items = [];
			}
		);
		builder.addMatcher(
			orderApi.endpoints.checkoutOrder.matchFulfilled,
			(state) => {
				state.order = {};
				state.items = [];
			}
		);
		builder.addMatcher(
			orderApi.endpoints.addProductToCart.matchFulfilled,
			(state, { payload }) => {
				state.order = payload.order.order;
				state.items = payload.order.items.map((item) => {
					return {
						orderId: item.orderId,
						productId: item.productId,
						quantity: item.quantity,
						itemDescription: item.itemInfo,
					};
				});
			}
		);
		builder.addMatcher(
			orderApi.endpoints.initalAdd.matchFulfilled,
			(state, { payload }) => {
				state.order = payload.order.order;
				state.items = payload.order.orderDetailsWithDescriptions;
			}
		);
	},
});

export default orderSlice.reducer;
