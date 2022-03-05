import {
  IHasUser,
  ILogin,
  IRegisterQuery,
  IResetPasswordQuery,
  IUserAuth,
} from '../../utils/types';
import { api } from './api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IHasUser, null>({
      query: () => 'auth/user',
    }),
    updateUser: builder.mutation<IHasUser, IRegisterQuery>({
      query: (body) => ({
        url: 'auth/user',
        method: 'PATCH',
        body,
      }),
    }),
    resetPassword: builder.mutation<unknown, { email: string }>({
      query: (body) => ({
        url: 'password-reset',
        method: 'POST',
        body,
      }),
    }),
    resetPasswordReset: builder.mutation<unknown, IResetPasswordQuery>({
      query: (body) => ({
        url: 'password-reset/reset',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<IUserAuth, IRegisterQuery>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<IUserAuth, ILogin>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<unknown, { token: string | null }>({
      query: (body) => ({
        url: 'auth/logout',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useResetPasswordResetMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApi;
