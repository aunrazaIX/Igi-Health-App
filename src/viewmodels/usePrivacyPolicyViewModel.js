import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';

const usePrivacyPolicyModel = () => {
  const [webKey, setWebKey] = useState(0);
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    useCallback(() => {
      setWebKey(prev => prev + 1);
      setLoading(true);
    }, []),
  );

  const onLoadEnd = () => {
    setLoading(false);
  };
  return {
    states: {
      loading,
      webKey,
    },
    functions: {
      onLoadEnd,
    },
  };
};
export default usePrivacyPolicyModel;
