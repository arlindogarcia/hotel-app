import axios, { AxiosRequestConfig } from "axios";
import getEnv from "../../utils/getEnv";
import { store } from "./mainReducer";

export const APIURL = getEnv("REACT_APP_API_HOST")

export const getToken = () => store.getState().login.token;

export const apiCall = (config: AxiosRequestConfig) =>
  axios({
    ...config,
    baseURL: APIURL,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${getToken()}`,
    },
  });
