// src/hooks/useAuthAxios.ts
import { Cookies } from 'react-cookie';
import axios, { AxiosError, AxiosRequestHeaders, AxiosInstance } from 'axios';

interface ITokenExpired {
  statusCode: 401;
  message: string;
  error?: string;
}

// Create a single instance of axios outside the hook
const baseAxios = axios.create();
const cookies = new Cookies();

const handleError = (error: AxiosError) => {
  if (error.response) {
    if (
      error.response.data &&
      error.response.status === 401 &&
      (error.response.data as ITokenExpired)?.error === "Unauthorized" &&
      (error.response.data as ITokenExpired)?.message === "Session expired"
    ) {
      cookies.remove("cryptpay-token");
    }
    return error.response;
  } else if (error.request) {
    return error.request;
  }
  return error;
};

// Set up interceptors once, outside the hook
baseAxios.interceptors.request.use(
  async (config) => {
    if (!config.headers?.Authorization) {
      const token = cookies.get("cryptpay-token");
      if (token) {
        if (!config.headers) {
          config.headers = {} as AxiosRequestHeaders;
        }
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(handleError(error))
);

baseAxios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(handleError(error))
);

// Hook now just returns the pre-configured instance
const useAuthAxios = (): AxiosInstance => {
  return baseAxios;
};

export default useAuthAxios;
