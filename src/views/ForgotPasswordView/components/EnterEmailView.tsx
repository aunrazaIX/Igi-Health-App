import React, {Fragment} from 'react';
import InputField from '../../../components/InputField';
import {icons} from '../../../assets';
import styles from '../styles';

const EnterEmailView = () => {
  return (
    <Fragment>
      <InputField
        iconViewStyle={styles.iconView}
        rightIcon={icons.email}
        placeholder="Your Email"
      />
    </Fragment>
  );
};
export default EnterEmailView;
