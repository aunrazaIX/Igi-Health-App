import React, { useState } from 'react';
import { InputField, Button, AileronSemiBold } from '../../../components';
import { styles } from '../styles';
import { icons } from '../../../assets';
import { vh, vw } from '../../../assets/theme/dimension';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../../assets/theme/colors';
import { clampRGBA } from 'react-native-reanimated/lib/typescript/Colors';

type userDetails = {
  name: string,
  email: string,
  cnicNum: string
}

const SignUpView = ({ onPress, onPressTab }: { onPress: (to: string, step?: number) => void, onPressTab: () => void }) => {



  const [userDetails, setUserDetails] = useState<userDetails>({

    name: "",
    email: "",
    cnicNum: ""
  })

  console.log(userDetails, "details")

  return (
    <>
      <AileronSemiBold
        numberOfLines={2}
        name={
          'Enter your email or CNIC Number and create a secure password to register.'
        }
        style={styles.loginContainerText}
      />
      <InputField

        label="Your Name"
        placeholder="Enter Full Name"
        rightIcon={icons.name}
        value={userDetails.name}
        onChangeText={(text) => setUserDetails((prev) => ({ ...prev, name: text }))}
      />
      <InputField
        containerStyle={style.inputContainer}
        labelStyle={style.labelStyle}
        inputStyle={style.inputStyle}
        label="Your Email"
        placeholder="Enter Email Address"
        rightIcon={icons.email}
        value={userDetails.email}
        onChangeText={(text) => setUserDetails((prev) => ({ ...prev, email: text }))}
      />

      <InputField
        label="CNIC Number"
        placeholder="12345-6789012-3"
        rightIcon={icons.cnic}
        value={userDetails.cnicNum}
        onChangeText={(text) => setUserDetails((prev) => ({ ...prev, cnicNum: text }))}


      />

      <View style={style.signupTextContainer} >

        <View style={style.signupText}>
          <AileronSemiBold name='•' style={styles.loginContainerText} />

          <AileronSemiBold
            numberOfLines={3}
            name={
              "Minimum length of 8 characters, including at least one uppercase letter, one number, and one special character."
            }
            style={styles.loginContainerText}
          />

        </View>

        <View style={style.signupText}>
          <AileronSemiBold name='•' style={styles.loginContainerText} />

          <AileronSemiBold
            numberOfLines={3}
            name={
              "Special characters can include digits and punctuation (e.g., !@#$%^&*()_+|~-={}[]:;'<>?,./)."
            }
            style={styles.loginContainerText}
          />

        </View>

        <View style={style.signupText}>
          <AileronSemiBold name='•' style={styles.loginContainerText} />

          <AileronSemiBold
            numberOfLines={3}
            name={
              "Case sensitivity is mandatory."
            }
            style={styles.loginContainerText}
          />

        </View>
      </View>





      <Button onPress={() =>{ onPress('ForgotPassword', { stepNum:  2, type: 'signup' }) } } containerStyle={styles.loginButton} name="Create Account" />
    </>
  );
};

export default SignUpView;

const style = StyleSheet.create({
  inputContainer: {
    // borderWidth: 2,
    // flexDirection: 'column',

    // paddingHorizontal: vw * 1,
  },
  labelStyle: {
    // fontSize: vw * 3,
    // color: COLORS.textGrayShade,
  },
  inputStyle: {
    // fontSize: vw * 3.5,
    // fontWeight: '700',
  },
  inputFeilds: {
    marginTop: vh * 3,
  },

  style: {
    fontSize: vw * 3.5,
  },
  signupText: {
    flexDirection: "row",
    gap: vw * 2,

    width: "100%"




  },
  signupTextContainer: {

    marginTop: vh * 2,


  }
});
