import type { IResponse, IUpdateProfile, UpdateProfileResponse } from "@/types";
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

    // Update profile
    updateProfile: builder.mutation<
      IResponse<UpdateProfileResponse>,
      IUpdateProfile
    >({
      query: (payload) => ({
        url: `/user/update/${payload._id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["USER"]
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

export const {
  useRequestRideMutation,
  useUpdateProfileMutation,
  useProfileInfoQuery,
} = userApi;
