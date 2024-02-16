import { createSlice } from "@reduxjs/toolkit";
import orderApi from "../api/orderApi";

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    order: {},
    items: [],
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      orderApi.endpoints.inCart.matchFulfilled,
      (state, { payload }) => {
        state.order = payload.order.order;
        state.items = payload.order.orderDetailsWithDescriptions;
      }
    );
    builder.addMatcher(
      orderApi.endpoints.increase.matchFulfilled,
      (state, { payload }) => {
        state.order = payload.order.order;
        state.items = state.items.map((item) => {
          return item.productId === payload.order.orderItem.productId
            ? { ...item, quantity: payload.order.orderItem.quantity }
            : item;
        });
      }
    );
    builder.addMatcher(
      orderApi.endpoints.decrease.matchFulfilled,
      (state, { payload }) => {
        state.order = payload.order.order;
        state.items = state.items
          .map((item) => {
            return item.productId === payload.order.orderItem.productId
              ? { ...item, quantity: payload.order.orderItem.quantity }
              : item;
          })
          .filter((item) => item.quantity);
      }
    );
    builder.addMatcher(
      orderApi.endpoints.remove.matchFulfilled,
      (state, { payload }) => {
        state.order = payload.order.order;
        state.items = payload.order.items.map((item) => {
          return {
            orderId: item.orderId,
            productId: item.productId,
            quanitity: item.quantity,
            itemDescription: item.itemInfo,
          };
        });
      }
    );
    builder.addMatcher(orderApi.endpoints.cancel.matchFulfilled, (state) => {
      state.order = {};
      state.items = [];
    });
    builder.addMatcher(orderApi.endpoints.checkout.matchFulfilled, (state) => {
      state.order = {};
      state.items = [];
    });
  },
});

export default orderSlice.reducer;
