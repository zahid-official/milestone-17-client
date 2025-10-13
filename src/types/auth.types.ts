/*--------------------------
      Result Types
--------------------------*/
export interface Auth {
  provider: string;
  providerId: string;
}

export interface RiderRegisterResponse {
  name: string;
  email: string;
  accountStatus: string;
  isDeleted: boolean;
  isVerified: boolean;
  role: string;
  auths: Auth[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface DriverRegisterResponse {
  name: string;
  email: string;
  accountStatus: string;
  isDeleted: boolean;
  isVerified: boolean;
  role: string;
  licenseNumber: string;
  vehicleInfo: {
    vehicleType: string;
    vehicleModel: string;
    plateNumber: string;
  };
  auths: Auth[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// login response
export interface LoginResponse {
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
}

/*--------------------------
      QueryArg Types
--------------------------*/
export interface IRiderRegister {
  name: string;
  email: string;
  password: string;
}

export interface IDriverRegister {
  name: string;
  email: string;
  password: string;
  licenseNumber: string;
  vehicleInfo: {
    vehicleType: string;
    vehicleModel: string;
    plateNumber: string;
  };
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISendOtp {
  email: string;
}

export interface IVerifyOtp {
  email: string;
  otp: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
