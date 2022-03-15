import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage, TWSState } from '../../utils/types';

const initialState: TWSState = {
  wsConnected: false,
  message: null,
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    feedOrdersWsOpened: (state) => {
      state.wsConnected = true;
      state.error = undefined;
    },
    feedOrdersWsError: (state, action: PayloadAction<Event>) => {
      state.wsConnected = false;
      state.error = action.payload;
    },
    feedOrdersWsClosed: (state) => {
      state.wsConnected = false;
      state.error = undefined;
    },
    feedOrdersWsGetMessage: (state, action: PayloadAction<IMessage>) => {
      state.message = action.payload;
      state.error = undefined;
    },
  },
});

export const {
  feedOrdersWsOpened,
  feedOrdersWsError,
  feedOrdersWsClosed,
  feedOrdersWsGetMessage,
} = feedSlice.actions;

export const feedReducer = feedSlice.reducer;
