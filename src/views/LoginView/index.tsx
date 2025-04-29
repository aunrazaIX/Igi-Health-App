import {View, ImageBackground, Image, TouchableOpacity} from 'react-native';
import React, {JSX} from 'react';
import {images, icons} from '../../assets';
import {styles} from './styles';
import {COLORS} from '../../assets/theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AileronSemiBold, CurvedView} from '../../components';
import {LoginForm, SignUpView} from './components';

const LoginView = ({
  onPressTab,
  selectedTab,
  tabs,
}: {
  onPressTab: (name: string) => void;
  selectedTab: string;
  tabs: string[];
}) => {
  const Wrapper = (tab: string) =>
    selectedTab === tab ? LinearGradient : TouchableOpacity;

  const renderForm: Record<string, JSX.Element> = {
    login: <LoginForm />,
    signup: <SignUpView />,
  };
  return (
    <LinearGradient
      colors={[
        'rgba(72, 195, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
      ]}
      style={styles.imageContainer}>

      <KeyboardAwareScrollView enableOnAndroid>
        <View style={styles.loginContent}>
          <Image source={icons.logo} style={styles.logo} />

          <CurvedView containerStyle={styles.curvedStyle} >
            <View style={styles.loginContainer}>
              <View style={styles.tabContainer}>
                {tabs.map(tab => {
                  const TabWrapper = Wrapper(tab);
                  return (
                    <TabWrapper
                      key={tab}
                      onPress={() => onPressTab(tab)}
                      style={styles.tab}
                      colors={COLORS.activeButtonGradient}>
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
                    </TabWrapper>
                  );
                })}
              </View>
              {renderForm[selectedTab]}
            </View>
          </CurvedView>
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};

export default LoginView;
