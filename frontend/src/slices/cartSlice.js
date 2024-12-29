import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // যদি প্রোডাক্ট আগে থেকেই কার্টে থাকে, তাহলে কেবলমাত্র প্রোডাক্টটি আপডেট করো
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // নতুন প্রোডাক্ট কার্টে যোগ করো
        state.cartItems = [...state.cartItems, item]; // এখানে `state.cartItems` সঠিকভাবে ব্যবহার করো
      }
      return updateCart(state)
    },

    removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
        return updateCart(state);
    },
    saveShippingAddress: (state, action)=> {
        state.shippingAddress = action.payload;
        return updateCart(state);

    }
  },
});

export const { addToCart, removeFromCart, saveShippingAddress } = cartSlice.actions;

export default cartSlice.reducer;