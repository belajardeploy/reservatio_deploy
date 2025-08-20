import { apiSlice } from "../core/BaseQuery";

export const DashboardOprAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableTableOpr: builder.query({
      query: (params) => ({
        url: 'operator/available',
        method: 'GET',
        params: params
      })
    }),
    getDetailTableOpr: builder.query({
      query: (params) => ({
        url: 'operator/detail_table',
        method: 'GET',
        params: params
      })
    }),
    getFilteredTable: builder.query({
      query: (params) => ({
        url: 'operator/reservasi',
        method: 'GET',
        params: params
      })
    }),
    createReservasiOpr: builder.mutation({
      query: (body) => ({
        url: 'operator/reservasi',
        method: 'POST',
        body: body
      })
    }),
    deleteReservasiOpr: builder.mutation({
      query: (id) => ({
        url: 'operator/reservasi/delete',
        method: 'POST',
        body: id
      })
    }),
    confirmReservationOpr: builder.mutation({
      query: (body) => ({
        url: 'operator/reservasi/konfirmasi',
        method: 'POST',
        body: body
      })
    }),
    getDashboardOpr: builder.query({
      query: () => ({
        url: 'operator/dashboard',
        method: 'GET'
      })
    }),
    createLaporanOpr: builder.mutation({
      query: (body) => ({
        url: 'operator/laporan',
        method: 'POST',
        body: body
      })
    }),
    penaltyReservation: builder.mutation({
      query: (body) => ({
        url: 'operator/reservasi/penalty',
        method: 'POST',
        body: body,
      })
    })
  })
})

export const { useCreateReservasiOprMutation,
  useGetAvailableTableOprQuery,
  useGetDetailTableOprQuery,
  useGetFilteredTableQuery,
  useDeleteReservasiOprMutation,
  useConfirmReservationOprMutation,
  useGetDashboardOprQuery,
  useCreateLaporanOprMutation,
  usePenaltyReservationMutation
} = DashboardOprAPI