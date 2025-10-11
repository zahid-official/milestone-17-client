import type {
  IResponse,
  IRideRequest,
  IUpdateProfile,
  RideRequestResponse,
  UpdateProfileResponse,
} from "@/types";
import baseApi from "../../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Ride request
    requestRide: builder.mutation<IResponse<RideRequestResponse>, IRideRequest>(
      {
        query: (payload) => ({
          url: "/ride/request",
          method: "POST",
          data: payload,
        }),
        invalidatesTags: ["RIDE"],
      }
    ),

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
      invalidatesTags: ["USER"],
    }),

    // Ride History
    rideHistory: builder.query({
      query: ({ page = 1, limit = 10, status }) => {
        const statusQuery = status ? `&status=${status}` : "";
        return {
          url: `/ride/history?page=${page}&limit=${limit}${statusQuery}`,
          method: "GET",
        };
      },
      providesTags: ["RIDE"],
    }),

    // Profile info
    profileInfo: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useRequestRideMutation,
  useUpdateProfileMutation,
  useRideHistoryQuery,
  useProfileInfoQuery,
} = userApi;
