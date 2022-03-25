import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBurgerConstructorState, IIngredientDetails } from '../../utils/types';

export const initialState: IBurgerConstructorState = {
  bun: null,
  insideItems: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<IIngredientDetails>) => {
      state.bun = action.payload;
    },
    addInsideIngredient: (state, action: PayloadAction<IIngredientDetails>) => {
      state.insideItems = [...state.insideItems, action.payload];
    },
    removeInsideIngredient: (state, action: PayloadAction<string>) => {
      state.insideItems = [
        ...state.insideItems.filter((x) => x._hash !== action.payload),
      ];
    },
    swapInsideIngredients: (
      state,
      action: PayloadAction<{ index1: number; index2: number }>
    ) => {
      const { index1, index2 } = action.payload;
      const insideItems = [...state.insideItems];

      const temp = insideItems[index1];
      insideItems[index1] = insideItems[index2];
      insideItems[index2] = temp;

      state.insideItems = [...insideItems];
    },
    clearConstructor: () => initialState,
  },
});

export const {
  setBun,
  addInsideIngredient,
  removeInsideIngredient,
  swapInsideIngredients,
  clearConstructor,
} = burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
