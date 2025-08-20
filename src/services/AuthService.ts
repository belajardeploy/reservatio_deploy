import { apiSlice } from "@/services/core/BaseQuery";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'autentikasi/login',
        method: 'POST',
        body: credentials
      })
    }),
    oauth: builder.mutation({
      query: (credentials) => ({
        url: 'autentikasi/oauth',
        method: 'POST',
        body: credentials
      })
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: 'autentikasi/register',
        method: 'POST',
        body: credentials
      })
    }),
    sendPasswordResetConfirmation: builder.mutation({
      query: (credentials) => ({
        url: 'autentikasi/forgot',
        method: 'POST',
        body: credentials
      })
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: 'autentikasi/reset',
        method: 'POST',
        body: credentials
      })
    }),
    getLinkOauth: builder.mutation({
      query: () => ({
        url: 'autentikasi/oauth',
        method: 'GET'
      })
    })
  })
})

export const { useLoginMutation, useRegisterMutation, useSendPasswordResetConfirmationMutation, useGetLinkOauthMutation, useResetPasswordMutation, useOauthMutation } = authApi;