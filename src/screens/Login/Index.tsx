import React from 'react';
import useLoginViewModel from '../../viewmodels/useLoginViewModel';
import LoginView from '../../views/LoginView';

const Login = () => {
  const {functions, states} = useLoginViewModel();
  const {selectedTab, tabs} = states;
  const {onPressTab} = functions;
  return (
    <LoginView onPressTab={onPressTab} selectedTab={selectedTab} tabs={tabs} />
  );
};

export default Login;
