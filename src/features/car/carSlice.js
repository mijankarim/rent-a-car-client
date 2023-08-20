import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { getCar, addCarRequest, deleteCarRequest } from './carAPI';

const initialState = {
    car: {}, 
    isLoading: false,
    isError: false,
    error: ""
}

// async thunk
export const fetchCar = createAsyncThunk('car/fetchCar',
async (id) => {
    const car = await getCar(id);
    return car;
}
)

export const addCar = createAsyncThunk('car/addCar',
async () => {
    const car = await addCarRequest();
    return car;
}
)

export const deleteCar = createAsyncThunk('car/deleteCar',
async (id) => {
    const car = await deleteCarRequest(id);
    return car;
}
)

const carSlice = createSlice({
   name: "car",
   initialState,
   extraReducers: (builder) => {
      builder
      .addCase(fetchCar.pending, (state) => {
           state.isError = false;
           state.isLoading = true;
      })
      .addCase(fetchCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.car = action.payload;
      })
      .addCase(fetchCar.rejected, (state, action) => {
        state.isLoading = false;
        state.car = {};
        state.isError = true;
        state.error = action.error?.message;
      })

      .addCase(addCar.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.car = action.payload;
      })
     .addCase(addCar.rejected, (state, action) => {
        state.isLoading = false;
        state.car = {};
        state.isError = true;
        state.error = action.error?.message;
      })

      .addCase(deleteCar.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.car = action.payload;
      })
     .addCase(deleteCar.rejected, (state, action) => {
        state.isLoading = false;
        state.car = {};
        state.isError = true;
        state.error = action.error?.message;
      })
   }
})

export default carSlice.reducer;