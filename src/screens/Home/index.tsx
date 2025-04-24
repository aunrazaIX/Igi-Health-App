import { View, Text } from 'react-native';
import React from 'react';
import HomeView from '../../views/HomeView';
import useHomeViewModel from '../../viewmodels/useHomeViewModel';

const Home = () => {
  const {states, functions} = useHomeViewModel();
  const {cardData,  backAnimatedStyle,frontAnimatedStyle,} = states;
  const {onPressTab,animateCard,toggleDrawer} = functions;

  return <HomeView cardData={cardData} animateCard={animateCard} toggleDrawer={toggleDrawer}   backAnimatedStyle={backAnimatedStyle}
  frontAnimatedStyle={frontAnimatedStyle} />;
};

export default Home;
