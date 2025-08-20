import { apiSlice } from "@/services/core/BaseQuery";

export const UserAnnounceAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLatestAnnouncement: builder.query({
      query: (params) => ({
        url: 'user/pengumuman',
        method: 'GET',
        params: params
      })
    }),
  })
})

export const { useGetLatestAnnouncementQuery} = UserAnnounceAPI