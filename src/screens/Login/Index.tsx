import React from 'react';
import useLoginViewModel from '../../viewmodels/useLoginViewModel';
import LoginView from '../../views/LoginView';

const Login = () => {
  const { functions, states } = useLoginViewModel();
  const { selectedTab, tabs, loading, signupApiData, loadingSignup, loginApiData, rememberMe, checked } = states;
  const { onPressTab, onPressforgotPassword, handleLogin, handleSignup, signupSetterForApiData, loginSetterForApiData, handleCheck } =
    functions;


  return (
    <LoginView
      signupApiData={signupApiData}
      loginApiData={loginApiData}
      loading={loading}
      onPressforgotPassword={onPressforgotPassword}
      onPressTab={onPressTab}
      selectedTab={selectedTab}
      tabs={tabs}
      handleLogin={handleLogin}
      handleSignup={handleSignup}
      signupSetterForApiData={signupSetterForApiData}
      loadingSignup={loadingSignup}
      loginSetterForApiData={loginSetterForApiData}
      handleCheck={handleCheck}
      checked={checked}
      rememberMe={rememberMe}
    />
  );
};
export default Login;
