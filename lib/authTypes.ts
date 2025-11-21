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
  user: User;
  token: string;
}
export interface RegisterResponse {
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