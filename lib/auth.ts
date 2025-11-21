// lib/requests.ts
import { RegisterData, RegisterResponse, ResponseError } from "./authTypes";
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

export async function RegisterCompany (data:RegisterData){
  try{
    const response = await api.post("/auth/register", data)
    return response.data
  } catch (error: ResponseError | any){
    return error.message
  }
}

export async function UserLogin(req:any){

    try {
        const response = await api.post("/auth/login", req);

        return response.data;
    }
    catch(error:any){
        console.log("Erro no login")
        throw new Error(error?.response?.data?.message || "Erro interno");
    }

}
