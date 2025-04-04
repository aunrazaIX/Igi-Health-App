import React from 'react';
import LoginView from '../../views/LoginView';
import useLoginViewModel from '../../viewmodels/useLoginViewModel';

const Login = () => {
  const {functions, states} = useLoginViewModel();

  const {selectedTab} = states;
  const {onPressTab} = functions;
  return <LoginView onPressTab={onPressTab} selectedTab={selectedTab} />;
};

export default Login;
