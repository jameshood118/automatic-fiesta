// store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      // [future_slice_name]: [future_slice_reducer]
      // [future_api_slice_name]: [future_api_reducer],
      auth: authReducer,
    },
    // Optional: Add middleware like RTK Query here later
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });
};

// Define types for RootState and AppDispatch for type safety
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];