import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getCars } from './carsAPI';

const initialState = {
    cars: [],
    isLoading: false,
    isError: false,
    error: ""
}

// async thunk
export const fetchCars = createAsyncThunk('cars/fetchCars',
async () => {
    const cars = await getCars();
    return cars;
}
)

const carsSlice = createSlice({
   name: "cars",
   initialState,
   extraReducers: (builder) => {
      builder
      .addCase(fetchCars.pending, (state) => {
           state.isError = false;
           state.isLoading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.cars = [];
        state.isError = true;
        state.error = action.error?.message;
      })
   }
})

export default carsSlice.reducer;