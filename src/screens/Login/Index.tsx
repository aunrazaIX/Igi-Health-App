import React from 'react';
import useLoginViewModel from '../../viewmodels/useLoginViewModel';
import LoginView from '../../views/LoginView';

const Login = () => {
  const {functions, states} = useLoginViewModel();
  const {selectedTab, tabs , user} = states;
  const {onPressTab , onPressforgotPassword , setuser} = functions;
  return (
    <LoginView setuser={setuser}  user={user} onPressforgotPassword={onPressforgotPassword} onPressTab={onPressTab} selectedTab={selectedTab} tabs={tabs} />
  );
};

export default Login;
