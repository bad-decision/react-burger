import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	forgotPassword: false
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		getUser: (state, action) => {
			state.user = action.payload;
		},
		registerUser: (state, action) => {
			state.user = action.payload;
		},
		logInUser: (state, action) => {
			state.user = action.payload;
		},
		logOutUser: (state, action) => {
			state.user = null;
		},
		forgotPassword: (state, action) => {
			state.forgotPassword = true;
		},
		resetPassword: (state, action) => {
			state.forgotPassword = false;
		},
	},
});

export const { registerUser, logInUser, logOutUser, getUser, forgotPassword, resetPassword } = authSlice.actions;

export default authSlice.reducer;
