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
import DMSansMedium from '../../components/DMSansMedium';
import {styles} from './styles';
import Button from '../../components/Button';
import {Checkbox} from 'react-native-paper';

const index = () => {
  const [checked, setChecked] = useState(false);

  return (
    <ScrollView>
      <ImageBackground
        source={images.backgroundImage}
        style={styles.imageContainer}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />

        <View style={styles.loginContent}>
          <Image
            source={icons.igiVitalityLogo}
            style={styles.igiVitalityLogo}
          />

          <View style={styles.loginContainer}>
            <View style={styles.tabContainer}>
              <TouchableOpacity style={styles.loginTab}>
                <Text style={styles.loginTabText}>Log In</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.signupTab}>
                <Text>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <DMSansMedium
              numberOfLines={2}
              name={'enter your email or mobile number to access your account'}
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
                <Text style={styles.inputLabel}>Your Password </Text>

                <TextInput style={styles.inputText} secureTextEntry />
              </View>

              <View style={styles.loginOptions}>
                <View style={styles.rememberMe}>
                  <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(!checked)}
                  />

                  <Text> Remember Me </Text>
                  
                </View>

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
    </ScrollView>
  );
};

export default index;
