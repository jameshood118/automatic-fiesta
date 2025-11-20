// store/slices/authSlice.ts

import { createSlice } from '@reduxjs/toolkit';

// Define the initial state structure
const initialState = {
  isAuthenticated: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Add a placeholder reducer function to satisfy the store config
    setAuthStatus: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  // We'll add extraReducers for async thunks (like login) later
  extraReducers: (builder) => {},
});

// Export the reducer function
export const authReducer = authSlice.reducer;