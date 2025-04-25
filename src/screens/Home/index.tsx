import {View, Text} from 'react-native';
import React from 'react';
import HomeView from '../../views/HomeView';
import useHomeViewModel from '../../viewmodels/useHomeViewModel';

type HomeViewProps = {
  navigation: any;
};

const Home: React.FC<HomeViewProps> = ({navigation}) => {
  const {states, functions} = useHomeViewModel();
  const {cardData} = states;
  const {onPressTab, openDrawer, onPressMenu} = functions;

  return (
    <HomeView
      cardData={cardData}
      openDrawer={openDrawer}
      onPressMenu={onPressMenu}
    />
  );
};

export default Home;
