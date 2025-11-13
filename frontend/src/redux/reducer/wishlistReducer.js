// src/redux/reducer/wishlistReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/wishlist";

// -------------------- Get Wishlist --------------------
export const getWishlist = createAsyncThunk(
    "wishlist/getWishlist",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${BASE_URL}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            return data.products;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch wishlist"
            );
        }
    }
);

// -------------------- Add to Wishlist --------------------
// wishlistThunk.js
export const addToWishlist = createAsyncThunk(
    "wishlist/addToWishlist",
    async ({ productId }, { rejectWithValue }) => {
        try {
            console.log(productId)
            const { data } = await axios.post(
                `${BASE_URL}/add`, // <-- ensure path matches backend
                { productId },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            return data.products;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to add to wishlist"
            );
        }
    }
);


// -------------------- Remove from Wishlist --------------------
export const removeFromWishlist = createAsyncThunk(
    "wishlist/removeFromWishlist",
    async ({ productId }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `${BASE_URL}/remove`,
                { productId },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            return data.products;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to remove from wishlist"
            );
        }
    }
);


// -------------------- Slice --------------------
const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // --- Get Wishlist ---
            .addCase(getWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                localStorage.setItem("wishlist", JSON.stringify(action.payload));
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // --- Add to Wishlist ---
            .addCase(addToWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // --- Remove from Wishlist ---
            .addCase(removeFromWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default wishlistSlice.reducer;
