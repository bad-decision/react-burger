import { api } from "./api";

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => "auth/user",
		}),
		updateUser: builder.mutation({
			query: (body) => ({
				url: "auth/user",
				method: "PATCH",
				body
			}),
		}),
		resetPassword: builder.mutation({
			query: (body) => ({
				url: "password-reset",
				method: "POST",
				body
			}),
		}),
		resetPasswordReset: builder.mutation({
			query: (body) => ({
				url: "password-reset/reset",
				method: "POST",
				body
			}),
		}),
		register: builder.mutation({
			query: (body) => ({
				url: "auth/register",
				method: "POST",
				body
			}),
		}),
		login: builder.mutation({
			query: (body) => ({
				url: "auth/login",
				method: "POST",
				body
			}),
		}),
		logout: builder.mutation({
			query: (body) => ({
				url: "auth/logout",
				method: "POST",
				body
			}),
		})
	}),
});

export const {
	useGetUserQuery,
	useUpdateUserMutation,
	useRegisterMutation,
	useResetPasswordMutation,
	useResetPasswordResetMutation,
	useLoginMutation,
	useLogoutMutation
} = authApi;
