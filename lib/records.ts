import { api } from "./axios";

export async function getTodayRecords() {
const token = localStorage.getItem("auth_token");
 try{
    const response = await api.get("/records", {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
    return (response.data.records)
 }catch(error){
    console.log(error)
 }

}
export async function getDayRecords() {
const token = localStorage.getItem("auth_token");
 try{
    const response = await api.get("/records/day-records", {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
    return (response.data)
 }catch(error){
    console.log(error)
 }

}