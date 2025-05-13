import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {useDispatch} from 'react-redux';
import {setUserData} from '../redux/authSlice';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';

export type User = {
  userName: string | null;
  password: string | null;
};

export type SignupUser = {
  name: string | null;
  email: string | null;
  cnic: string | null;
};

type UseLoginViewModelReturn = {
  states: {
    selectedTab: string;
    tabs: string[];
    user: User;
    loading: boolean;
    signupUser: SignupUser;
  };
  functions: {
    onPressTab: (name: string) => void;
    onPressforgotPassword: (to: string) => void;
    handleChange: (property: keyof User, value: string) => void;
    handleLogin: () => void;
    handleSignup: () => void;
    handleSignupChange: (field: keyof SignupUser, value: string) => void;
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

  const {checkForError, resetStates, setterForApiData, apiData} =
    useErrorHandlingHook({
      email: '',
      cellNumber: '',
      cnic: '',
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

  const handleSignupChange = (field: keyof SignupUser, value: string) => {
    setSignupUser({...signupUser, [field]: value});
  };

  const handleLogin = () => {
    trigger();
  };

  const handleSignup = () => {
    console.log('SignUp Data', signupUser);
  };

  const tabs = ['login', 'signup'];
  return {
    states: {
      selectedTab,
      tabs,
      user,
      loading,
      apiData,
    },
    functions: {
      onPressTab,
      onPressforgotPassword,
      handleChange,
      handleLogin,
      handleSignup,
      handleSignupChange,
      setterForApiData,
    },
  };
};

export default useLoginViewModel;
