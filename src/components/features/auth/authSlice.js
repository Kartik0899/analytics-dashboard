import { createSlice } from '@reduxjs/toolkit';
import { signInAsync } from './authAPI';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.token = action.payload.token;
    },
    signInFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    signOutSuccess: (state) => {
      state.user = null;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, signOutSuccess } = authSlice.actions;


export const signIn = (signInPayload) => async (dispatch) => {
  try {
    dispatch(signInStart());
    const response = await signInAsync(signInPayload);
    dispatch(signInSuccess(response));
    return response;
  } catch (error) {
    dispatch(signInFailure(error.message));
    throw error;
  }
};

export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;


export const signOut = () => (dispatch) => {
  dispatch(signOutSuccess());
};

export default authSlice.reducer;
