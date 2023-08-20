import { apiSlice } from './apiSlice';


export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getAllBookings: builder.query({
      query: () => ({
        url: `/bookings/getallbookings`,
      }),
    }),

    bookCar: builder.mutation({
      query: (data) => ({
        url: `/bookings/bookcar`,
        method: 'POST',
        body: data
      }),
    }),
   
    
    
  }),
});

export const {
 useBookCarMutation,
 useGetAllBookingsQuery
} = bookingApiSlice;