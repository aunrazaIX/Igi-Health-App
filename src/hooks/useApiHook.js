/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {get, post} from '../api';

const useApiHook = ({
  apiEndpoint,
  method = 'get',
  argsOrBody = {},
  refetchOnArgumentChange = false,
  transform,
  isFormData = false,
  onError,
  onSuccess,
  skip = false,
  onUnmount,
  headers,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const apiCallingFunction = async data => {
    setError(null);
    setData(null);
    try {
      let dataToSave = null;
      setLoading(true);
      let _method = method === 'get' ? get : post;

      const res = await _method(
        apiEndpoint,
        data ? data : argsOrBody,
        isFormData,
        headers,
      );
      dataToSave = res;
      if (transform) {
        const {keyToLoop, ...mappings} = transform;
        const key = res[keyToLoop];
        const list = keyToLoop ? key : res;
        if (Array.isArray(list)) {
          const transformed = list?.map(item => {
            const transformedItem = {...item};
            Object.entries(mappings).forEach(([newKey, sourceKey]) => {
              transformedItem[newKey] = item[sourceKey];
            });
            return transformedItem;
          });
          dataToSave = transformed;
        }
      }
      setData(dataToSave);
      if (onSuccess && res) {
        onSuccess(dataToSave);
      }

      return;
    } catch (e) {
      if (onError) {
        onError(e);
      }
      setError(e);
      return;
    } finally {
      setLoading(false);
    }
  };

  const transformResponse = response => {
    setData(response);
  };

  useFocusEffect(
    useCallback(
      () => {
        if (method === 'get' && !skip) {
          apiCallingFunction();
        }
        return () => {
          if (onUnmount) {
            onUnmount();
          }
        };
      },
      refetchOnArgumentChange ? [JSON.stringify(argsOrBody)] : [],
    ),
  );

  return {
    loading,
    data,
    error,
    trigger: apiCallingFunction,
    transformResponse,
  };
};

export default useApiHook;
