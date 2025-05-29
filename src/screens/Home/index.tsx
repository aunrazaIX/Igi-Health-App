import React from 'react';
import HomeView from '../../views/HomeView';
import useHomeViewModel from '../../viewmodels/useHomeViewModel';

const Home = () => {
  const {states, functions} = useHomeViewModel();
  const {cardData, backAnimatedStyle, frontAnimatedStyle, claimData, loading} =
    states;
  const {animateCard, toggleDrawer, onPressMenu, onPressHeaderIcon} = functions;

  return (
    <HomeView
      cardData={cardData}
      animateCard={animateCard}
      toggleDrawer={toggleDrawer}
      onPressMenu={onPressMenu}
      onPressHeaderIcon={onPressHeaderIcon}
      backAnimatedStyle={backAnimatedStyle}
      frontAnimatedStyle={frontAnimatedStyle}
      claimData={claimData}
      loading={loading}
    />
  );
};

export default Home;
