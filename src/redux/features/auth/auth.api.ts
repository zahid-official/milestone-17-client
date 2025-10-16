import type {
  IChangePassword,
  ILogin,
  IRiderRegister,
  IResponse,
  ISendOtp,
  IVerifyOtp,
  LoginResponse,
  RiderRegisterResponse,
  IDriverRegister,
  DriverRegisterResponse,
} from "@/types";
import baseApi from "../../baseApi";

// redux toolkit query for authentication
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*--------------------------
            Mutations
    --------------------------*/
    // Register user
    riderRegister: builder.mutation<
      IResponse<RiderRegisterResponse>,
      IRiderRegister
    >({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    // Register driver
    driverRegister: builder.mutation<
      IResponse<DriverRegisterResponse>,
      IDriverRegister
    >({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    // Login
    login: builder.mutation<IResponse<LoginResponse>, ILogin>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        data: payload,
      }),
    }),

    // Logout
    logout: builder.mutation<IResponse<null>, null>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),

    // Send OTP
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (payload) => ({
        url: "/auth/sendOTP",
        method: "POST",
        data: payload,
      }),
    }),

    // Verify OTP
    verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (payload) => ({
        url: "/auth/verifyOTP",
        method: "POST",
        data: payload,
      }),
    }),

    // Change password
    passwordChange: builder.mutation<IResponse<null>, IChangePassword>({
      query: (payload) => ({
        url: `auth/change-password`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useRiderRegisterMutation,
  useDriverRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  usePasswordChangeMutation,
} = authApi;
