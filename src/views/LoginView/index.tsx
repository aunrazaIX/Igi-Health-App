import {View, ImageBackground, Image, TouchableOpacity} from 'react-native';
import React, {JSX} from 'react';
import {images, icons} from '../../assets';
import {styles} from './styles';
import {COLORS} from '../../assets/theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AileronSemiBold, CurvedView} from '../../components';
import {LoginForm, SignUpView} from './components';
import {User} from '../../viewmodels/useLoginViewModel';
import {vh} from '../../assets/theme/dimension';

const LoginView = ({
  onPressTab,
  selectedTab,
  tabs,
  user,
  onPressforgotPassword,
  handleChange,
  handleLogin,
  loading,
}: {
  onPressTab: (name: string) => void;
  selectedTab: string;
  tabs: string[];
  user: User;
  onPressforgotPassword: (to: string) => void;
  handleChange: (field: keyof User, value: string) => void;
  handleLogin: () => void;
  loading: boolean;
}) => {
  const Wrapper = (tab: string) =>
    selectedTab === tab ? LinearGradient : TouchableOpacity;

  const renderForm: Record<string, JSX.Element> = {
    login: (
      <LoginForm
        handleChange={handleChange}
        user={user}
        onPressforgotPassword={onPressforgotPassword}
        handleLogin={handleLogin}
        loading={loading}
      />
    ),
    signup: <SignUpView />,
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
                                  : COLORS.textColor,
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
