import {
  createApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../../utils/func';
import { logOutUser } from '../reducers/auth-slice';

export const API_BASE = 'https://norma.nomoreparties.space/api';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE,
  prepareHeaders: (headers) => {
    const token = getAccessToken();

    if (token) {
      headers.set('authorization', `${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    removeAccessToken();

    const refreshResult = await baseQuery(
      {
        url: 'auth/token',
        method: 'POST',
        body: { token: getRefreshToken() },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      setAccessToken(refreshResult.data.accessToken);
      setRefreshToken(refreshResult.data.refreshToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOutUser());
      removeAccessToken();
      removeRefreshToken();
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
