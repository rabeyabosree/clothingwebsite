import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/reviews";

// -------------------- Async Thunks --------------------

// Get all reviews for a product
export const getReviewsByProduct = createAsyncThunk(
  "reviews/getByProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${productId}`);
      return data.reviews;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load reviews");
    }
  }
);

// Create a new review
export const createReview = createAsyncThunk(
  "reviews/create",
  async ({ productId, rating, comment}, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token")
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/${productId}`,
        { rating, comment },
        config
      );
      return data.review;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create review");
    }
  }
);

// Delete a review
export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async ({ reviewId, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.delete(`${BASE_URL}/${reviewId}`, config);
      return { reviewId, message: data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete review");
    }
  }
);

// -------------------- Slice --------------------

const webSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
    success: false,
    avgReview: null
  },
  reducers: {
    clearReviewState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ----- Get Reviews -----
      .addCase(getReviewsByProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviewsByProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getReviewsByProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ----- Create Review -----
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.avgReview = action.payload.avgReview;
        state.reviews.unshift(action.payload); 
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ----- Delete Review -----
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (r) => r._id !== action.payload.reviewId
        );
      });
  },
});

export const { clearReviewState } = webSlice.actions;
export default webSlice.reducer;
