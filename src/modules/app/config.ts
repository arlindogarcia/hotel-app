import axios, { AxiosError, AxiosRequestConfig } from "axios";
import getEnv from "../../utils/getEnv";
import { store } from "./mainReducer";

export const APIURL = getEnv("REACT_APP_API_HOST")
export const LOCAL_STORAGE_URL = getEnv("REACT_APP_API_HOST") + '/files';
export const APPURL = getEnv("REACT_APP_HOST")

export const getToken = () => store.getState().login.token;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: any) => {
    const axiosError = error as AxiosError;

    if (error?.response?.data?.message === 'Token inválido.') {
      window.location.href = "/logout";
    }

    return Promise.reject(axiosError)
  }
);

export const apiCall = (config: AxiosRequestConfig) =>
  axios({
    ...config,
    baseURL: APIURL,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${getToken()}`,
    },
  });
