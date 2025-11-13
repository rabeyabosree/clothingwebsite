import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducer/authReducer";
import productReducer from "../reducer/productReducer";
import reviewReducer from "../reducer/reviewReducer";
import wishlistReducer from "../reducer/wishlistReducer";
import cartReducer from "../reducer/cartReducer";
import orderReducer from "../reducer/orderReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    reviews: reviewReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;

