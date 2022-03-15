import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/api';
import { burgerConstructorReducer } from './reducers/burger-constructor-slice';
import { authReducer } from './reducers/auth-slice';
import { burgerIngredientsReducer } from './reducers/ingredients-slice';
import { orderReducer } from './reducers/order-slice';
import { feedReducer } from './reducers/feed-slice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    burgerConstructor: burgerConstructorReducer,
    burgerIngredients: burgerIngredientsReducer,
    auth: authReducer,
    orders: orderReducer,
    feed: feedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
