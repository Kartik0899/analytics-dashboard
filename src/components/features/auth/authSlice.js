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
      // console.log('signInSuccess',action.payload);
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

export const signIn = (payload) => async (dispatch) => {
  try {
    dispatch(signInStart());
    const user = await signInAsync(payload);
    dispatch(signInSuccess(user));
  } catch (error) {
    dispatch(signInFailure(error.message));
  }
};

export const signOut = () => (dispatch) => {
  // Perform sign out logic (e.g., clear user session, remove tokens, etc.)
  // ...

  // Dispatch the signOutSuccess action to reset the user state
  dispatch(signOutSuccess());
};



export default authSlice.reducer;
