import {Image} from 'react-native';
import React from 'react';
import styles from './styles';
import AppIntroSlider from 'react-native-app-intro-slider';
const IntroView = ({handleNextButton, backgroundImages}) => {
  const renderItem = ({item, index}) => (
    <Image key={index} style={styles.backgroundImage} source={item?.images} />
  );
  return (
    <AppIntroSlider
      onDone={handleNextButton}
      renderItem={renderItem}
      showSkipButton={false}
      data={backgroundImages}
    />
  );
};

export default IntroView;
