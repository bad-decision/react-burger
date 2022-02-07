import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	ingredientDetails: null
};

export const burgerIngredientsSlice = createSlice({
	name: "burgerIngredients",
	initialState,
	reducers: {
		setIngredientDetails: (state, action) => {
			state.ingredientDetails = action.payload;
		}
	},
});

export const { setIngredientDetails } = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer;
