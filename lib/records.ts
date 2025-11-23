
import { AxiosError } from "axios";
import { api } from "./axios";
import Cookies from "js-cookie";

export async function getTodayRecords() {
  const token = Cookies.get("accessToken");
  try {
    const response = await api.get("/records", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.records;
  } catch (error) {
    console.log(error);
  }
}
export async function getDayRecords() {
  const token = Cookies.get("accessToken");
  try {
    const response = await api.get("/records/day-records", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getDayRecord(data: any) {
  const token = Cookies.get("accessToken");
  try {
    const response = await api.get("/records",  {
      params: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
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

export async function finishDay(data:any){
    const token = Cookies.get("accessToken");
    try{
        const response = await api.post("/records/finish", data, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data
    }catch(error){
        console.log(error)
    }

}
export async function createRecord(data:any){
    const token = Cookies.get("accessToken");
    try{
        const response = await api.post("/records", data, {
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
export async function startDay(){
    const token = Cookies.get("accessToken");
    try{
        const response = await api.post("/records/start", {
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