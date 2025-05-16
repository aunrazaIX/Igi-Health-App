import React, { Fragment } from 'react';
import InputField from '../../../components/InputField';
import { icons } from '../../../assets';
import styles from '../styles';
import { StyleSheet } from 'react-native';
import { vh, vw } from '../../../assets/theme/dimension';
import { COLORS } from '../../../assets/theme/colors';



const EnterEmailView = ({ setterForApiData, apiData, handleForgotPassword }: { setterForApiData: (key: string, value: string) => void, apiData: any, handleForgotPassword: () => void }) => {
  return (
    <Fragment>
      <InputField
        iconViewStyle={styles.iconView}
        rightIcon={icons.email}
        labelStyle={style.labelStyle}
        inputStyle={style.inputStyle}
        placeholder="Phone Number"
        label='Enter Mobile Number'
        containerStyle={style.inputContainer}
        value={apiData.cellNumber}
        onChangeText={(text) => setterForApiData("cellNumber", text)}
        errorMessage={apiData.error_cellNumber}

      />

      <InputField
        iconViewStyle={styles.iconView}
        rightIcon={icons.email}
        labelStyle={style.labelStyle}
        inputStyle={style.inputStyle}
        placeholder="Your Email"
        label='Enter your email Address'
        containerStyle={style.inputContainer}
        value={apiData.email}
        onChangeText={(text) => setterForApiData("email", text)}
        errorMessage={apiData.error_email}

      />

      <InputField
        iconViewStyle={styles.iconView}
        rightIcon={icons.email}
        labelStyle={style.labelStyle}
        inputStyle={style.inputStyle}
        placeholder="Enter Cnic "
        label='Enter Your Cnic Number'
        containerStyle={style.inputContainer}
        value={apiData.cnic}
        onChangeText={(text) => setterForApiData("cnic", text)}
        errorMessage={apiData.error_cnic}

      />


    </Fragment>
  );
};
export default EnterEmailView;

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