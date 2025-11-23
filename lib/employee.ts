import { AxiosError } from "axios";
import { api } from "./axios";

export async function getEmployees() {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await api.get("/auth/employees", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return(response.data)
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const message = error.response?.data?.message ?? error.message;
      // lança um objeto de erro padronizado
      throw { status, message };
    }
    throw error; // erro inesperado, relança
  }
}

export async function addEmployees (data:any){
    const token = localStorage.getItem("auth_token");
    try{
        const response = await api.post("/auth/employees",data,{
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data
    }catch(error){
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message ?? error.message;
        // lança um objeto de erro padronizado
        throw { status, message };
      }
      throw error; // erro inesperado, relança
    }

}

export async function getUserDetails(data:any){
 const token = localStorage.getItem("auth_token");
  try{
    const response = await api.get("/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }catch(error){
    console.log(error)
  }
}