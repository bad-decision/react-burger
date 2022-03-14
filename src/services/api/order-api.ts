import { IMessage, IOrder, IOrderResponse, IOrders } from '../../utils/types';
import { api } from './api';
import { getClearAccessToken, wsInit } from '../../utils/func';
import { ALL_ORDERS_URL, USER_ORDERS_URL } from '../../utils/url';
import {
  userOrdersWsClosed,
  userOrdersWsError,
  userOrdersWsGetMessage,
  userOrdersWsOpened,
} from '../reducers/order-slice';
import {
  feedOrdersWsClosed,
  feedOrdersWsError,
  feedOrdersWsGetMessage,
  feedOrdersWsOpened,
} from '../reducers/feed-slice';

type TMakeOrderBody = {
  ingredients: string[];
};

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    makeOrder: builder.mutation<number, TMakeOrderBody>({
      query: (body) => ({
        url: 'orders',
        method: 'POST',
        body,
      }),
      transformResponse: (response: IOrderResponse) => response.order.number,
    }),

    getOrder: builder.query<IOrder, string>({
      query: (id) => `orders/${id}`,
      transformResponse: (response: IOrders) => response.orders[0],
    }),

    getLastOrders: builder.query<IMessage | undefined, null>({
      queryFn: () => ({ data: undefined }),
      async onCacheEntryAdded(_arg, { dispatch, cacheEntryRemoved }) {
        const ws = wsInit(
          ALL_ORDERS_URL,
          dispatch,
          feedOrdersWsOpened,
          feedOrdersWsError,
          feedOrdersWsClosed,
          feedOrdersWsGetMessage
        );
        await cacheEntryRemoved;
        ws.close();
      },
    }),

    getUserOrders: builder.query<IMessage | undefined, null>({
      queryFn: () => ({ data: undefined }),
      async onCacheEntryAdded(_arg, { dispatch, cacheEntryRemoved }) {
        const token = getClearAccessToken();
        const ws = wsInit(
          `${USER_ORDERS_URL}?token=${token}`,
          dispatch,
          userOrdersWsOpened,
          userOrdersWsError,
          userOrdersWsClosed,
          userOrdersWsGetMessage
        );

        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const {
  useGetOrderQuery,
  useMakeOrderMutation,
  useGetLastOrdersQuery,
  useGetUserOrdersQuery,
} = orderApi;
