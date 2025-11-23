export type LoginData = {
  companyName: string;
  name: string;
  email: string;
  password: string;
};

export type RegisterData = {
  companyName: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AddEmployeeData = {
  companyName: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAdmin: boolean;
}

export interface LoginResponse {
  accessToken: string;
}
export interface RegisterResponse {
  accessToken: string;
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