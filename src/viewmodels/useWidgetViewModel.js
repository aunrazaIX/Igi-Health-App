/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect} from '@react-navigation/native';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import {useCallback, useState} from 'react';

const useWidgetViewModel = ({route}) => {
  const {widgetName} = route?.params || {};
  const [showWidget, setShowWidget] = useState(false);
  const [token, setToken] = useState(null);
  const {trigger: generateToken, loading: generateTokenLoading} = useApiHook({
    method: 'post',
    argsOrBody: {
      identification_field: 'PHONE_NUMBER',
      identification_value: '03016335810',
      name: 'Asim Kabir',
      city: 'Lahore',
      country_code: '+92',
      company_name: 'Packages Limited',
      policy: 'PKGLTD001',
    },
    instance: 'oladoc',
    headers: {
      'x-api-key': 'ASe]dcX1Pjf91e]dcIGI-demo0qxNd_I',
    },
    apiEndpoint: endpoints.oladoc.generateToken,
    onSuccess: res => {
      if (res?.data?.data) {
        setToken(res?.data?.data?.token);
        setShowWidget(true);
      }
    },
    onError: error => {
      console.log('Error', error);
    },
  });
  useFocusEffect(
    useCallback(() => {
      generateToken();

      return () => {
        setToken(null);
      };
    }, []),
  );
  const widgetUrl = `http://pkdemo.oladoc.com/widgets/launch?screen_name=${widgetName}`;
  return {
    states: {
      generateTokenLoading,
      showWidget,
      token,
      widgetUrl,
    },
  };
};
export default useWidgetViewModel;
