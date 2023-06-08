import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import analyticsReducer from './features/analytics/analyticsSlice';
import chartsReducer from './features/analytics/chartsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    analytics: analyticsReducer,
    charts: chartsReducer,
  },
});

export default store;
