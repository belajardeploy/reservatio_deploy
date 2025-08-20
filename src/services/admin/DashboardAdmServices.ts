import { apiSlice } from "@/services/core/BaseQuery";

const AdminDashboardAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardAdm: builder.query({
      query: () => ({
        url: 'admin/dashboard',
        method: 'GET',
      })
    })
  })
})

export const {useGetDashboardAdmQuery} = AdminDashboardAPI