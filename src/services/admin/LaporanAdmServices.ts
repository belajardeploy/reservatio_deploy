import { apiSlice } from "@/services/core/BaseQuery";

const AdminLaporanAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLaporanAdm: builder.query({
      query: (params) => ({
        url: 'admin/laporan',
        method: 'GET',
        params: params
      })
    }),
    deleteLaporanAdm: builder.mutation({
      query: (id) => ({
        url: `admin/laporan`,
        method: 'DELETE',
        params:id
      }),
    }),
    updateLaporanAdm: builder.mutation({
      query: (id) => ({
        url: `admin/laporan`,
        method: 'PATCH',
        params: id
      }),
    }),
    getLaporanCSV: builder.mutation({
      query: (params) => ({
        url: 'admin/laporan/csv',
        method: 'GET',
        params: params,
        // responseType: 'blob' // Specify that the response is a blob
        responseHandler: (response) => response.blob()
      }),
    })
  })
})

export const {useGetLaporanAdmQuery, useDeleteLaporanAdmMutation, useUpdateLaporanAdmMutation, useGetLaporanCSVMutation} = AdminLaporanAPI