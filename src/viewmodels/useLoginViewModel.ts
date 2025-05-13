import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {useDispatch} from 'react-redux';
import {setUserData} from '../redux/authSlice';

export type User = {
  userName: string | null;
  password: string | null;
};

type UseLoginViewModelReturn = {
  states: {
    selectedTab: string;
    tabs: string[];
    user: User;
    loading: boolean;
  };
  functions: {
    onPressTab: (name: string) => void;
    onPressforgotPassword: (to: string) => void;
    handleChange: (property: keyof User, value: string) => void;
    handleLogin: () => void;
  };
};

const useLoginViewModel = (): UseLoginViewModelReturn => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState<string>('login');
  const [user, setUser] = useState<User>({
    userName: null,
    password: null,
  });

  const {data, loading, trigger, error} = useApiHook({
    apiEndpoint: endpoints.auth.login,
    method: 'post',
    argsOrBody: user,
    onSuccess: res => {
      dispatch(setUserData(res));
    },
  });
  const onPressTab = (name: string) => setSelectedTab(name);

  const onPressforgotPassword = (to: string) => {
    navigation.navigate(to);
  };

  const handleChange = (property: keyof User, value: string) => {
    setUser({...user, [property]: value});
  };

  const handleLogin = () => {
    trigger();
  };

  const tabs = ['login', 'signup'];
  return {
    states: {
      selectedTab,
      tabs,
      user,
      loading,
    },
    functions: {
      onPressTab,
      onPressforgotPassword,
      handleChange,
      handleLogin,
    },
  };
};

export default useLoginViewModel;
