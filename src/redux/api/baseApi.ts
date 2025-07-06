import type { CreateBookInput, IBook, IBookResponse } from "@/types/bookTypes";
import type {
  CreateBorrowInput,
  IBorrowData,
  IBorrowResponse,
} from "@/types/borrowTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IBookData {
  data?: IBook[];
}

type UpdateBookInput = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
};
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment04-server.smanas.net/api",
  }),

  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query<IBookData, void>({
      query: () => "/books",
      providesTags: ["Books"],
    }),
    getSingleBook: builder.query<IBookData, string>({
      query: (id) => `/books/${id}`,
      providesTags: ["Books"],
    }),
    createBook: builder.mutation<IBookResponse, CreateBookInput>({
      query: (bookData: CreateBookInput) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation<
      { _id: string; data: IBook },
      { _id: string; data: Partial<UpdateBookInput> }
    >({
      query: ({
        _id,
        data,
      }: {
        _id: string;
        data: Partial<UpdateBookInput>;
      }) => ({
        url: `/books/${_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    // BORROW
    getBorrow: builder.query<IBorrowData, void>({
      query: () => "/borrow",
      providesTags: ["Books"],
    }),
    createBorrow: builder.mutation<IBorrowResponse, CreateBorrowInput>({
      query: (borrowData: CreateBorrowInput) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useCreateBorrowMutation,
  useGetBorrowQuery,
  useGetSingleBookQuery,
} = baseApi;
