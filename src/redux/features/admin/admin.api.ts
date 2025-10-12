import baseApi from "../../baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*--------------------------
            Mutations
    --------------------------*/
    // Ride request
    approveDriver: builder.mutation({
      query: (id) => ({
        url: `/driver/approve/${id}`,
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
  }),
});

export const { useApproveDriverMutation, useDriverApplicationsQuery } =
  adminApi;
