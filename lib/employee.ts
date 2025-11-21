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
    console.log(error);
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
        console.log(error)
    }

}