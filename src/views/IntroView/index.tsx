import {Image, TouchableOpacity, View, FlatList, Text} from 'react-native';
import React, {useState} from 'react';
import {
  AileronBold,
  AileronRegular,
  AileronSemiBold,
  Button,
  CurvedView,
  TopView,
} from '../../components';
import {icons, images} from '../../assets';
import styles from './styles';

const IntroView = ({
  handleNextButton,
}: {
  handleNextButton: (route: string) => void;
}) => {
  return (
    <>
      <View>
        <Image style={styles.IntroImage} source={images.Intro} />

        <View style={styles.text}>
          <View style={styles.headingText}>
            <AileronBold
              style={styles.headingText}
              name={'A Healthier Future '}
            />
            <AileronBold style={styles.headingTextPink} name={'Starts Here!'} />
          </View>

          <View style={styles.dashLine} />

          <View style={styles.paraTextContainer}>
            <AileronRegular
              style={styles.paraText}
              name="Enjoy peace of mind with IGI Health Insurance. We offer tailored plans for individuals and families, ensuring you receive the best medical care"
            />
          </View>

          <TouchableOpacity style={styles.buttonContainer}>
            <Button
              onPress={() => {
                console.log('Touchable Pressed');
                handleNextButton('Login');
              }}
              showIconRight={icons.rightArrowNext}
              containerStyle={styles.button}
              name="Next"
              inputStyle={styles.buttonText}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default IntroView;
