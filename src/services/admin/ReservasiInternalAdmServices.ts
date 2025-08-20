import { apiSlice } from "@/services/core/BaseQuery";

const AdminReservasiInternalAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReservasiInternalAdm: builder.mutation({
      query: (data) => ({
        url: 'admin/reservasi-internal',
        method: 'GET',
        params: data
      })
    }),
    createReservasiInternalAdm: builder.mutation({
      query: (data) => ({
        url: `admin/reservasi-internal`,
        method: 'POST',
        body: data
      }),
    }),
  })
});
export const {
  useGetReservasiInternalAdmMutation, // karena untuk check sekali saat mau create reservasi, tidak perlu fetch jika ada perubahan state
  useCreateReservasiInternalAdmMutation,
} = AdminReservasiInternalAPI;