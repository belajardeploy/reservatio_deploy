import { apiSlice } from "@/services/core/BaseQuery";

export const confirmationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConfirmation: builder.query({
      query: () => ({
        url: 'user/pesanan',
        method: 'GET'
      })
    }),
    confirmReservation: builder.query({
      query: (params) => ({
        url: 'user/konfirmasi',
        method: 'GET',
        params: params
      })
    }),
    confirmedReservation: builder.query({
      query: () => ({
        url: 'user/terkonfirmasi',
        method: 'GET'
      })
    })
  })
})

export const { useGetConfirmationQuery, useConfirmReservationQuery, useConfirmedReservationQuery } = confirmationApi;