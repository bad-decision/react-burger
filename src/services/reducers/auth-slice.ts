import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState, IUser } from '../../utils/types';

const initialState: IAuthState = {
  user: null,
  forgotPassword: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    registerUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logInUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logOutUser: (state) => {
      state.user = null;
    },
    forgotPassword: (state) => {
      state.forgotPassword = true;
    },
    resetPassword: (state) => {
      state.forgotPassword = false;
    },
  },
});

export const {
  registerUser,
  logInUser,
  logOutUser,
  getUser,
  forgotPassword,
  resetPassword,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
