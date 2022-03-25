/* eslint-disable no-undef */
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import { API_BASE } from './api';
import { ingredientsApi } from './ingredients-api';
import { Headers } from '../../utils/types';
import { setupApiStore } from '../../utils/testUtils';
import { testIngredient1 } from '../testData';

enableFetchMocks();
beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('getIngredients', () => {
  test('request is correct', () => {
    const storeRef = setupApiStore(ingredientsApi, undefined);
    fetchMock.mockResponse(JSON.stringify({}));

    return storeRef.store
      .dispatch<any>(ingredientsApi.endpoints.getIngredients.initiate(null))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, headers, url } = fetchMock.mock.calls[0][0] as Request;

        const authorization = headers.get(Headers.Authorization);

        expect(method).toBe('GET');
        expect(url).toBe(`${API_BASE}/ingredients`);
        expect(authorization).toBeNull();
      });
  });
  test('successful response', () => {
    const storeRef = setupApiStore(ingredientsApi, undefined);
    fetchMock.mockResponse(
      JSON.stringify({ data: [testIngredient1], success: true })
    );

    return storeRef.store
      .dispatch<any>(ingredientsApi.endpoints.getIngredients.initiate(null))
      .then((action: any) => {
        const { status, data, isSuccess } = action;
        expect(status).toBe('fulfilled');
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual([testIngredient1]);
      });
  });
  test('unsuccessful response', () => {
    const storeRef = setupApiStore(ingredientsApi, undefined);
    fetchMock.mockReject(new Error('Internal Server Error'));

    return storeRef.store
      .dispatch<any>(ingredientsApi.endpoints.getIngredients.initiate(null))
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
