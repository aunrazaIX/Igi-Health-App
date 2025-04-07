import React, {Fragment} from 'react';
import InputField from '../../../components/InputField';
import {View} from 'react-native';
import styles from '../styles';
import AileronRegualr from '../../../components/AileronRegular';

const CreateNewPassword = () => {
  return (
    <Fragment>
      <InputField
        secureTextEntry
        label="New Password"
        placeholder="Enter New Password"
      />
      <InputField
        secureTextEntry
        label="Confirm Password"
        placeholder="Enter Confirm Password"
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
