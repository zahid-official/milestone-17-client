import baseApi from "../../baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*--------------------------
            Mutations
    --------------------------*/
    // Available driver
    availableDriver: builder.mutation({
      query: (payload) => ({
        url: `/driver/availability`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["DRIVER", "RIDE", "USER"],
    }),

    // Accept ride
    acceptRide: builder.mutation({
      query: (id) => ({
        url: `/ride/accept/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDE"],
    }),

    // Reject ride
    rejectRide: builder.mutation({
      query: (id) => ({
        url: `/ride/reject/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDE"],
    }),

    // Pickup ride
    pickupRide: builder.mutation({
      query: (id) => ({
        url: `/ride/pickUp/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDE"],
    }),

    // InTransit ride
    inTransitRide: builder.mutation({
      query: (id) => ({
        url: `/ride/inTransit/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDE"],
    }),

    // Complete ride
    completeRide: builder.mutation({
      query: (id) => ({
        url: `/ride/complete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDE"],
    }),

    /*--------------------------
            Queries
    --------------------------*/
    // All incoming requests
    allIncomingRequests: builder.query({
      query: ({ page = 1, limit = 10, sort, searchTerm }) => {
        const sortQuery = sort ? `&sort=${sort}` : "";
        const searchQuery = searchTerm ? `&searchTerm=${searchTerm}` : "";

        return {
          url: `/ride/requestedRides?page=${page}&limit=${limit}${sortQuery}${searchQuery}`,
          method: "GET",
        };
      },
      providesTags: ["RIDE"],
    }),

    // Curring active ride
    currentRide: builder.query({
      query: () => ({
        url: `/ride/driverCurrentRide`,
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),
  }),
});

export const {
  useAvailableDriverMutation,
  useAcceptRideMutation,
  useRejectRideMutation,
  usePickupRideMutation,
  useInTransitRideMutation,
  useCompleteRideMutation,
  useAllIncomingRequestsQuery,
  useCurrentRideQuery,
} = driverApi;
