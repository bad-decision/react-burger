/* eslint-disable no-undef */
import { TWSState } from '../../utils/types';
import { testError, testMessage } from '../testData';
import {
  feedOrdersWsOpened,
  feedOrdersWsError,
  feedOrdersWsClosed,
  feedOrdersWsGetMessage,
  initialState,
  feedReducer,
} from './feed-slice';

describe('feed reducer', () => {
  it('should handle feedOrdersWsOpened()', () => {
    expect(feedReducer({} as TWSState, feedOrdersWsOpened())).toEqual({
      wsConnected: true,
      error: undefined,
    });

    expect(feedReducer(initialState, feedOrdersWsOpened())).toEqual({
      wsConnected: true,
      message: null,
      error: undefined,
    });
  });

  it('should handle feedOrdersWsError()', () => {
    expect(feedReducer({} as TWSState, feedOrdersWsError(testError))).toEqual({
      wsConnected: false,
      error: testError,
    });

    expect(feedReducer(initialState, feedOrdersWsError(testError))).toEqual({
      wsConnected: false,
      message: null,
      error: testError,
    });
  });

  it('should handle feedOrdersWsClosed()', () => {
    expect(feedReducer({} as TWSState, feedOrdersWsClosed())).toEqual({
      wsConnected: false,
      error: undefined,
    });

    expect(feedReducer(initialState, feedOrdersWsClosed())).toEqual({
      wsConnected: false,
      message: null,
      error: undefined,
    });
  });

  it('should handle feedOrdersWsGetMessage()', () => {
    expect(
      feedReducer({} as TWSState, feedOrdersWsGetMessage(testMessage))
    ).toEqual({
      message: testMessage,
      error: undefined,
    });

    expect(
      feedReducer(
        {
          wsConnected: true,
          message: null,
        },
        feedOrdersWsGetMessage(testMessage)
      )
    ).toEqual({
      wsConnected: true,
      message: testMessage,
    });
  });
});
