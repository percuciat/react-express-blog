import axios, {
  AxiosRequestConfig,
  Method as AxiosMethods,
  AxiosResponse,
  AxiosPromise,
  AxiosError,
} from 'axios';

export type TypeApiResponseData<T> = {
  data: T;
};
/* export enum TypeApiResponseErrorType {
  'Auth',
  'Validation',

} */
export type TypeApiError = {
  type: string;
  code: number;
  message: string | any[];
};
export type TypeApiResponseError = {
  error: null | TypeApiError;
};

export const axiosConfig = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_ENDPOINT}`,
  /*withCredentials: true,
   headers: {
        Authorization: storage.getItemStorage('token') || '',
    },*/
});

axiosConfig.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async function (error: AxiosError) {
    return Promise.reject(error.response);
  }
);

export async function makeRequestXHR(
  method: AxiosMethods,
  options: AxiosRequestConfig
): Promise<AxiosPromise> {
  try {
    const response = await axiosConfig.request({
      method,
      url: options.url,
      data: options.data,
      ...options,
    });
    /* if (response.data.error !== null) {
      console.log(`Axios request failed with code: ${response.data.error_message}`);
      throw response.data;
    } */
    return response.data;
  } catch (errorAxios: any) {
    throw errorAxios.data;
  }
  /* return axiosConfig
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
    }); */
}
