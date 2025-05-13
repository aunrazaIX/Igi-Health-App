import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, { JSX } from 'react';
import { images, icons } from '../../assets';
import { styles } from './styles';
import { COLORS } from '../../assets/theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AileronSemiBold, CurvedView } from '../../components';
import { LoginForm, SignUpView } from './components';
import { User } from '../../viewmodels/useLoginViewModel'


const LoginView = ({
  onPressTab,
  selectedTab,
  tabs,
  user,
  onPress,


}: {
  onPressTab: (name: string) => void;
  selectedTab: string;
  tabs: string[];
  user: User,
  onPress: (to: string) => void,
  setuser: React.Dispatch<React.SetStateAction<User>>
}) => {




  const Wrapper = (tab: string) =>
    selectedTab === tab ? LinearGradient : TouchableOpacity;

  const renderForm: Record<string, JSX.Element> = {
    login: <LoginForm onPress={onPress} />,
    signup: <SignUpView onPress={onPress} onPressTab={onPressTab} />,
  };
  return (

    <KeyboardAwareScrollView  >

      <ImageBackground
        source={images.loginBackground}
        style={styles.imageContainer}>


        <View style={styles.loginContent}>
          <Image source={icons.logo} style={styles.logo} />

          <CurvedView containerStyle={styles.curvedStyle}>

            <View style={styles.loginContainer}>
              <View style={styles.tabContainer}>
                {tabs.map(tab => {
                  const TabWrapper = Wrapper(tab);
                  return (
                    <TabWrapper
                      key={tab}
                      onPress={() => onPressTab(tab)}
                      style={styles.tab}
                      colors={COLORS.PriorGradient}
                    >
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

      </ImageBackground>
    </KeyboardAwareScrollView>

  );
};

export default LoginView;
