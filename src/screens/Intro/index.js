import React from 'react';
import IntroView from '../../views/IntroView';
import useIntroViewModel from '../../viewmodels/useIntroViewModel';

const Intro = () => {
  const {functions, states} = useIntroViewModel();
  const {backgroundImages} = states;
  const {handleNextButton} = functions;
  return (
    <IntroView
      backgroundImages={backgroundImages}
      handleNextButton={handleNextButton}
    />
  );
};
export default Intro;
