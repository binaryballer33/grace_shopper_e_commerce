import {
	getCheckoutOrderRoute,
	getCancelOrderRotue,
	getDecreaseCountRoute,
	getIncreaseCountRoute,
	getRemoveItemRoute,
	getInCartRoute,
	getAddToCartRoute,
	getInitialAddRoute,
} from "../utils/constant.js";
import api from "./api.js";

const orderApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getCart: builder.query({
			query: () => getInCartRoute(),
		}),
		initalAdd: builder.mutation({
			query: (cart) => ({
				url: getInitialAddRoute(),
				method: "PUT",
				body: { cart },
			}),
		}),
		addProductToCart: builder.mutation({
			query: (productid) => ({
				url: getAddToCartRoute(),
				method: "PUT",
				body: { productid },
			}),
		}),
		increaseProductQuantity: builder.mutation({
			query: (productid) => ({
				url: getIncreaseCountRoute(),
				method: "PUT",
				body: { productid },
			}),
		}),
		decreaseProductQuantity: builder.mutation({
			query: (productid) => ({
				url: getDecreaseCountRoute(),
				method: "PUT",
				body: { productid },
			}),
		}),
		removeProductFromCart: builder.mutation({
			query: (productid) => ({
				url: getRemoveItemRoute(),
				method: "PUT",
				body: { productid },
			}),
		}),
		cancelOrder: builder.mutation({
			query: () => ({
				url: getCancelOrderRotue(),
				method: "PUT",
			}),
		}),
		checkoutOrder: builder.mutation({
			query: () => ({
				url: getCheckoutOrderRoute(),
				method: "PUT",
			}),
		}),
	}),
});

export const {
	useGetCartQuery,
	useAddProductToCartMutation,
	useInitalAddMutation,
	useIncreaseProductQuantityMutation,
	useDecreaseProductQuantityMutation,
	useRemoveProductFromCartMutation,
	useCancelOrderMutation,
	useCheckoutOrderMutation,
} = orderApi;

export default orderApi;
