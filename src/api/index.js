import axios from 'axios';
import {EventRegister} from 'react-native-event-listeners';
import {store} from '../redux/store';
import {fetch} from '@react-native-community/netinfo';
const api = axios.create({
  // baseURL: 'http://10.9.0.55:8088/api/',
  baseURL: 'https://testportal.igi.com.pk:8801/api',
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
    return Promise.reject(data ?? error);
  },
);

const checkInternet = async () => {
  let netState = await fetch();
  if (!netState.isConnected) {
    EventRegister.emitEvent('aun');
  }
  return netState.isConnected;
};

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
const get = async (endpoint, params = {}) => {
  let abc = await checkInternet();
  if (abc) {
    return api.get(
      params ? `${endpoint}${dataToQueryParameter(params)}` : endpoint,
    );
  }
};
const post = async (endpoint, data = {}, isFormData = false) => {
  let abc = await checkInternet();
  console.log('abc', abc);
  if (abc) {
    return api.post(endpoint, isFormData ? jsonToFormdata(data) : data);
  }
};
const put = (endpoint, data = {}) => api.put(endpoint, data);
const patch = (endpoint, data = {}) => api.patch(endpoint, data);
const del = (endpoint, data = {}) => api.delete(endpoint, {data});

export {get, post, put, patch, del};
