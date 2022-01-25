import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	bun: null,
	insideItems: []
};

export const burgerConstructorSlice = createSlice({
	name: "burgerConstructor",
	initialState,
	reducers: {
		setBun: (state, action) => {
			state.bun = action.bun;
		},
		addInsideItem: (state, action) => {
			state.insideItems = [...state.insideItems, action.insideItem];
		},
	},
});

export const { setBun, addInsideItem } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
