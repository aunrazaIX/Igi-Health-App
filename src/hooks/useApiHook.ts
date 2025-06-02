/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {get, post} from '../api';

type ApiHookParams = {
  apiEndpoint: string;
  argsOrBody?: Record<string, any>;
  method: string;
  refetchOnArgumentChange?: boolean;
  transform?: any;
  onSuccess?: (data: any) => void;
  onError?: (data: any) => void;
  isFormData?: boolean;
  skip?: boolean;
};

type ApiHookReturn<T> = {
  loading: boolean;
  data: T | null;
  error: Error | null;
  trigger: (data?: any) => Promise<void>;
  transformResponse: (response: any) => void;
};

const useApiHook = <T>({
  apiEndpoint,
  method = 'get',
  argsOrBody = {},
  refetchOnArgumentChange = false,
  transform,
  isFormData = false,
  onError,
  onSuccess,
  skip = false,
}: ApiHookParams): ApiHookReturn<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const apiCallingFunction = async (data?: any) => {
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
      );
      dataToSave = res;
      if (transform) {
        const {keyToLoop, ...mappings} = transform;
        const list = keyToLoop ? res[keyToLoop] : res;
        console.log(keyToLoop, 'list');
        if (Array.isArray(list)) {
          const transformed = list.map(item => {
            const transformedItem: Record<string, any> = {...item};
            Object.entries(mappings).forEach(([newKey, sourceKey]) => {
              transformedItem[newKey] = item[sourceKey];
            });

            return transformedItem;
          });
          dataToSave = transformed;
        }
      }
      setData(dataToSave);
      if (onSuccess) {
        onSuccess(dataToSave);
      }

      return;
    } catch (e) {
      if (onError) {
        onError(e as Error);
      }
      setError(e as Error);
      return;
    } finally {
      setLoading(false);
    }
  };

  const transformResponse = (response: any) => {
    setData(response);
  };

  useFocusEffect(
    useCallback(
      () => {
        if (method === 'get' && !skip) {
          apiCallingFunction();
        }
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
