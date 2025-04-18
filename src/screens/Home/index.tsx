import {View, Text} from 'react-native';
import React from 'react';
import HomeView from '../../views/HomeView';
import useHomeViewModel from '../../viewmodels/useHomeViewModel';

const Home = () => {
  const {states, functions} = useHomeViewModel();
  const {cardData} = states;
  const {onPressTab} = functions;

  return <HomeView cardData={cardData} />;
};

export default Home;
