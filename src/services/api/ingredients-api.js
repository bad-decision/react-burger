import { api } from "./api";

export const ingredientsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getIngredients: builder.query({
			query: () => "ingredients",
			transformResponse: (response) => response.data
		})
	}),
});

export const { useGetIngredientsQuery } = ingredientsApi;
