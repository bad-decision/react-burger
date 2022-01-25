import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api/api";
import burgerConstructorSlice from "./services/reducers/burger-constructor-slice";
import burgerIngredientsSlice from "./services/reducers/ingredients-slice";

const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		burgerConstructor: burgerConstructorSlice,
		burgerIngredients: burgerIngredientsSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

export default store;