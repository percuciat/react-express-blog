import {
  AxiosRequestConfig as IOptionsApi,
  Method as TMethodApi,
  AxiosResponse,
  AxiosError,
} from 'axios';
import axios from 'axios';
import { storage } from '../storage';

export const axiosConfig = axios.create({
  baseURL: `${process.env.SERVER_ENDPOINT}`,
  withCredentials: true,
  /* headers: {
        Authorization: storage.getItemStorage('token') || '',
    },*/
});

axiosConfig.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log('REQUEST error axios interceptor:', error);
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async function (error) {
    console.log('RESPONSE interceptor error:', error.response);
    return Promise.reject(error.response);
  }
);

/*
axiosCommon.interceptors.request.use(
    (config) => {
        const token = storage.getItemStorage('token');
        const { headers } = config;
        if (token && headers) {
            headers.Authorization = `Bearer ${token}`;
        }
        console.log('resolve config axios interceptor:', config);
        return config;
    },
    (error) => {
        console.log('error axios interceptor:', error);
        return Promise.reject(error);
    }
);

let f = false;

axiosCommon.interceptors.response.use(
    async (response: AxiosResponse) => {
        const { config, data } = response;
        if (config.headers && data.code === 10002 && !f) {
            f = true;
            const refreshedToken = await axiosCommon.request({
                method: 'put',
                url: 'auth/token',
            });
            if (refreshedToken.data.status === 'error') {
                throw refreshedToken.data;
            }
            storage.setItemStorage('token', refreshedToken.data.token);
            config.headers.Authorization = `Bearer ${refreshedToken.data.token}`;
            f = false;
            return axiosCommon(response);
        }
        return response;
    },
    async function (error) {
        console.log('RESPONSE interceptor error:', error);
        return Promise.reject(error);
    }
);
*/

export function makeRequestXHR(
  method: TMethodApi,
  options: IOptionsApi
): Promise<AxiosResponse<any>> {
  return axiosConfig
    .request({ method, url: options.url, data: options.data, ...options })
    .then((res) => {
      if (res.data.status === 'error') {
        console.log(`Axios request failed with code: ${res.data.error_message}`);
        throw res.data;
      }
      return res.data;
    })
    .catch((errorAxios) => {
      throw errorAxios.data;
    });
}
