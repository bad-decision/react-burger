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
			state.bun = action.payload;
		},
		addInsideIngredient: (state, action) => {
			state.insideItems = [...state.insideItems, action.payload];
		},
		removeInsideIngredient: (state, action) => {
			state.insideItems = [...state.insideItems.filter(x => x._hash !== action.payload)];
		},
		swapInsideIngredients: (state, action) => {
			const { index1, index2 } = action.payload;
			const insideItems = [...state.insideItems];
			
			const temp = insideItems[index1];
			insideItems[index1] = insideItems[index2];
			insideItems[index2] = temp;

			state.insideItems = [...insideItems];
		},
	},
});

export const { setBun, addInsideIngredient, removeInsideIngredient, swapInsideIngredients } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
