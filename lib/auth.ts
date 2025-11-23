// lib/requests.ts
import {
  LoginData,
  RegisterData,
  RegisterResponse,
  ResponseError,
} from "./authTypes";
import { api } from "./axios";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

export async function getApiStatus() {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error: any) {
    console.error("Erro ao acessar API:", error);
    throw new Error(error?.response?.data?.message || "Erro interno");
  }
}

export async function UserLogin(data: LoginData) {
  try {
    const response = await api.post("/auth/login", data);
    Cookies.set("refreshTokenId", response.data.refreshTokenId, {
      expires: 7,
      secure: true,
      sameSite: "none"
    });
    Cookies.set("name", response.data.user.name, { expires: 7 });
    Cookies.set("isAdmin", response.data.user.isAdmin, { expires: 7 });
    return response.data;
  } catch (error) {
    // Verifica se é erro do Axios
    if (error instanceof AxiosError) {
      // Aqui você pode extrair status, mensagem, dados do erro
      const status = error.response?.status;
      const message = error.response?.data?.message ?? error.message;
      // Pode retornar um objeto “erro normalizado” ou relançar
      throw { status, message };
    }
    // Se não for um AxiosError, relança para não mascarar outros tipos de erro
    throw error;
  }
}

export async function RegisterCompany(
  data: RegisterData
){
  try {
    const response = await api.post("/auth/register", data);
     Cookies.set("refreshTokenId", response.data.refreshTokenId, {
       expires: 7,
       secure: true,
       sameSite: "none"
     });
    Cookies.set("name", response.data.user.name, { expires: 7 });
    Cookies.set("accessToken", response.data.accessToken, { expires: 7, secure: true})
    Cookies.set("isAdmin", response.data.user.isAdmin, { expires: 7 });
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

export async function logout() {
  try {
    const response = await api.post("/auth/logout");
    
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const message = error.response?.data?.message ?? error.message;
      // lança um objeto de erro padronizado
      throw { status, message };
    }
    throw error; // erro inesperado, relança
  }finally{
    Cookies.remove("refreshTokenId");
    Cookies.remove("name");
    Cookies.remove("isAdmin");
    Cookies.remove("accessToken");
  }
}
