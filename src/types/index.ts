import type { ComponentType } from "react";

// Auth types
export type {
  DriverRegisterResponse,
  IChangePassword,
  IDriverRegister,
  ILogin,
  IRiderRegister,
  ISendOtp,
  IVerifyOtp,
  LoginResponse,
  RiderRegisterResponse,
} from "./auth.types";

// User types
export type {
  IRideRequest,
  IUpdateProfile,
  PaymentMethod,
  RideRequestResponse,
  RideStatus,
  Timestamp,
  UpdateProfileResponse,
} from "./user.types";

// User types
export type { AccountStatus, ApplicationStatus } from "./driver.types";

// IResponse for baseApi queries and mutations
export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ISidebar for dashboard
export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

// Types for user role
export type TRole = "ADMIN" | "DRIVER" | "RIDER";
