// src/redux/reducer/webReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
//https://clothingwebsite-72uh.onrender.com/

// -------------------- Initial State --------------------
const initialState = {
    user: null,
    profile: null,
    token: null,
    loading: false,
    error: null,
    success: false,
    message: null,
};

// -------------------- Thunks --------------------

// Register
export const authRegister = createAsyncThunk(
    "auth/register",
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/api/auth/register`, formData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
);

// Login
export const authLogin = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/api/auth/login`, credentials);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);


// Admin Login
export const adminLogin = createAsyncThunk(
    "auth/adminLogin",
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/api/auth/admin-login`, credentials);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Admin login failed");
        }
    }
);



// Forgot Password
export const forgotPassword = createAsyncThunk(
    "auth/forgot-password",
    async (emailData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/api/auth/forgot-password`, emailData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Forgot password failed");
        }
    }
);


// Reset Password
// Reset Password
export const resetPassword = createAsyncThunk(
    "auth/reset-password",
    async ({ token, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${BASE_URL}/api/auth/reset-password/${token}`, { password });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Reset password failed");
        }
    }
);


// -------------------- Slice --------------------
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");

        },
        loadUser: (state) => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const token = localStorage.getItem("token");
                if (user && token) {
                    state.user = user;
                    state.token = token;
                    state.success = true;
                }
            } catch {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        },

    },
    extraReducers: (builder) => {
        // Register
        builder
            .addCase(authRegister.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(authRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.message = action.payload.message;
                state.success = true;
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })

            .addCase(authRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Login
        builder
            .addCase(authLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(authLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.success = true;
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })
            .addCase(authLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Admin Login
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.success = true;
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        // Forgot Password
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Reset Password
        builder
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, loadUser } = authSlice.actions;
export default authSlice.reducer;
