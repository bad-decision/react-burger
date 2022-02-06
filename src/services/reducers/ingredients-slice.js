import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	setIngredientDetails: null
};

export const burgerIngredientsSlice = createSlice({
	name: "burgerIngredients",
	initialState,
	reducers: {
		setIngredientDetails: (state, action) => {
			state.modalIngredient = action.payload;
		}
	},
});

export const { setIngredientDetails } = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer;
