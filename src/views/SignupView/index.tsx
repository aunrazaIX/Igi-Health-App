import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import {images} from '../../assets';
import {styles} from './styles'

const SignupView = () => {
  return <ImageBackground style={styles.imageContainer}  source={images.SignupBg}>


  </ImageBackground>;
};

export default SignupView;
