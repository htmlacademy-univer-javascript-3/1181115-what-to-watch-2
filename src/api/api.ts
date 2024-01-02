import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import { getToken } from './token';
import { toast } from 'react-toastify';
import { ErrorType } from '../types';
import { BASE_URL, REQUEST_TIMEOUT } from './const';


export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig)=>{
      const token = getToken();

      if (token && config.headers){
        config.headers['x-token'] = token;
      }

      return config;
    }
  );

  api.interceptors.request.use(
    (response)=> response,
    (error: AxiosError<ErrorType>)=>{
      if (error.response){
        const detailMessage = (error.response.data);

        toast.warn(detailMessage.message);
      }
      throw error;
    }
  );


  return api;
};
