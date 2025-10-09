import type { IResponse } from "@/types";
import baseApi from "../../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Ride request
    requestRide: builder.mutation({
      query: (payload) => ({
        url: "/ride/request",
        method: "POST",
        data: payload,
      }),
    }),

    // Profile info
    profileInfo: builder.query({
      query: () => ({
        url: "user/profile",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const { useProfileInfoQuery, useRequestRideMutation } = userApi;
