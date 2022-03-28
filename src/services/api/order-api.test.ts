/* eslint-disable no-undef */
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import { API_BASE } from './api';
import { orderApi } from './order-api';
import { setupApiStore } from '../../utils/testUtils';
import { makeOrderBody, makeOrderResult, orderResult } from '../testData';

enableFetchMocks();
beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('makeOrder', () => {
  test('request is correct', () => {
    const storeRef = setupApiStore(orderApi, undefined);
    fetchMock.mockResponse(JSON.stringify(makeOrderResult));
    return storeRef.store
      .dispatch<any>(orderApi.endpoints.makeOrder.initiate(makeOrderBody))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0] as Request;
        const { method, url } = request;

        void request.json().then((data) => {
          expect(data).toStrictEqual(makeOrderBody);
        });

        expect(method).toBe('POST');
        expect(url).toBe(`${API_BASE}/orders`);
      });
  });
  test('successful response', () => {
    const storeRef = setupApiStore(orderApi, undefined);
    fetchMock.mockResponse(JSON.stringify(makeOrderResult));

    return storeRef.store
      .dispatch<any>(orderApi.endpoints.makeOrder.initiate(makeOrderBody))
      .then((action: any) => {
        const { data } = action;
        expect(data).toStrictEqual(1);
      });
  });
  test('unsuccessful response', () => {
    const storeRef = setupApiStore(orderApi, undefined);
    fetchMock.mockReject(new Error('Internal Server Error'));

    return storeRef.store
      .dispatch<any>(orderApi.endpoints.makeOrder.initiate(makeOrderBody))
      .then((action: any) => {
        const {
          error: { status, error },
        } = action;
        expect(status).toBe('FETCH_ERROR');
        expect(error).toBe('Error: Internal Server Error');
      });
  });
});

describe('getOrder', () => {
  test('request is correct', () => {
    const storeRef = setupApiStore(orderApi, undefined);
    fetchMock.mockResponse(JSON.stringify({}));

    return storeRef.store
      .dispatch<any>(orderApi.endpoints.getOrder.initiate('1'))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock.mock.calls[0][0] as Request;

        expect(method).toBe('GET');
        expect(url).toBe(`${API_BASE}/orders/1`);
      });
  });
  test('successful response', () => {
    const storeRef = setupApiStore(orderApi, undefined);
    fetchMock.mockResponse(JSON.stringify({ orders: [orderResult] }));

    return storeRef.store
      .dispatch<any>(orderApi.endpoints.getOrder.initiate('1'))
      .then((action: any) => {
        const { status, data, isSuccess } = action;
        expect(status).toBe('fulfilled');
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual(orderResult);
      });
  });
  test('unsuccessful response', () => {
    const storeRef = setupApiStore(orderApi, undefined);
    fetchMock.mockReject(new Error('Internal Server Error'));

    return storeRef.store
      .dispatch<any>(orderApi.endpoints.getOrder.initiate('1'))
      .then((action: any) => {
        const {
          status,
          error: { error },
          isError,
        } = action;
        expect(status).toBe('rejected');
        expect(isError).toBe(true);
        expect(error).toBe('Error: Internal Server Error');
      });
  });
});

describe('getLastOrders', () => {
  test('successful response', () => {
    const storeRef = setupApiStore(orderApi, undefined);
    fetchMock.mockResponse(JSON.stringify({ data: 1 }));

    return storeRef.store
      .dispatch<any>(orderApi.endpoints.getLastOrders.initiate(null))
      .then((action: any) => {
        const { status, data, isSuccess } = action;
        expect(status).toBe('fulfilled');
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual(null);
      });
  });
});

describe('getUserOrders', () => {
  test('successful response', () => {
    const storeRef = setupApiStore(orderApi, undefined);
    fetchMock.mockResponse(JSON.stringify({ data: 1 }));

    return storeRef.store
      .dispatch<any>(orderApi.endpoints.getUserOrders.initiate(null))
      .then((action: any) => {
        const { status, data, isSuccess } = action;
        expect(status).toBe('fulfilled');
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual(null);
      });
  });
});
