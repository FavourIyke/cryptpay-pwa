// src/hooks/useAuthAxios.ts
import { useCookies, Cookies} from 'react-cookie';
import axios, { AxiosError, AxiosRequestHeaders } from 'axios';

interface ITokenExpired {
  statusCode: 401;
  message: string;
  error?: string;
}
// Define your custom hook
const useAuthAxios = () => {
  const [, setCookie, removeCookie] = useCookies(["token"]);
const cookies = new Cookies();
  const handleError = (error: AxiosError) => {
    if (error.response) {
      if (
        error.response.data &&
        error.response.status === 401 &&
        (error.response.data as ITokenExpired)?.error === "Unauthorized" &&
        (error.response.data as ITokenExpired)?.message === "Session expired"
      ) {
        removeCookie("token");
      }
      return error.response;
    } else if (error.request) {
      return error.request;
    }
    return error;
  };

  const baseAxios = axios.create();

  baseAxios.interceptors.request.use(
    async (config) => {
      if (!config.headers?.Authorization) {
        const token = cookies.get("token");
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

  return baseAxios;
};

export default useAuthAxios;
