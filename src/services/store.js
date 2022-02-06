import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import burgerConstructorSlice from "./reducers/burger-constructor-slice";
import authSlice from "./reducers/auth-slice";
import burgerIngredientsSlice from "./reducers/ingredients-slice";

const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		burgerConstructor: burgerConstructorSlice,
		burgerIngredients: burgerIngredientsSlice,
		auth: authSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

export default store;