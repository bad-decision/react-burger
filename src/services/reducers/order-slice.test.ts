/* eslint-disable no-undef */
import { TWSState } from '../../utils/types';
import { testError, testMessage } from '../testData';
import {
  userOrdersWsOpened,
  userOrdersWsError,
  userOrdersWsClosed,
  userOrdersWsGetMessage,
  initialState,
  orderReducer,
} from './order-slice';

describe('order reducer', () => {
  it('should handle userOrdersWsOpened()', () => {
    expect(orderReducer({} as TWSState, userOrdersWsOpened())).toEqual({
      wsConnected: true,
      error: undefined,
    });

    expect(orderReducer(initialState, userOrdersWsOpened())).toEqual({
      wsConnected: true,
      message: null,
      error: undefined,
    });
  });

  it('should handle userOrdersWsError()', () => {
    expect(orderReducer({} as TWSState, userOrdersWsError(testError))).toEqual({
      wsConnected: false,
      error: testError,
    });

    expect(orderReducer(initialState, userOrdersWsError(testError))).toEqual({
      wsConnected: false,
      message: null,
      error: testError,
    });
  });

  it('should handle userOrdersWsClosed()', () => {
    expect(orderReducer({} as TWSState, userOrdersWsClosed())).toEqual({
      wsConnected: false,
      error: undefined,
    });

    expect(orderReducer(initialState, userOrdersWsClosed())).toEqual({
      wsConnected: false,
      message: null,
      error: undefined,
    });
  });

  it('should handle userOrdersWsGetMessage()', () => {
    expect(
      orderReducer({} as TWSState, userOrdersWsGetMessage(testMessage))
    ).toEqual({
      message: testMessage,
      error: undefined,
    });

    expect(
      orderReducer(
        {
          wsConnected: true,
          message: null,
        },
        userOrdersWsGetMessage(testMessage)
      )
    ).toEqual({
      wsConnected: true,
      message: testMessage,
    });
  });
});
