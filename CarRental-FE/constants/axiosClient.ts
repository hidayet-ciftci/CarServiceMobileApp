import axios from "axios";
import { clearToken, setToken } from "../store/authSlice";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveTokens,
} from "./storage";

const axiosClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await getRefreshToken();
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/api/Auth/refresh`,
          { refreshToken },
        );
        const newAccessToken = response.data.data.accessToken;
        const newRefreshToken = response.data.data.refreshToken;
        if (refreshToken) {
          await saveTokens(newAccessToken, newRefreshToken);
        }
        // lazy Loading sayesinde circular dependency sorunundan kurtuluyoruz
        const { store } = await import("@/store/store");
        store.dispatch(setToken(newAccessToken));
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        console.log("token refrehsed");
        return axiosClient(originalRequest);
      } catch (err) {
        await clearTokens();
        const { store } = await import("@/store/store");
        store.dispatch(clearToken());
      }
    }
    // API yani axios hataları interceptor ile burada manage edilip dışarıya verilmeli
    if (error.response?.status == 404) {
      throw new Error("Bağlantı hatası");
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
