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

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await api.post("/auth/refresh");
        const newRefreshToken = refreshResponse.data.refreshTokenId;
        const newAccessToken = refreshResponse.data.accessToken;
        const {name:userName, isAdmin:admin} = refreshResponse.data.user

        Cookies.set("refreshTokenId", newRefreshToken, {espires: 7, secure: true})
        Cookies.set("name", userName, { espires: 7 });
        Cookies.set("isAdmin", admin, { espires: 7 });
        // **Atualiza no localStorage** com a chave correta
        Cookies.set("accessToken", newAccessToken, {
          expires: 7,
          secure: true,
        });

        // Atualiza o header padrão do Axios
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? Cookies.get("accessToken") : null;

  if (token) {
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});
