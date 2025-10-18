import baseApi from "../../baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*--------------------------
            Mutations
    --------------------------*/
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
  }),
});

export const {
  useSuspendDriverMutation,
  useUnsuspendDriverMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useManageUsersQuery,
} = adminApi;
