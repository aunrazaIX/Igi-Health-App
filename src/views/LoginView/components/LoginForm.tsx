import React from 'react';
import {
  AileronBold,
  AileronSemiBold,
  Button,
  CheckBox,
  InputField,
} from '../../../components';
import { styles } from '../styles';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../../../assets';
import { vh, vw } from '../../../assets/theme/dimension';
import { COLORS } from '../../../assets/theme/colors';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../../redux/authSlice';
import {User} from '../../../viewmodels/useLoginViewModel'




const LoginForm = ({ onPressforgotPassword, user , setuser }: { onPressforgotPassword: (to: string) => void, user: User , setuser: React.Dispatch<React.SetStateAction<User>> }) => {

  const dispatch = useDispatch();

  const handleChange = (key, value) => {
    setuser(prev => ({ ...prev, [key]: value }));
  };
  


  const handleLogin = ()=>{
    dispatch(setToken("usman"))
  }


  return (
    <>
      <AileronSemiBold
        numberOfLines={2}
        name={'Enter your email or mobile number to access your account.'}
        style={styles.loginContainerText}
      />

      <View style={style.inputFeilds}>
        <InputField
          label="Email Address / Mobile Number"
          placeholder="Enter Email/Mobile Number"
          rightIcon={icons.email}
          containerStyle={style.inputContainer}
          labelStyle={style.labelStyle}
          inputStyle={style.inputStyle}
          value={user.userName}
          onChangeText={(text) => handleChange('userName', text)}
          
        />

        <InputField
          label="Your Password"
          secureTextEntry
          placeholder="Enter Password"
          containerStyle={style.inputContainer}

          labelStyle={style.labelStyle}
          inputStyle={style.inputStyle}
          value={user.password}

          onChangeText={(text) => handleChange('password', text)}
          
        />

      </View>

      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        <CheckBox
          description="Remember me"
        />

        <TouchableOpacity onPress={() => { onPressforgotPassword("ForgotPassword") }}>
          <AileronBold style={styles.forgetPassword} name="Forgot Password ?" />
        </TouchableOpacity>
      </View>

      <Button onPress={handleLogin}   showIcon={icons.loginArrow} containerStyle={styles.loginButton} name="Login" />

      <AileronBold style={styles.orText} name="Or" />

      <View style={styles.loginOptionContainer}>

        
        <TouchableOpacity style={styles.loginOptionBox}>
          <Image
            style={styles.loginOptionContainerIcons}
            source={icons.faceID}
          />
          <AileronBold style={style.style} name={'Face ID'} />
        </TouchableOpacity>

        <View style={styles.verticalLine} />

        <TouchableOpacity style={styles.loginOptionBox}>
          <Image
            style={styles.loginOptionContainerIcons}
            source={icons.fingerprint}
          />
          <AileronBold style={style.style} name={'Biometric'} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginForm;

const style = StyleSheet.create({
  inputContainer: {
    borderWidth: 2,
    flexDirection: 'column',

    paddingHorizontal: vw * 1,
  },
  labelStyle: {
    fontSize: vw * 3,
    color: COLORS.textGrayShade,
  },
  inputStyle: {
    fontSize: vw * 3.5,
    fontWeight: '700',
  },
  inputFeilds: {
    marginTop: vh * 3,
  },

  style: {
    fontSize: vw * 3.5,
  },
});
