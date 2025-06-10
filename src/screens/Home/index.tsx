import React from 'react';
import HomeView from '../../views/HomeView';
import useHomeViewModel from '../../viewmodels/useHomeViewModel';

const Home = () => {
  const {states, functions} = useHomeViewModel();
  const {
    cardData,
    backAnimatedStyle,
    frontAnimatedStyle,
    claimData,
    loading,
    homeCardData,
    homeCardDataLoading,
  } = states;
  const {
    animateCard,
    toggleDrawer,
    onPressMenu,
    onPressHeaderIcon,
    handleAssociatedApps,
  } = functions;

  return (
    <HomeView
      cardData={cardData}
      animateCard={animateCard}
      toggleDrawer={toggleDrawer}
      onPressMenu={onPressMenu}
      onPressHeaderIcon={onPressHeaderIcon}
      backAnimatedStyle={backAnimatedStyle}
      frontAnimatedStyle={frontAnimatedStyle}
      homeCardData={homeCardData}
      claimData={claimData}
      loading={loading}
      homeCardDataLoading={homeCardDataLoading}
      handleAssociatedApps={handleAssociatedApps}
    />
  );
};

export default Home;
