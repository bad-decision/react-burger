import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBurgerIngredient, IIngredientDetails } from '../types';

const initialState: IBurgerIngredient = {
  ingredientDetails: null,
};

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {
    setIngredientDetails: (
      state,
      action: PayloadAction<IIngredientDetails | null>
    ) => {
      state.ingredientDetails = action.payload;
    },
  },
});

export const { setIngredientDetails } = burgerIngredientsSlice.actions;

export const burgerIngredientsReducer = burgerIngredientsSlice.reducer;
