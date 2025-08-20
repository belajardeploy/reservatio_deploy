import { apiSlice } from "@/services/core/BaseQuery";

export const feedbackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFeedback: builder.mutation({
      query: (data) => ({
        url: 'user/hubungi',
        method: 'POST',
        body: data
      })
    })
  })
})

export const { useAddFeedbackMutation } = feedbackApi;