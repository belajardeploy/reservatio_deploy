import { apiSlice } from "@/services/core/BaseQuery";

const AdminAnnouncementsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnnouncementsAdm: builder.query({
      query: (params) => ({
        url: 'admin/pengumuman',
        method: 'GET',
        params: params
      })
    }),
    deleteAnnouncementsAdm: builder.mutation({
      query: (id) => ({
        url: `admin/pengumuman`,
        method: 'DELETE',
        params: id
      }),
    }),
    updateAnnouncementsAdm: builder.mutation({
      query: (body) => ({
        url: `admin/pengumuman`,
        method: 'PATCH',
        body: body
      }),
    }),
    createAnnouncementsAdm: builder.mutation({
      query: (data) => ({
        url: `admin/pengumuman`,
        method: 'POST',
        body: data
      }),
    }),
  })
})

export const {useGetAnnouncementsAdmQuery, useCreateAnnouncementsAdmMutation, useDeleteAnnouncementsAdmMutation, useUpdateAnnouncementsAdmMutation} = AdminAnnouncementsAPI