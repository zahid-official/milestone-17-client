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

    // Block user
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/user/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    // Unlock driver
    unblockUser: builder.mutation({
      query: (id) => ({
        url: `/user/unblock/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
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

        return {
          url: `/driver?page=${page}&limit=${limit}&applicationStatus=APPROVED${sortQuery}${searchQuery}`,
          method: "GET",
        };
      },
      providesTags: ["DRIVER"],
    }),

    // User Management
    manageUsers: builder.query({
      query: ({ page = 1, limit = 10, sort, searchTerm }) => {
        const sortQuery = sort ? `&sort=${sort}` : "";
        const searchQuery = searchTerm ? `&searchTerm=${searchTerm}` : "";
        return {
          url: `/user?page=${page}&limit=${limit}${sortQuery}${searchQuery}&role=DRIVER&role=RIDER`,
          method: "GET",
        };
      },
      providesTags: ["USER"],
    }),

    // Ride Oversight
    manageRides: builder.query({
      query: ({ page = 1, limit = 10, sort, searchTerm }) => {
        const sortQuery = sort ? `&sort=${sort}` : "";
        const searchQuery = searchTerm ? `&searchTerm=${searchTerm}` : "";
        return {
          url: `/ride?page=${page}&limit=${limit}${sortQuery}${searchQuery}`,
          method: "GET",
        };
      },
      providesTags: ["RIDE"],
    }),
  }),
});

export const {
  useApproveDriverMutation,
  useRejectDriverMutation,
  useSuspendDriverMutation,
  useUnsuspendDriverMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useDriverApplicationsQuery,
  useManageDriversQuery,
  useManageUsersQuery,
  useManageRidesQuery,
} = adminApi;
