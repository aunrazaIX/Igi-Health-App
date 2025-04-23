import {View, Text} from 'react-native';
import React from 'react';
import HomeView from '../../views/HomeView';
import useHomeViewModel from '../../viewmodels/useHomeViewModel';

const Home = () => {
  const {states, functions} = useHomeViewModel();
  const {cardData, frontCard} = states;
  const {onPressTab, onPressCard} = functions;

  return (
    <HomeView
      cardData={cardData}
      onPressCard={onPressCard}
      frontCard={frontCard}
    />
  );
};

export default Home;
