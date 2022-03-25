/* eslint-disable no-undef */
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import { API_BASE } from './api';
import { authApi } from './auth-api';
import { setupApiStore } from '../../utils/testUtils';
import {
  userResult,
  updateUserBody,
  passwordResetBody,
  resetPasswordResetBody,
  registerUser,
  loginBody,
  tokenBody,
} from '../testData';

enableFetchMocks();
beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('getUser', () => {
  test('request is correct', () => {
    const storeRef = setupApiStore(authApi, undefined);
    fetchMock.mockResponse(JSON.stringify({}));

    return storeRef.store
      .dispatch<any>(authApi.endpoints.getUser.initiate(null))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock.mock.calls[0][0] as Request;

        expect(method).toBe('GET');
        expect(url).toBe(`${API_BASE}/auth/user`);
      });
  });
  test('successful response', () => {
    const storeRef = setupApiStore(authApi, undefined);
    fetchMock.mockResponse(JSON.stringify(userResult));

    return storeRef.store
      .dispatch<any>(authApi.endpoints.getUser.initiate(null))
      .then((action: any) => {
        const { status, data, isSuccess } = action;
        expect(status).toBe('fulfilled');
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual(userResult);
      });
  });
  test('unsuccessful response', () => {
    const storeRef = setupApiStore(authApi, undefined);
    fetchMock.mockReject(new Error('Internal Server Error'));

    return storeRef.store
      .dispatch<any>(authApi.endpoints.getUser.initiate(null))
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

describe('updateUser', () => {
  test('request is correct', () => {
    const storeRef = setupApiStore(authApi, undefined);
    fetchMock.mockResponse(JSON.stringify(userResult));
    return storeRef.store
      .dispatch<any>(authApi.endpoints.updateUser.initiate(updateUserBody))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0] as Request;
        const { method, url } = request;
        void request.json().then((data) => {
          expect(data).toStrictEqual(updateUserBody);
        });
        expect(method).toBe('PATCH');
        expect(url).toBe(`${API_BASE}/auth/user`);
      });
  });
  test('successful response', () => {
    const storeRef = setupApiStore(authApi, undefined);
    fetchMock.mockResponse(JSON.stringify(userResult));
    return storeRef.store
      .dispatch<any>(authApi.endpoints.updateUser.initiate(updateUserBody))
      .then((action: any) => {
        const { data } = action;
        expect(data).toStrictEqual(userResult);
      });
  });
  test('unsuccessful response', () => {
    const storeRef = setupApiStore(authApi, undefined);
    fetchMock.mockReject(new Error('Internal Server Error'));
    return storeRef.store
      .dispatch<any>(authApi.endpoints.updateUser.initiate(updateUserBody))
      .then((action: any) => {
        const {
          error: { status, error },
        } = action;
        expect(status).toBe('FETCH_ERROR');
        expect(error).toBe('Error: Internal Server Error');
      });
  });
});

describe('resetPassword', () => {
  test('request is correct', () => {
    const storeRef = setupApiStore(authApi, undefined);
    fetchMock.mockResponse(JSON.stringify(userResult));
    return storeRef.store
      .dispatch<any>(
        authApi.endpoints.resetPassword.initiate(passwordResetBody)
      )
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0] as Request;
        const { method, url } = request;
        void request.json().then((data) => {
          expect(data).toStrictEqual(passwordResetBody);
        });
        expect(method).toBe('POST');
        expect(url).toBe(`${API_BASE}/password-reset`);
      });
  });
  test('unsuccessful response', () => {
    const storeRef = setupApiStore(authApi, undefined);
    fetchMock.mockReject(new Error('Internal Server Error'));
    return storeRef.store
      .dispatch<any>(
        authApi.endpoints.resetPassword.initiate(passwordResetBody)
      )
      .then((action: any) => {
        const {
          error: { status, error },
        } = action;
        expect(status).toBe('FETCH_ERROR');
        expect(error).toBe('Error: Internal Server Error');
      });
  });
});

describe('resetPasswordReset', () => {
  test('request is correct', () => {
    const storeRef = setupApiStore(authApi, undefined);
    fetchMock.mockResponse(JSON.stringify(userResult));
    return storeRef.store
      .dispatch<any>(
        authApi.endpoints.resetPasswordReset.initiate(resetPasswordResetBody)
      )
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0] as Request;
        const { method, url } = request;
        void request.json().then((data) => {
          expect(data).toStrictEqual(resetPasswordResetBody);
        });
        expect(method).toBe('POST');
        expect(url).toBe(`${API_BASE}/password-reset/reset`);
      });
  });
  test('unsuccessful response', () => {
    const storeRef = setupApiStore(authApi, undefined);
    fetchMock.mockReject(new Error('Internal Server Error'));
    return storeRef.store
      .dispatch<any>(
        authApi.endpoints.resetPasswordReset.initiate(resetPasswordResetBody)
      )
      .then((action: any) => {
        const {
          error: { status, error },
        } = action;
        expect(status).toBe('FETCH_ERROR');
        expect(error).toBe('Error: Internal Server Error');
      });
  });
});

describe('register', () => {
  test('request is correct', () => {
    const storeRef = setupApiStore(authApi, undefined);
    fetchMock.mockResponse(JSON.stringify(registerUser));
    return storeRef.store
      .dispatch<any>(authApi.endpoints.register.initiate(updateUserBody))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0] as Request;
        const { method, url } = request;
        void request.json().then((data) => {
          expect(data).toStrictEqual(updateUserBody);
        });
        expect(method).toBe('POST');
        expect(url).toBe(`${API_BASE}/auth/register`);
      });
  });
  test('successful response', () => {
    const storeRef = setupApiStore(authApi, undefined);
    fetchMock.mockResponse(JSON.stringify(registerUser));
    return storeRef.store
      .dispatch<any>(authApi.endpoints.register.initiate(updateUserBody))
      .then((action: any) => {
        const { data } = action;
        expect(data).toStrictEqual(registerUser);
      });
  });
  test('unsuccessful response', () => {
    const storeRef = setupApiStore(authApi, undefined);
    fetchMock.mockReject(new Error('Internal Server Error'));
    return storeRef.store
      .dispatch<any>(authApi.endpoints.register.initiate(updateUserBody))
      .then((action: any) => {
        const {
          error: { status, error },
        } = action;
        expect(status).toBe('FETCH_ERROR');
        expect(error).toBe('Error: Internal Server Error');
      });
  });
});

describe('login', () => {
  test('request is correct', () => {
    const storeRef = setupApiStore(authApi, undefined);
    fetchMock.mockResponse(JSON.stringify(registerUser));
    return storeRef.store
      .dispatch<any>(authApi.endpoints.login.initiate(loginBody))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0] as Request;
        const { method, url } = request;
        void request.json().then((data) => {
          expect(data).toStrictEqual(loginBody);
        });
        expect(method).toBe('POST');
        expect(url).toBe(`${API_BASE}/auth/login`);
      });
  });
  test('successful response', () => {
    const storeRef = setupApiStore(authApi, undefined);
    fetchMock.mockResponse(JSON.stringify(registerUser));
    return storeRef.store
      .dispatch<any>(authApi.endpoints.login.initiate(loginBody))
      .then((action: any) => {
        const { data } = action;
        expect(data).toStrictEqual(registerUser);
      });
  });
  test('unsuccessful response', () => {
    const storeRef = setupApiStore(authApi, undefined);
    fetchMock.mockReject(new Error('Internal Server Error'));
    return storeRef.store
      .dispatch<any>(authApi.endpoints.login.initiate(loginBody))
      .then((action: any) => {
        const {
          error: { status, error },
        } = action;
        expect(status).toBe('FETCH_ERROR');
        expect(error).toBe('Error: Internal Server Error');
      });
  });
});

describe('logout', () => {
  test('request is correct', () => {
    const storeRef = setupApiStore(authApi, undefined);
    fetchMock.mockResponse(JSON.stringify(registerUser));
    return storeRef.store
      .dispatch<any>(authApi.endpoints.logout.initiate(tokenBody))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0] as Request;
        const { method, url } = request;
        void request.json().then((data) => {
          expect(data).toStrictEqual(tokenBody);
        });
        expect(method).toBe('POST');
        expect(url).toBe(`${API_BASE}/auth/logout`);
      });
  });
  test('unsuccessful response', () => {
    const storeRef = setupApiStore(authApi, undefined);
    fetchMock.mockReject(new Error('Internal Server Error'));
    return storeRef.store
      .dispatch<any>(authApi.endpoints.logout.initiate(tokenBody))
      .then((action: any) => {
        const {
          error: { status, error },
        } = action;
        expect(status).toBe('FETCH_ERROR');
        expect(error).toBe('Error: Internal Server Error');
      });
  });
});
