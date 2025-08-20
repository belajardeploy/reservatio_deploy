import { apiSlice } from "../core/BaseQuery";

const LogReservasiAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLogReservasi: builder.query({
      query: (params) => ({
        url: "admin/logreservasi",
        params: params,
      }),
    }),
    deleteLogReservasi: builder.mutation({
      query: (body) => ({
        url: `admin/logreservasi`,
        method: "DELETE",
        body: body,
      }),
    }),
    DisableDateReservasi: builder.mutation({
      query: (body) => ({
        url: `admin/logreservasi`,
        method: "POST",
        body: body,
      }),
    })
  }),
});
export const {
  useGetLogReservasiQuery,
  useLazyGetLogReservasiQuery,
  useDeleteLogReservasiMutation,
  useDisableDateReservasiMutation
} = LogReservasiAPI;