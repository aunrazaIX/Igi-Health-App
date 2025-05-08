import axios from 'axios';
import {store} from '../redux';
import {EventRegister} from 'react-native-event-listeners';

const api = axios.create({
  baseURL: 'https://www.google.com',
  timeout: 60000,
});

api.interceptors.request.use(
  config => {
    config.auth = {
      username: USER_NAME,
      password: PASSWORD,
    };
    const isFormData = config.data instanceof FormData;
    if (!isFormData) {
      config.headers['Content-Type'] = 'application/json';
    } else {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    config.headers['X-Requested-With'] = 'x';
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
    return Promise.reject(
      status == 500 ? 'Something Went Wrong' : data ?? error,
    );
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
    data.append(entry[0], entry[1]);
  });
  return data;
};
const get = (endpoint, params = {}) =>
  api.get(params ? `${endpoint}${dataToQueryParameter(params)}` : endpoint);
const post = (endpoint, data = {}, isFormData = false) =>
  api.post(endpoint, isFormData ? jsonToFormdata(data) : data);
const put = (endpoint, data = {}) => api.put(endpoint, data);
const patch = (endpoint, data = {}) => api.patch(endpoint, data);
const del = (endpoint, data = {}) => api.delete(endpoint, {data});

export {get, post, put, patch, del};
