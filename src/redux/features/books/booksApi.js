import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl()}/api/books`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const booksApi = createApi({
  reducerPath: "bookApi",
  baseQuery,
  tagTypes: ["books"],
  endpoints: (builder) => ({
    fetchAllBooks: builder.query({
      query: () => "/all-books",
      providesTags: ["books"],
    }),
    fetchBookById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (results, error, id) => [{ type: "books", id }],
    }),
    addBooks: builder.mutation({
      query: (newBook) => ({
        url: "/create-book",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useFetchAllBooksQuery,
  useFetchBookByIdQuery,
  useAddBooksMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;

export default booksApi;
