import { apiSlice } from "@/services/core/BaseQuery";

export const DashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => ({
        url: 'user/dashboard',
        method: 'GET'
      })
    }),
    getDetailedCalendar: builder.query({
      query: (params) => ({
        url: 'user/dashboard/calendar',
        method: 'GET',
        params: params
      })
    })
  })

})

export const {useGetDashboardQuery, useGetDetailedCalendarQuery} = DashboardApi