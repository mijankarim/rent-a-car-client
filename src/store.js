import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import authReducer from './slices/authSlice';
import carsReducer from './features/cars/carsSlice';
import carReducer from './features/car/carSlice'; 
import bookingsReducer from './features/bookings/bookingsSlice'; 

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        cars: carsReducer,
        car: carReducer,
        bookings: bookingsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;