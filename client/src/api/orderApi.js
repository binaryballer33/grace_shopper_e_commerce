import {
  getCheckoutOrderRoute,
  getCancelOrderRotue,
  getDecreaseCountRoute,
  getIncreaseCountRoute,
  getRemoveItemRoute,
  getInCartRoute,
} from "../utils/constant.js";
import api from "./api.js";

const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    increase: builder.mutation({
      query: (productid) => ({
        url: getIncreaseCountRoute(),
        method: "PUT",
        body: { productid },
      }),
    }),
    decrease: builder.mutation({
      query: (productid) => ({
        url: getDecreaseCountRoute(),
        method: "PUT",
        body: { productid },
      }),
    }),
    inCart: builder.query({ query: () => getInCartRoute() }),
    remove: builder.mutation({
      query: (productid) => ({
        url: getRemoveItemRoute(),
        method: "PUT",
        body: { productid },
      }),
    }),
    cancel: builder.mutation({
      query: () => ({
        url: getCancelOrderRotue(),
        method: "PUT",
      }),
    }),
    checkout: builder.mutation({
      query: () => ({
        url: getCheckoutOrderRoute(),
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useIncreaseMutation,
  useDecreaseMutation,
  useInCartQuery,
  useRemoveMutation,
  useCancelMutation,
  useCheckoutMutation,
} = orderApi;

export default orderApi;
