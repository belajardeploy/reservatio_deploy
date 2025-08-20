import { apiSlice } from "@/services/core/BaseQuery";

export const reservationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMap: builder.query({
      query: (params) => ({
        url: "user/reservasi",
        method: "GET",
        params: params,
      }),
    }),
    addReservation: builder.mutation({
      query: (data) => ({
        url: "user/reservasi",
        method: "POST",
        body: data,
      }),
    }),
    getDetailTable: builder.query({
      query: (params) => ({
        url: "user/table",
        method: "GET",
        params: params,
      }),
    }),
    getCheckStatus: builder.mutation({
      query: (params) => ({
        url: "user/reservasi/status",
        method: "GET",
        params: params,
      }),
    }),
    getDisabledDates: builder.query({
      query: (params) => ({
        url: "user/reservasi/disableddates",
        method: "GET",
        params: params,
      }),
    }),
  }),
});

export const {
  useGetMapQuery,
  useLazyGetMapQuery,
  useAddReservationMutation,
  useGetDetailTableQuery,
  useGetCheckStatusMutation,
  useGetDisabledDatesQuery
} = reservationApi;
