import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/products";

const initialState = {
  products: [],
  adminProducts: [],
  product: null,
  loading: false,
  error: null,
  success: false,
  message: null,
};

//  Add product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}`, productData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Product add failed"
      );
    }
  }
);

//  Get all products
export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/all`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch products failed"
      );
    }
  }
);

//  Get single product
export const getSingleProduct = createAsyncThunk(
  "products/getSingle",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch single product failed"
      );
    }
  }
);

//  Edit product
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/${id}`, productData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Product update failed"
      );
    }
  }
);

//  Delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/${id}`);
      return { ...data, id }; // include id for reducer removal
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Product delete failed"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductState: (state) => {
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //  Add Product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (action.payload?.product) {
          state.products.push(action.payload.product);
        }
        state.message = action.payload?.message;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Get All Products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = action.payload?.products || [];
        state.message = action.payload?.message;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Get Single Product
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload?.product || null;
        state.message = action.payload?.message;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Edit Product
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message;
        const updated = action.payload?.product;
        if (updated) {
          state.products = state.products.map((p) =>
            p._id === updated._id ? updated : p
          );
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = state.products.filter(
          (p) => p._id !== action.payload.id
        );
        state.message = action.payload?.message;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductState } = productSlice.actions;
export default productSlice.reducer;
