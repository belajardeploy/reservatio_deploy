import { apiSlice } from "@/services/core/BaseQuery";

const AdminKelolaMejaAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getDashboardAdm: builder.query({
    //   query: () => ({
    //     url: 'admin/dashboard',
    //     method: 'GET',
    //   })
    // })
    getTableAdm: builder.query({
      query: () => ({
        url: 'admin/table',
        method: 'GET'
      })
    }),
    getDetailTableAdm: builder.query({
      query: (params) => ({
        url: 'admin/table/detail',
        method: 'GET',
        params: params
      })
    }),
    updateMeja: builder.mutation({
      query: (body) => ({
        url: 'admin/table/detail',
        method: 'POST',
        body: body,
      })
    }),
    deleteReservasiAdm: builder.mutation({
      query: (body) => ({
        url: 'admin/table',
        method: 'POST',
        body: body,
      })
    })
  })
})

export const {useGetTableAdmQuery, useGetDetailTableAdmQuery, useUpdateMejaMutation, useDeleteReservasiAdmMutation} = AdminKelolaMejaAPI