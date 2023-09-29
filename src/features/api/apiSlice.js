import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buildUrl } from '../../utils/common';
import { BASE_URL } from '../../utils/constant';
export const apiSlice = createApi({
  reducerApi: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ id }) => `/products/${id}`,
      providesTags: ['Product'],
    }),
    getProducts: builder.query({
      query: (params) => buildUrl('/products', params),
      providesTags: ['Product'],
    }),
  }),
});
export const { useGetProductQuery, useGetProductsQuery } = apiSlice;
