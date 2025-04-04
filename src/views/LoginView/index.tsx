import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {images, icons} from '../../assets';
import {styles} from './styles';
import Button from '../../components/Button';
import AileronBold from '../../components/AileronBold';
import AileronRegular from '../../components/AileronRegular';
import AileronSemiBold from '../../components/AileronSemiBold';
import {COLORS} from '../../assets/theme/colors';

const LoginView = ({
  onPressTab,
  selectedTab,
}: {
  onPressTab: (name: string) => void;
  selectedTab: string;
}) => {
  return (
    <ImageBackground
      source={images.backgroundImage}
      style={styles.imageContainer}>
      <View style={styles.loginContent}>
        <Image source={icons.logo} style={styles.logo} />
        <View style={styles.loginContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => onPressTab('login')}
              style={styles.tab}>
              <AileronSemiBold style={{}} numberOfLines={2} name="asdasda" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressTab('signup')}
              style={styles.tab}>
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <AileronSemiBold
            numberOfLines={2}
            name={'Enter your email or mobile number to access your account.'}
            style={styles.loginContainerText}
          />

          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>
                Email Address / Mobile Number
              </Text>
              <TextInput style={styles.inputText} />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Your Password</Text>

              <TextInput style={styles.inputText} secureTextEntry />
            </View>

            <View style={styles.loginOptions}>
              <View>
                <Text style={styles.forgetPassword}> Forgot Password? </Text>
              </View>
            </View>

            <View style={styles.loginButtonContainer}>
              <Button name="login" />
            </View>
          </View>
        </View>

        <View>
          <Text> Or </Text>
        </View>

        <View style={styles.loginOptionContainer}>
          <View style={styles.loginOptionBox}>
            <Image source={icons.faceID} />
            <Text> Face ID </Text>
          </View>

          <View style={styles.verticalLine} />

          <View style={styles.loginOptionBox}>
            <Image source={icons.fingerprint} />
            <Text> Biometric </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginView;
