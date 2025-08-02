import React from 'react';
import IntroView from '../../views/IntroView';
import useIntroViewModel from '../../viewmodels/useIntroViewModel';

const Intro = () => {
  const {functions} = useIntroViewModel();
  const {handleNextButton} = functions;
  return <IntroView handleNextButton={handleNextButton} />;
};
export default Intro;
