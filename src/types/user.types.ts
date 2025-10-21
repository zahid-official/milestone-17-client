import type { Auth } from "./auth.types";

/*--------------------------
      Result Types
--------------------------*/
export type RideStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELLED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "COMPLETED";

export type PaymentMethod = "CASH" | "ONLINE";

export interface Timestamp {
  requestedAt?: string;
  acceptedAt?: string;
  rejectedAt?: string;
  cancelledAt?: string;
  pickedUpAt?: string;
  inTransitAt?: string;
  completedAt?: string;
}

export interface RideRequestResponse {
  userId: string;
  pickup: string;
  distance: number;
  destination: string;
  fare: number;
  paymentMethod: string;
  timestamps: Timestamp;
  status: RideStatus;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileResponse {
  _id: string;
  name: string;
  email: string;
  accountStatus: string;
  isDeleted: boolean;
  isVerified: boolean;
  role: string;
  auths: Auth[];
  createdAt: string;
  updatedAt: string;
  rides?: string[];
  password?: string;
  phone?: string;
  address?: string;
  picture?: string;
}

/*--------------------------
      QueryArg Types
--------------------------*/
export interface IRideRequest {
  userId: string;
  pickup: string;
  destination: string;
  distance: number;
  fare: number;
  paymentMethod: string;
}

export interface IUpdateProfile {
  _id: string;
  name?: string;
  phone?: string;
  address?: string;
  emergencyContact?: string;
  emergencyContact2?: string;
}

export interface VehicleInfo {
  vehicleType: string;
  vehicleModel: string;
  plateNumber: string;
}
