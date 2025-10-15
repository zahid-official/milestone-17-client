import baseApi from "../../baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*--------------------------
            Mutations
    --------------------------*/
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
  }),
});

export const {
  useAcceptRideMutation,
  useRejectRideMutation,
  useAllIncomingRequestsQuery,
} = driverApi;
