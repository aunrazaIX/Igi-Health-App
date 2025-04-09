import React from 'react'
import {InputField, Button, AileronSemiBold} from '../../../components';
import {styles} from '../styles';
import { icons } from '../../../assets';

const SignUpView = () => {
  return (
    <>
      <AileronSemiBold
        numberOfLines={2}
        name={'Enter your email or CNIC Number and create a secure password to register.'}
        style={styles.loginContainerText}
      />
      <InputField label="Your Name" placeholder="Enter Full Name" rightIcon={icons.name}/>
      <InputField label="Your Email" placeholder="Enter Email Address" rightIcon={icons.email}/>
      <InputField
        label="CNIC Number"
        placeholder="12345-6789012-3" rightIcon={icons.cnic}
      />
      <AileronSemiBold
        numberOfLines={7}
        name={'• Minimum length of 8 characters, including at least one uppercase letter, one number, and one special character. \n• Special characters can include digits and punctuation (e.g., !@#$%^&*()_+|~-={}[]:";<>?,./) \n• Case sensitivity is mandatory.'}
        style={styles.loginContainerText}
      />
      <Button containerStyle={styles.loginButton} name="Create Account" />
    </>
  )
}

export default SignUpView