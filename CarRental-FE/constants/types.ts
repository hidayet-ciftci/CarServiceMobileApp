export interface unloginCustomerDataTypes {
  address?: string;
  brand?: string;
  color?: string;
  viN_Number?: string;
  description?: string;
  email?: string;
  employer_Name?: string;
  fullName?: string;
  phoneNumber?: string;
  plate?: string;
  state?: string;
  price?: number | null;
  plannedEndDate?: string;
  endDate?: string;
  createdTime?: string;
}

export interface loginDataType {
  email: string;
  password: string;
}
// ---- User ---
export interface userDataType {
  id: number;
  firstName: string;
  lastName: string;
  email?: string | null;
  passwordHash: string | null;
  phoneNumber?: string | null;
  status: boolean;
  refreshToken?: null | string;
  refreshTokenExpiry?: null | string;
  createdTime: string;
  roleName?: string | null;
}

export interface registerUserDataType {
  firstName: string;
  lastName: string;
  email?: string | null;
  password: string | null;
  phoneNumber?: string | null;
  roleId: number;
}

// ----- customerTypes -------

export interface customerDataType {
  id: number;
  firstName: string;
  lastName: string;
  email?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  createdTime?: string | null;
}

// ---------- vehicle -----------
export interface vehicleDataType {
  id: number;
  customerId: number;
  plate: string;
  brand: string;
  color: string;
  viN_Number: string;
  createdTime?: string;
}

// --------- service Record --------------

export interface SCDataType {
  id: number;
  vehicleId: number;
  userId: number;
  description?: string | null;
  state: string;
  plannedEndDate?: string | null;
  endDate?: string | null;
  price: number | null;
  createdTime?: string;
}
