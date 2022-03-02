import { IOrderResponse } from '../types';
import { api } from './api';

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    makeOrder: builder.mutation({
      query: (body) => ({
        url: 'orders',
        method: 'POST',
        body,
      }),
      transformResponse: (response: IOrderResponse) => response.order.number,
    }),
  }),
});

export const { useMakeOrderMutation } = orderApi;
