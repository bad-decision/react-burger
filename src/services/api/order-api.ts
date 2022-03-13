import { IMessage, IOrder, IOrderResponse, IOrders } from '../../utils/types';
import { api } from './api';
import { getClearAccessToken } from '../../utils/func';
import { ALL_ORDERS_URL, USER_ORDERS_URL } from '../../utils/url';

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
      async onCacheEntryAdded(_arg, { updateCachedData, cacheEntryRemoved }) {
        const ws = new WebSocket(ALL_ORDERS_URL);
        const listener = (event: MessageEvent) => {
          const data = JSON.parse(event.data);
          updateCachedData(() => {
            return data;
          });
        };

        ws.addEventListener('message', listener);
        await cacheEntryRemoved;
        ws.close();
      },
    }),

    getUserOrders: builder.query<IMessage | undefined, null>({
      queryFn: () => ({ data: undefined }),
      async onCacheEntryAdded(_arg, { updateCachedData, cacheEntryRemoved }) {
        const token = getClearAccessToken();
        const ws = new WebSocket(`${USER_ORDERS_URL}?token=${token}`);
        const listener = (event: MessageEvent) => {
          const data = JSON.parse(event.data);
          updateCachedData(() => {
            return data;
          });
        };

        ws.addEventListener('message', listener);
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
