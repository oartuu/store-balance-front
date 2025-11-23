import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error: any) => void;
  config: AxiosRequestConfig;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      if (token && prom.config.headers) {
        prom.config.headers["Authorization"] = `Bearer ${token}`;
      }
      prom.resolve(api(prom.config));
    }
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? Cookies.get("accessToken") : null;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

interface ApiError {
  message: string;
  // outras propriedades de erro que sua API retorna
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Se receber 401 — tentar fazer refresh
    if (error.response?.status === 401 && !(originalRequest as any)._retry) {
      (originalRequest as any)._retry = true;

      if (isRefreshing) {
        // Se já está no processo de refresh, enfileirar a requisição
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await api.post("/auth/refresh", null, {
          withCredentials: true,
        });

        const newRefreshToken = refreshResponse.data.refreshTokenId;
        const newAccessToken = refreshResponse.data.accessToken;
        const { name: userName, isAdmin: admin } = refreshResponse.data.user;

        // Atualiza cookies com os novos tokens + dados do usuário
        Cookies.set("refreshTokenId", newRefreshToken, {
          expires: 7,
          secure: true,
        });
        Cookies.set("accessToken", newAccessToken, {
          expires: 7,
          secure: true,
        });
        Cookies.set("name", userName, { expires: 7, secure: true });
        Cookies.set("isAdmin", String(admin), { expires: 7, secure: true });

        // Atualiza header padrão do Axios para futuros requests
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        // Atualiza a requisição original com o novo access token
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        // Captura mensagem de erro da API no refresh
        if (axios.isAxiosError(refreshError) && refreshError.response) {
          const msg =
            refreshError.response.data?.message ??
            JSON.stringify(refreshError.response.data);
          console.error("Erro no refresh:", msg);
          return Promise.reject(new Error(msg));
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Se não é 401 ou não é para retry, tratar outros erros
    if (axios.isAxiosError(error) && error.response) {
      const apiErrorMessage =
        error.response.data?.message ?? JSON.stringify(error.response.data);
      console.error("Erro da API:", apiErrorMessage);
      return Promise.reject(new Error(apiErrorMessage));
    }

    return Promise.reject(error);
  }
);
