import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	modalIngredient: null
};

export const burgerIngredientsSlice = createSlice({
	name: "burgerIngredients",
	initialState,
	reducers: {
		setModalIngredient: (state, action) => {
			state.modalIngredient = action.payload;
		}
	},
});

export const { setModalIngredient } = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer;
