import { IIngredientDetails, IResponse } from '../../utils/types';
import { api } from './api';

export const ingredientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query<IIngredientDetails[] | undefined, null>({
      query: () => 'ingredients',
      transformResponse: (response: IResponse<IIngredientDetails[]>) =>
        response?.data,
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
