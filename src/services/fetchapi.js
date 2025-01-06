import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' });
export const fetchApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: ({ endpoint, params }) => {
        const queryString = new URLSearchParams(params).toString();
        return `${endpoint}?${queryString}`;
      },
    }),
  }),
});

export const { useFetchDataQuery } = fetchApi;
