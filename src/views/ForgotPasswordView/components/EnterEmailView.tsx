import React, {Fragment} from 'react';
import InputField from '../../../components/InputField';
import {icons} from '../../../assets';
import styles from '../styles';
import {StyleSheet} from 'react-native';
import {vh, vw} from '../../../assets/theme/dimension';
import {COLORS} from '../../../assets/theme/colors';
import {
  validateCNIC,
  validateEmail,
  validateMobileNumber,
} from '../../../validations/authValidations';

const EnterEmailView = ({
  setterForApiData,
  apiData,
}: {
  setterForApiData: (key: string, value: string) => void;
  apiData: any;
}) => {
  return (
    <Fragment>
      <InputField
        iconViewStyle={styles.iconView}
        rightIcon={icons.mobNumber}
        labelStyle={style.labelStyle}
        inputStyle={style.inputStyle}
        label="Mobile Number"
        placeholder="Enter Your Mobile Number"
        containerStyle={style.inputContainer}
        value={apiData?.cellNumber}
        keyboardType="phone-pad"
        onChangeText={text => {
          setterForApiData('cellNumber', text);
          const errorMsg = validateMobileNumber(text);
          setterForApiData('error_cellNumber', errorMsg);
        }}
        errorMessage={apiData?.error_cellNumber}
        maxLength={13}
        mask={[
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
      />

      <InputField
        iconViewStyle={styles.iconView}
        rightIcon={icons.email}
        labelStyle={style.labelStyle}
        inputStyle={style.inputStyle}
        label="Your Email"
        placeholder="Enter Your Official Email Address"
        containerStyle={style.inputContainer}
        value={apiData?.email}
        onChangeText={text => {
          setterForApiData('email', text);
          const errorMsg = validateEmail(text);
          setterForApiData('error_email', errorMsg);
        }}
        errorMessage={apiData?.error_email}
      />

      <InputField
        iconViewStyle={styles.iconView}
        rightIcon={icons.cnic}
        labelStyle={style.labelStyle}
        inputStyle={style.inputStyle}
        label="CNIC Number"
        placeholder="Enter Your CNIC Number"
        containerStyle={style.inputContainer}
        value={apiData?.cnic}
        onChangeText={text => {
          setterForApiData('cnic', text);
          const errorMsg = validateCNIC(text);
          setterForApiData('error_cnic', errorMsg);
        }}
        errorMessage={apiData?.error_cnic}
        mask={[
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
        ]}
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
