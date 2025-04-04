import {View, ImageBackground, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {images, icons} from '../../assets';
import {styles} from './styles';
import Button from '../../components/Button';
import AileronSemiBold from '../../components/AileronSemiBold';
import {COLORS} from '../../assets/theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import InputField from '../../components/InputField';
import CheckBox from '../../components/CheckBox';

const LoginView = ({
  onPressTab,
  selectedTab,
}: {
  onPressTab: (name: string) => void;
  selectedTab: string;
}) => {
  const LoginWrapper = selectedTab === 'login' ? LinearGradient : View;
  const SignupWrapper = selectedTab === 'signup' ? LinearGradient : View;
  return (
    <ImageBackground
      source={images.backgroundImage}
      style={styles.imageContainer}>
      <View style={styles.loginContent}>
        <Image source={icons.logo} style={styles.logo} />
        <View style={styles.loginContainer}>
          <View style={styles.tabContainer}>
            <LoginWrapper
              style={styles.tab}
              colors={COLORS.activeButtonGradient}>
              <TouchableOpacity onPress={() => onPressTab('login')}>
                <AileronSemiBold
                  style={[
                    styles.tabText,
                    {
                      color:
                        selectedTab === 'login'
                          ? COLORS.white
                          : COLORS.textColor,
                    },
                  ]}
                  numberOfLines={2}
                  name="Login"
                />
              </TouchableOpacity>
            </LoginWrapper>
            <SignupWrapper
              style={styles.tab}
              colors={COLORS.activeButtonGradient}>
              <TouchableOpacity onPress={() => onPressTab('signup')}>
                <AileronSemiBold
                  style={[
                    styles.tabText,
                    {
                      color:
                        selectedTab === 'signup'
                          ? COLORS.white
                          : COLORS.textColor,
                    },
                  ]}
                  numberOfLines={2}
                  name="Signup"
                />
              </TouchableOpacity>
            </SignupWrapper>
          </View>

          <AileronSemiBold
            numberOfLines={2}
            name={'Enter your email or mobile number to access your account.'}
            style={styles.loginContainerText}
          />
          <InputField
            label="Email Address / Mobile Number"
            placeholder="Enter Email/Mobile Number"
          />
          <InputField
            label="Your Password"
            secureTextEntry
            placeholder="Enter Password"
          />
          <View style={styles.row}>
            <CheckBox checked={true} description="Remember me" />
          </View>

          <Button name="login" />
        </View>
      </View>

      {/* <View style={styles.loginOptionContainer}>
        <View style={styles.loginOptionBox}>
          <Image source={icons.faceID} />
          <Text> Face ID </Text>
        </View>

        <View style={styles.verticalLine} />

        <View style={styles.loginOptionBox}>
          <Image source={icons.fingerprint} />
          <Text> Biometric </Text>
        </View>
      </View> */}
    </ImageBackground>
  );
};

export default LoginView;
