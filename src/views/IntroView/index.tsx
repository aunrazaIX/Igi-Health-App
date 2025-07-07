import {Image, TouchableOpacity, View, FlatList, Text} from 'react-native';
import React, {useState} from 'react';
import {
  AileronBold,
  AileronSemiBold,
  CurvedView,
  TopView,
} from '../../components';
import {icons, images} from '../../assets';
import styles from './styles';

const IntroView = ({}) => {
  return (
    <>
      <View style={styles.IntroImage}>
        <Image source={images.Intro} />
      </View>
    </>
  );
};

export default IntroView;
