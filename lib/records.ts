
import { api } from "./axios";

export async function getTodayRecords() {
  const token = localStorage.getItem("auth_token");
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
  const token = localStorage.getItem("auth_token");
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
  const token = localStorage.getItem("auth_token");
  try {
    const response = await api.get("/records",  {
      params: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function finishDay(data:any){
    const token = localStorage.getItem("auth_token");
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
    const token = localStorage.getItem("auth_token");
    try{
        const response = await api.post("/records", data, {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data
    }catch(error){
        console.log(error)
    }

}