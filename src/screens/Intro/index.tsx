import React from 'react';
import NotificationView from '../../views/NotificationView';
import useNotificationViewModel from '../../viewmodels/useNotificationViewModel';
import IntroView from '../../views/IntroView';
import useIntroViewModel from '../../viewmodels/useIntroViewModel';

const Intro = () => {
  const {functions} = useIntroViewModel();
  const {handleNextButton} = functions;
  return <IntroView handleNextButton={handleNextButton} />;
};
export default Intro;
