import {Image, View} from 'react-native';
import React from 'react';
import styles from './styles';
import AppIntroSlider from 'react-native-app-intro-slider';
import {AileronBold, AileronSemiBold} from '../../components';
const IntroView = ({handleNextButton, backgroundImages}) => {
  const renderItem = ({item, index}) => (
    <Image key={index} style={styles.backgroundImage} source={item?.images} />
  );

  const NextButton = () => (
    <View style={styles.buttonContainer}>
      <AileronSemiBold name={'Next'} style={styles.buttonText} />
    </View>
  );
  const BackButton = () => (
    <View style={styles.buttonContainer}>
      <AileronSemiBold name={'Back'} style={styles.buttonText} />
    </View>
  );
  const DoneButton = () => (
    <View style={styles.buttonContainer}>
      <AileronSemiBold name={'Done'} style={styles.buttonText} />
    </View>
  );

  return (
    <AppIntroSlider
      onDone={handleNextButton}
      renderItem={renderItem}
      showSkipButton={false}
      data={backgroundImages}
      showPrevButton={true}
      doneLabel={'Get Started'}
      renderNextButton={NextButton}
      renderPrevButton={BackButton}
      renderDoneButton={DoneButton}
    />
  );
};

export default IntroView;
