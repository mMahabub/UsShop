import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { HelmetProvider } from 'react-helmet-async';
import { Provider} from 'react-redux'
import store from './store';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';
import App from './App';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/cartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderSreen from './screens/OrderScreen'
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/Admin/OrderListScreen';
import AdminRoute from './components/AdminRoutes';
import ProductListScreen from './screens/Admin/ProductListScreen'
import ProductEditScreen from './screens/Admin/ProductEditScreen'
import UserListScreen from './screens/Admin/UserListScreen';
import UserEditScreen from './screens/Admin/UserEditScreen';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route  path="/search/:keyword" element={<HomeScreen />} />
      <Route  path="/page/:pageNumber" element={<HomeScreen />} />
      <Route  path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
      <Route  path="/product/:id" element={<ProductScreen />} />
      <Route  path="/cart" element={<CartScreen />} />
      <Route  path="/login" element={<LoginScreen />} />
      <Route  path="/register" element={<RegisterScreen />} />
      <Route path='' element={<PrivateRoute/>}>
      <Route  path="/shipping" element={<ShippingScreen />} />
      <Route  path="/payment" element={<PaymentScreen />} />
      <Route  path="/placeorder" element={<PlaceOrderScreen />} />
      <Route  path="/order/:id" element={<OrderSreen />} />
      <Route  path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path='' element={<AdminRoute/>}>
      <Route  path="/admin/orderlist" element={<OrderListScreen />} />
      <Route  path="/admin/productlist" element={<ProductListScreen />} />
      <Route  path="/admin/productlist/:pageNumber" element={<ProductListScreen />} />
      <Route  path="/admin/product/:id/edit" element={<ProductEditScreen />} />
      <Route  path="/admin/userlist" element={<UserListScreen />} />
      <Route  path="/admin/user/:id/edit" element={<UserEditScreen />} />
      
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
      <RouterProvider router={router} />
      </PayPalScriptProvider>

    </Provider>
    </HelmetProvider>
  </StrictMode>
);