export type LoginData = {
  companyName: string;
  name: string;
  email: string;
  password: string;
};
export type RegistryData = {
  companyName: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface RegistryResponse {
  user: User;
  company: Company;
  token: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  companyId: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  createdAt: string;
}
export interface ResponseError {
  message: string;
  error: string;
  statusCode: number;
}