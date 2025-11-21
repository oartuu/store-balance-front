// lib/requests.ts
import { LoginData, RegisterData, RegisterResponse, ResponseError } from "./authTypes";
import { api } from "./axios";

export async function getApiStatus() {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error: any) {
    console.error("Erro ao acessar API:", error);
    throw new Error(error?.response?.data?.message || "Erro interno");
  }
}

export async function UserLogin (data:LoginData){
  try{
    const response = await api.post("/auth/login", data)
    return response.data
  } catch (error: ResponseError | any){
    return error.message
  }
}
export async function RegisterCompany (data:RegisterData){
  try{
    const response = await api.post("/auth/register", data)
    return response.data
  } catch (error: ResponseError | any){
    return error.message
  }
}


