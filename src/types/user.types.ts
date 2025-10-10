import type { Auth } from "./auth.types";

/*--------------------------
      Result Types
--------------------------*/
export interface UpdateProfileResponse {
  _id: string;
  name: string;
  email: string;
  accountStatus: string;
  isDeleted: boolean;
  isVerified: boolean;
  role: string;
  auths: Auth[];
  rides: string[];
  createdAt: string;
  updatedAt: string;
  address: string;
  phone: string;
}

/*--------------------------
      QueryArg Types
--------------------------*/
export interface IUpdateProfile {
        _id: string;
    name: string;
    phone: string;
    address: string;
}