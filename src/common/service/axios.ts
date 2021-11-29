/**
 * 服务用来注册ajax请求服务
 * 服务启动后注册在全局属性里
 * 服务会自动添加请求连接，其他属性依照axios不变 https://github.com/axios/axios
 * 因为storage是异步取值，因此通过静态方法设置token
 * @format
 */
import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import {navigate} from './navigation';
import storage from 'common/service/storage';
import {IDataObject} from 'types';
import Config from 'react-native-config';

//本地环境
console.log(`API-HOST: ${Config.API_HOST}`);

const baseURL = `${Config.API_HOST}`;

// 不需要提示的API
const noErrorShow = {
  '/admin/customer/getCustomerByPhone': true,
};

const formatResponse = (status: boolean, data: any, message = '') => {
  let response = {
    status,
    data,
  };
  if (message !== '' && message !== undefined) {
    response.message = message;
  }

  return response;
};

const httpService = axios.create({
  baseURL: baseURL,
  // 指定请求超时的毫秒数
  timeout: 25000,
});

const beforeSendRequest = async (config: AxiosRequestConfig) => {
  const token = await storage.load({key: 'token'});
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

const sendRequestError = (error: any) => {
  return Promise.reject(formatResponse(false, error, error.message));
};

const receiveResponseSuccess = (response: AxiosResponse) => {
  const httpCodes = [200, 201];

  return new Promise((resolve, reject) => {
    if (httpCodes.indexOf(response.status) !== -1) {
      if (response.data.code !== 10000) {
        reject({
          data: {
            code: response.data.code,
            message: response.data.message,
          },
          response,
        });
      } else {
        resolve({
          data: response.data.data || response.data || {},
          response,
        });
      }
    }
    reject({
      data: formatResponse(false, response, response.data.message),
      response,
    });
  });
};

// Do something with response error
const receiveResponseError = (error: any) => {
  const {response} = error;
  if (error.message === 'Network Error') {
    throw new ResponseError('API-Server can not be reached. It is probably down.');
  }
  if (response.data.code === 401 || response.data.code === 1000) {
    storage.remove({key: 'token'});
    setTimeout(() => {
      navigate('Auth');
    }, 1000);
  }
  return Promise.reject(formatResponse(false, response, response.data.message || response.statusText));
};

httpService.interceptors.request.use(beforeSendRequest, sendRequestError);
httpService.interceptors.response.use(receiveResponseSuccess, receiveResponseError);

class ResponseError extends Error {
  // The HTTP status code of response
  httpStatus?: number;

  // The error code in the response
  code?: number;

  // The stack trace of the server
  stack?: string;

  /**
   * Creates an instance of ResponseError.
   * @param {string} message The error message
   * @param options
   * @memberof ResponseError
   */
  constructor(message: string, options: {errorCode?: number; httpStatusCode?: number; stack?: string} = {}) {
    super(message);
    this.name = 'ResponseError';

    const {errorCode, httpStatusCode, stack} = options;
    if (errorCode) {
      this.code = errorCode;
    }
    if (httpStatusCode) {
      this.httpStatus = httpStatusCode;
    }
    if (stack) {
      this.stack = stack;
    }
  }
}

async function request(config: {
  method: Method;
  endpoint: string;
  data?: IDataObject;
  headers?: Record<string, string>;
}) {
  const {method, endpoint, headers, data} = config;
  const options: AxiosRequestConfig = {
    method,
    url: endpoint,
    headers,
  };
  if (['PATCH', 'POST', 'PUT'].includes(method)) {
    options.data = data;
  } else {
    options.params = data;
  }

  try {
    const response = await httpService.request(options);
    return response.data;
  } catch (error: any) {
    const errorResponseData = error.data;
    if (errorResponseData !== undefined && errorResponseData.message !== undefined) {
      if (errorResponseData.name === 'NodeApiError') {
        errorResponseData.httpStatus = error.response.status;
        throw errorResponseData;
      }

      throw new ResponseError(errorResponseData.message, {
        errorCode: errorResponseData.code,
        httpStatusCode: error.response.status,
        stack: errorResponseData.stack,
      });
    }

    throw error;
  }
}

export async function makeRestApiRequest(method: Method, endpoint: string, data?: IDataObject) {
  const response = await request({
    method,
    endpoint,
    data,
  });

  // @ts-ignore all cli rest api endpoints return data wrapped in `data` key
  return response.data;
}

export async function get(endpoint: string, params?: IDataObject, headers?: Record<string, string>) {
  return await request({method: 'GET', endpoint, data: params, headers});
}

export async function post(endpoint: string, data?: IDataObject, headers?: Record<string, string>) {
  return await request({method: 'POST', endpoint, data, headers});
}
