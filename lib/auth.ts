// lib/requests.ts
import { LoginData, RegisterData, RegisterResponse, ResponseError } from "./authTypes";
import { api } from "./axios";
import { AxiosError } from "axios";

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
): Promise<RegisterResponse> {
  try {
    const response = await api.post<RegisterResponse>("/auth/register", data);
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


