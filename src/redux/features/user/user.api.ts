import type {
  IDriverApplication,
  IResponse,
  IRideRequest,
  IUpdateProfile,
  RideRequestResponse,
  UpdateProfileResponse,
} from "@/types";
import baseApi from "../../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*--------------------------
            Mutations
    --------------------------*/
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

    // Cancel ride
    cancelRide: builder.mutation({
      query: (id) => ({
        url: `ride/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDE"],
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
      invalidatesTags: ["USER"],
    }),

    // Driver Application
    driverApplication: builder.mutation<IResponse<null>, IDriverApplication>({
      query: (payload) => ({
        url: `/driver/apply`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["USER"],
    }),

    /*--------------------------
            Queries
    --------------------------*/
    // Ride History
    rideHistory: builder.query({
      query: ({
        page = 1,
        limit = 10,
        status,
        sort,
        searchTerm,
        minFare,
        maxFare,
      }) => {
        const statusQuery = status ? `&status=${status}` : "";
        const sortQuery = sort ? `&sort=${sort}` : "";
        const searchQuery = searchTerm ? `&searchTerm=${searchTerm}` : "";
        const minFareQuery = minFare !== undefined ? `&minFare=${minFare}` : "";
        const maxFareQuery = maxFare !== undefined ? `&maxFare=${maxFare}` : "";

        return {
          url: `/ride/history?page=${page}&limit=${limit}${statusQuery}${sortQuery}${searchQuery}${minFareQuery}${maxFareQuery}`,
          method: "GET",
        };
      },
      providesTags: ["RIDE"],
    }),

    // Single Ride Details
    singleRideDetails: builder.query({
      query: (id) => ({
        url: `/ride/singleRide/${id}`,
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),

    // Active Ride Details
    activeRideDetails: builder.query({
      query: () => ({
        url: "ride/activeRide",
        method: "GET",
      }),
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
  useCancelRideMutation,
  useUpdateProfileMutation,
  useDriverApplicationMutation,
  useRideHistoryQuery,
  useSingleRideDetailsQuery,
  useActiveRideDetailsQuery,
  useProfileInfoQuery,
} = userApi;
