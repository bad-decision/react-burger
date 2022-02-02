import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_BASE = "https://norma.nomoreparties.space/api";

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: API_BASE
	}),
	endpoints: () => ({}),
});
