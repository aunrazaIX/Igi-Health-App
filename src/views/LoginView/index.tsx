import {View, ImageBackground, Image, TouchableOpacity} from 'react-native';
import React, {JSX} from 'react';
import {images, icons} from '../../assets';
import {styles} from './styles';
import {COLORS} from '../../assets/theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AileronSemiBold, CurvedView} from '../../components';
import {LoginForm, SignUpView} from './components';
import ModalLoading from '../../components/ModalLoading';

const LoginView = ({
  onPressTab,
  selectedTab,
  tabs,
  onPressforgotPassword,
  handleLogin,
  loading,
  handleSignup,
  signupSetterForApiData,
  signupApiData,
  loadingSignup,
  loginApiData,
  loginSetterForApiData,
  handleCheck,
  checked,
  onPressToucdId,
}: {
  onPressTab: (name: string) => void;
  selectedTab: string;
  tabs: string[];
  onPressforgotPassword: (to: string) => void;
  handleLogin: () => void;
  loading: boolean;
  handleSignup: () => void;
  signupSetterForApiData: (key: string, value: any) => void;
  signupApiData: any;
  loadingSignup: boolean;
  loginApiData: any;
  loginSetterForApiData: (key: string, value: any) => void;
  handleCheck: () => void;
  rememberMe: boolean;
  checked: boolean;
  onPressToucdId: any;
}) => {
  const Wrapper = (tab: string) =>
    selectedTab === tab ? LinearGradient : TouchableOpacity;

  const renderForm: Record<string, JSX.Element> = {
    login: (
      <LoginForm
        onPressforgotPassword={onPressforgotPassword}
        handleLogin={handleLogin}
        loading={loading}
        loginApiData={loginApiData}
        loginSetterForApiData={loginSetterForApiData}
        handleCheck={handleCheck}
        checked={checked}
        onPressToucdId={onPressToucdId}
      />
    ),
    signup: (
      <SignUpView
        signupSetterForApiData={signupSetterForApiData}
        signupApiData={signupApiData}
        handleSignup={handleSignup}
        loadingSignup={loadingSignup}
      />
    ),
  };
  return (
    <KeyboardAwareScrollView enableOnAndroid>
      <ImageBackground
        source={images.loginBackground}
        style={styles.imageContainer}>
        <View style={styles.loginContent}>
          <Image source={icons.logo} style={styles.logo} />

          <CurvedView
            containerStyle={styles.curvedStyle}
            backColor={{backgroundColor: 'transparent'}}>
            <View style={styles.loginContainer}>
              <View style={styles.tabContainer}>
                {tabs.map(tab => {
                  const TabWrapper = Wrapper(tab);
                  return (
                    <TabWrapper
                      key={tab}
                      onPress={() => onPressTab(tab)}
                      style={styles.tab}
                      colors={COLORS.PriorGradient}>
                      <View style={styles.wrapper}>
                        <AileronSemiBold
                          style={[
                            styles.tabText,
                            {
                              color:
                                selectedTab === tab
                                  ? COLORS.white
                                  : COLORS.black,
                            },
                          ]}
                          numberOfLines={2}
                          name={tab === 'login' ? 'Login' : 'Signup'}
                        />
                      </View>
                    </TabWrapper>
                  );
                })}
              </View>

              {renderForm[selectedTab]}
            </View>
          </CurvedView>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default LoginView;
