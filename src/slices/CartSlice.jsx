import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = state.find(p => p.id === action.payload.id);
      if (item) {
        item.qty += 1;
      } else {
        state.push({ ...action.payload, qty: 1 });
      }
    },

    increaseQty: (state, action) => {
      const item = state.find(p => p.id === action.payload);
      if (item) item.qty += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.find(p => p.id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      } else {
        return state.filter(p => p.id !== action.payload);
      }
    },
  },
});

export const { addToCart, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;