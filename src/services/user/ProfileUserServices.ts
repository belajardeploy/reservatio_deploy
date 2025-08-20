import { apiSlice } from "../core/BaseQuery";

export const ProfileUserAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updatePassword: builder.mutation({
      query: (body) => ({
        url: 'user/profil/change_password',
        method: 'POST',
        body: body
      })
    }),
    getProfile: builder.query({
      query: () => ({
        url: 'user/profil',
        method: 'GET'
      })
    })
  })
})

export const {useUpdatePasswordMutation, useGetProfileQuery} = ProfileUserAPI