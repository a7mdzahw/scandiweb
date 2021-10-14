import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem(cart, action) {
      const isExisted = cart.items.find(
        (item) => item.id === action.payload.id
      );
      if (isExisted) {
        isExisted.count += 1;
        return cart;
      }
      cart.items.push({ ...action.payload, count: 1 });
    },
    removeItem(cart, action) {
      cart.items.filter((item) => item.id !== action.payload);
    },
    incrementItem(cart, action) {
      const id = action.payload;
      const item = cart.items.find((item) => item.id === id);
      item.count += 1;
    },
    decrementItem(cart, action) {
      const id = action.payload;
      const item = cart.items.find((item) => item.id === id);
      if (item.count === 1) {
        cart.items = cart.items.filter((item) => item.id !== id);
        return cart;
      } else item.count -= 1;
    },
  },
});

export const { addItem, removeItem, incrementItem, decrementItem } =
  cartSlice.actions;

export default cartSlice.reducer;
