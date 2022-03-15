import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage, TWSState } from '../../utils/types';

const initialState: TWSState = {
  wsConnected: false,
  message: null,
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    userOrdersWsOpened: (state) => {
      state.wsConnected = true;
      state.error = undefined;
    },
    userOrdersWsError: (state, action: PayloadAction<Event>) => {
      state.wsConnected = false;
      state.error = action.payload;
    },
    userOrdersWsClosed: (state) => {
      state.wsConnected = false;
      state.error = undefined;
    },
    userOrdersWsGetMessage: (state, action: PayloadAction<IMessage>) => {
      state.message = action.payload;
      state.error = undefined;
    },
  },
});

export const {
  userOrdersWsOpened,
  userOrdersWsError,
  userOrdersWsClosed,
  userOrdersWsGetMessage,
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
