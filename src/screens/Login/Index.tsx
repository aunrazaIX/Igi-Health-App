import React from 'react';
import useLoginViewModel from '../../viewmodels/useLoginViewModel';
import LoginView from '../../views/LoginView';

const Login = () => {
  const {functions, states} = useLoginViewModel();
  const {selectedTab, tabs, user, loading} = states;
  const {onPressTab, onPressforgotPassword, handleChange, handleLogin} =
    functions;
  return (
    <LoginView
      loading={loading}
      handleChange={handleChange}
      user={user}
      onPressforgotPassword={onPressforgotPassword}
      onPressTab={onPressTab}
      selectedTab={selectedTab}
      tabs={tabs}
      handleLogin={handleLogin}
    />
  );
};

export default Login;
