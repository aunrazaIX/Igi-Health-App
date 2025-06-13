import React, {Fragment} from 'react';
import InputField from '../../../components/InputField';
import {StyleSheet, View} from 'react-native';
import styles from '../styles';
import AileronRegualr from '../../../components/AileronRegular';
import {vh, vw} from '../../../assets/theme/dimension';
import {COLORS} from '../../../assets/theme/colors';
import {validatePassword} from '../../../validations/authValidations';

const CreateNewPassword = ({
  setterForUpdatePasswordApiData,
  updatePasswordApiData,
}: {
  setterForUpdatePasswordApiData: (key: string, value: string) => void;
  updatePasswordApiData: any;
}) => {
  return (
    <Fragment>
      <InputField
        secureTextEntry
        label="New Password"
        placeholder="Enter New Password"
        labelStyle={style.labelStyle}
        inputStyle={style.inputStyle}
        containerStyle={style.inputContainer}
        value={updatePasswordApiData?.newPassword}
        onChangeText={text => {
          setterForUpdatePasswordApiData('newPassword', text);
          const errorMsg = validatePassword(text);
          setterForUpdatePasswordApiData('error_newPassword', errorMsg);
        }}
        errorMessage={updatePasswordApiData?.error_newPassword}
      />

      <InputField
        secureTextEntry
        label="Confirm Password"
        placeholder="Enter Confirm Password"
        labelStyle={style.labelStyle}
        inputStyle={style.inputStyle}
        containerStyle={style.inputContainer}
        value={updatePasswordApiData?.confirmPassword}
        onChangeText={text => {
          setterForUpdatePasswordApiData('confirmPassword', text);
          const errorMsg = validatePassword(text);
          setterForUpdatePasswordApiData('error_confirmPassword', errorMsg);
        }}
        errorMessage={updatePasswordApiData?.error_confirmPassword}
      />
      <View style={styles.simpleRow}>
        <View style={styles.bullet} />
        <AileronRegualr
          style={styles.ruleText}
          name="Minimum length of 8 characters, including at least one uppercase letter, one number, and one special character."
        />
      </View>
      <View style={styles.simpleRow}>
        <View style={styles.bullet} />
        <AileronRegualr
          style={styles.ruleText}
          name={`Special characters can include digits and punctuation (e.g., !@#$%^&*()_+|~-={}[]:";'<>?,./).`}
        />
      </View>
      <View style={styles.simpleRow}>
        <View style={styles.bullet} />
        <AileronRegualr
          style={styles.ruleText}
          name="Case sensitivity is mandatory."
        />
      </View>
    </Fragment>
  );
};
export default CreateNewPassword;

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
