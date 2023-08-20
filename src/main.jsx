import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AddCar from './pages/addCar.jsx';
import Car from './pages/Car.jsx';
import AdminHome from './pages/AdminHome.jsx';
import UpdateCar from './pages/UpdateCar.jsx';
import BookingCar from './pages/BookingCar.jsx';
import UserBookings from './pages/UserBooking.jsx';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/cars/:carId' element={<Car />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/addcar' element={<AddCar />} />
      
      <Route path='/updatecar/:carId' element={<UpdateCar />} />
      <Route path='/booking/:carId' element={<BookingCar />} />
      <Route path='/userbookings' element={<UserBookings/>}  />
      <Route path='/admin' element={<AdminHome />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} /> 
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
