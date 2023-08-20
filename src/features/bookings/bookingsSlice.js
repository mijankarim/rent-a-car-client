import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getBookings } from './bookingsAPI';

const initialState = {
    bookings: [],
    isLoading: false,
    isError: false,
    error: ""
}

// async thunk
export const fetchBookings = createAsyncThunk('bookings/fetchBookings',
async () => {
    const bookings = await getBookings();
    return bookings;
}
)

const bookingsSlice = createSlice({
   name: "bookings",
   initialState,
   extraReducers: (builder) => {
      builder
      .addCase(fetchBookings.pending, (state) => {
           state.isError = false;
           state.isLoading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.bookings = [];
        state.isError = true;
        state.error = action.error?.message;
      })
   }
})

export default bookingsSlice.reducer;  