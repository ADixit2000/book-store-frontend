import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl()}/api/orders`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery,
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/create-order",
        method: "POST",
        body: newOrder,
        credentials: "include",
      }),
      invalidatesTags: ["orders"],
    }),
    getOrdersByEmail: builder.query({
      query: (email) => ({
        url: `/email/${email}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["orders"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersByEmailQuery } = orderApi;

export default orderApi;
