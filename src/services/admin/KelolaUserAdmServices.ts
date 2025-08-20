import { apiSlice } from "@/services/core/BaseQuery";

const AdminkelolaUserAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getKelolaUserAdm: builder.query({
      query: (params) => ({
        url: "admin/kelola-user",
        method: "GET",
        params: params,
      }),
    }),
    getDetailUserAdm: builder.query({
      query: (params) => ({
        url: "admin/kelola-user/detail",
        method: "GET",
        params: params,
      }),
    }),
    deleteKelolaUserAdm: builder.mutation({
      query: (id) => ({
        url: `admin/kelola-user`,
        method: "DELETE",
        params: id,
      }),
    }),
    updateKelolaUserAdm: builder.mutation({
      query: (body) => ({
        url: `admin/kelola-user`,
        method: "PATCH",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetKelolaUserAdmQuery,
  useDeleteKelolaUserAdmMutation,
  useUpdateKelolaUserAdmMutation,
  useGetDetailUserAdmQuery,
} = AdminkelolaUserAPI;
