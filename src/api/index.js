import axios from 'axios';
import {EventRegister} from 'react-native-event-listeners';
import {store} from '../redux/store';
const api = axios.create({
  // baseURL: 'http://10.9.0.55:8088/api/',
  // baseURL: 'https://testportal.igi.com.pk:8801/api/',
  baseURL: 'https://eclaims.igilife.com.pk/api/',

  //baseURL: 'https://eportal.igi.com.pk/api',
  timeout: 60000,
});

const oladocApiInstance = axios.create({
  baseURL: 'https://pkdemo.oladoc.com/api/v4/external/',
  timeout: 60000,
});

api.interceptors.request.use(
  config => {
    const isFormData = config.data instanceof FormData;
    if (!isFormData) {
      config.headers['Content-Type'] = 'application/json';
    } else {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    const data = store?.getState();
    if (data) {
      if (data?.auth) {
        if (data?.auth?.token != null) {
          if (data?.auth?.token) {
            config.headers['Authorization'] = 'Bearer ' + data?.auth?.token;
          }
        }
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    return response?.data;
  },

  error => {
    const {data, status} = error?.response || {};
    if (status == 401) {
      EventRegister.emit('logout');
    }
    if (error.message === 'Network Error') {
      return Promise.reject({
        header: 'Error',
        error: 'Something went wrong, please try again later',
      });
    }
    return Promise.reject(data ?? error);
  },
);

export const dataToQueryParameter = data => {
  if (typeof data === 'object') {
    if (!Array.isArray(data)) {
      var params = '?';
      const dataArray = Object.entries(data);
      if (dataArray.length > 0) {
        dataArray.forEach((entry, index) => {
          var amp = index < dataArray.length - 1 ? '&' : '';
          params = `${params}${entry[0]}=${entry[1]}${amp}`;
        });
        return params;
      }
    }
  } else if (typeof data === 'string') {
    return data;
  }
  return '';
};

export const jsonToFormdata = json => {
  var data = new FormData();
  const entries = Object.entries(json);
  entries.forEach(entry => {
    if (Array.isArray(entry[1])) {
      entry[1].forEach((item, index) =>
        data.append(`${entry[0]}${entry[0] !== 'files' ? '[]' : ''}`, item),
      );
    } else {
      data.append(entry[0], entry[1]);
    }
  });
  return data;
};
const get = async (
  endpoint,
  params = {},
  isFormData = false,
  headers,
  apiInstance = 'healthApp',
) => {
  const instance = apiInstance === 'healthApp' ? api : oladocApiInstance;
  return instance.get(
    params ? `${endpoint}${dataToQueryParameter(params)}` : endpoint,
  );
};
const post = async (
  endpoint,
  data = {},
  isFormData = false,
  headers,
  apiInstance = 'healthApp',
) => {
  const instance = apiInstance === 'healthApp' ? api : oladocApiInstance;
  return instance.post(endpoint, isFormData ? jsonToFormdata(data) : data, {
    headers: headers,
  });
};
const put = (endpoint, data = {}, isFormData, headers, apiInstance) => {
  const instance = apiInstance === 'healthApp' ? api : oladocApiInstance;
  return instance.put(endpoint, data);
};
const patch = (
  endpoint,
  data = {},
  isFormData,
  headers,
  apiInstance = 'healthApp',
) => {
  const instance = apiInstance === 'healthApp' ? api : oladocApiInstance;
  return instance.patch(endpoint, data);
};
const del = (
  endpoint,
  data = {},
  isFormData,
  headers,
  apiInstance = 'healthApp',
) => {
  const instance = apiInstance === 'healthApp' ? api : oladocApiInstance;
  return instance.delete(endpoint, {data});
};

export {get, post, put, patch, del};
