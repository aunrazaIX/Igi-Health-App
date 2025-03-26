import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {get} from '../api';

type ApiHookParams = {
  apiEndpoint: string;
  args?: Record<string, any>;
  refetchOnArgumentChange?: boolean;
};

type ApiHookReturn<T> = {
  loading: boolean;
  data: T | null;
  error: Error | null;
  refetch: () => Promise<void>;
};

const useGetApiHook = <T>({
  apiEndpoint,
  args = {},
  refetchOnArgumentChange = false,
}: ApiHookParams): ApiHookReturn<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const apiCallingFunction = async () => {
    try {
      setLoading(true);
      const res = await get(apiEndpoint, args);
      if (res?.data) {
        setData(res.data);
        return;
      }
    } catch (e) {
      setError(e as Error);
      return;
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(
      () => {
        apiCallingFunction();
      },
      refetchOnArgumentChange ? [args] : [],
    ),
  );

  return {
    loading,
    data,
    error,
    refetch: apiCallingFunction,
  };
};

export default useGetApiHook;
