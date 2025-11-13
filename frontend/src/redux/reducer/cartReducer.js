import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.products.find((p) => p._id === product._id);

      if (existing) {
        existing.quantity += product.quantity || 1;
      } else {
        state.products.push({ ...product, quantity: product.quantity || 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.products));
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter((p) => p._id !== productId);
      localStorage.setItem("cart", JSON.stringify(state.products));
    },

    // updateQuantity: (state, action) => {
    //   const { productId, quantity } = action.payload;
    //   const existing = state.products.find(
    //     (p) => p._id.toString() === productId.toString()
    //   );
    //   if (existing) {
    //     existing.quantity = quantity;
    //   }
    //   localStorage.setItem("cart", JSON.stringify(state.products));
    // },

    updateQuantity: (state, action) => {
      const { id, type } = action.payload;
      const existing = state.products.find((p) => p._id === id);

      if (existing) {
        if (type === "inc") {
          existing.quantity += 1;
        } else if (type === "dec" && existing.quantity > 1) {
          existing.quantity -= 1;
        }
      }

      localStorage.setItem("cart", JSON.stringify(state.products));
    },

    clearCart: (state) => {
      state.products = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
