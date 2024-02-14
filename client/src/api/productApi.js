import {
	getAllProductsRoute,
	getCreateProductRoute,
	getProductByIdRoute,
	getRemoveProductRoute,
	getUpdateProductRoute,
} from "../utils/constant";
import api from "./api";

// product api endpoints
const productApi = api.injectEndpoints({
	endpoints: (builder) => ({
		// products endpoints
		getProducts: builder.query({
			query: () => getAllProductsRoute(),
		}),
		getProductById: builder.query({
			query: (id) => getProductByIdRoute(id),
		}),
		createProduct: builder.mutation({
			query: (product) => ({
				url: getCreateProductRoute(),
				method: "POST",
				body: product,
			}),
		}),
		updateProduct: builder.mutation({
			query: (product) => ({
				url: getUpdateProductRoute(product.id),
				method: "PUT",
				body: product,
			}),
		}),
		deleteProduct: builder.mutation({
			query: (id) => ({
				url: getRemoveProductRoute(id),
				method: "DELETE",
			}),
		}),
	}),
});

// HAVE TO EXPORT productApi IN ORDER FOR extraReducers TO WORK IN THE productSlice.js
export default productApi;

export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productApi;
