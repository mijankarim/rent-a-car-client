import { apiSlice } from './apiSlice';


export const carApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    addcar: builder.mutation({
      query: (data) => ({
        url: `/cars/addcar`,
        method: 'POST',
        body: data
      }),
    }),
    updatecar: builder.mutation({
      query: ({id, data}) => ({
        url: `/cars/updatecar/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),  
    deletecar: builder.mutation({
      query: (id) => ({
        url: `/cars/deletecar/${id}`,
        method: 'DELETE'
      }),
    }),
  }),
});

export const {
 useAddcarMutation,
 useDeletecarMutation,
 useUpdatecarMutation
} = carApiSlice;