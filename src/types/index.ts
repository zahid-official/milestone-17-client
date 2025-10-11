import type { ComponentType } from "react";

// Auth types
export type {
  RegisterResponse,
  LoginResponse,
  IRegister,
  ILogin,
  ISendOtp,
  IVerifyOtp,
} from "./auth.types";

// User types
export type {
  RideStatus,
  RideRequestResponse,
  UpdateProfileResponse,
  IRideRequest,
  IUpdateProfile,
} from "./user.types";

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
