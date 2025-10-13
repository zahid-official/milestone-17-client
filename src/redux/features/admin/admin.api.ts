import baseApi from "../../baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*--------------------------
            Mutations
    --------------------------*/
    // Approve driver
    approveDriver: builder.mutation({
      query: (id) => ({
        url: `/driver/approve/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER"],
    }),
    // Reject driver
    rejectDriver: builder.mutation({
      query: (id) => ({
        url: `/driver/reject/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER"],
    }),

    // Suspend driver
    suspendDriver: builder.mutation({
      query: (id) => ({
        url: `/driver/suspend/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER"],
    }),

    // Unsuspend driver
    unsuspendDriver: builder.mutation({
      query: (id) => ({
        url: `/driver/unsuspend/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER"],
    }),

    /*--------------------------
            Queries
    --------------------------*/
    // Driver applications
    driverApplications: builder.query({
      query: ({ page = 1, limit = 10, sort, searchTerm }) => {
        const status = "PENDING";
        const sortQuery = sort ? `&sort=${sort}` : "";
        const searchQuery = searchTerm ? `&searchTerm=${searchTerm}` : "";

        return {
          url: `/driver?page=${page}&limit=${limit}&applicationStatus=${status}${sortQuery}${searchQuery}`,
          method: "GET",
        };
      },
      providesTags: ["DRIVER"],
    }),

    // Driver Management
    manageDrivers: builder.query({
      query: ({ page = 1, limit = 10, sort, searchTerm }) => {
        const sortQuery = sort ? `&sort=${sort}` : "";
        const searchQuery = searchTerm ? `&searchTerm=${searchTerm}` : "";

        // ${sortQuery}${searchQuery}
        return {
          url: `/driver?page=${page}&limit=${limit}&applicationStatus=APPROVED${sortQuery}${searchQuery}`,
          method: "GET",
        };
      },
      providesTags: ["DRIVER"],
    }),
  }),
});

export const {
  useApproveDriverMutation,
  useRejectDriverMutation,
  useSuspendDriverMutation,
  useUnsuspendDriverMutation,
  useDriverApplicationsQuery,
  useManageDriversQuery,
} = adminApi;
