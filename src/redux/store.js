import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice.js";
import booksApi from "./features/books/booksApi.js";
import orderApi from "./features/orders/ordersAPI.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, orderApi.middleware),
});
