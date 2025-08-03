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
    showDependantModal,
    maternityLoading,
    maternityData,
  } = states;
  const {
    animateCard,
    toggleDrawer,
    onPressMenu,
    onPressHeaderIcon,
    handleAssociatedApps,
    handleCardDownload,
    handleDependantsModal,
  } = functions;

  return (
    <HomeView
      cardData={cardData}
      animateCard={animateCard}
      toggleDrawer={toggleDrawer}
      onPressMenu={onPressMenu}
      onPressHeaderIcon={onPressHeaderIcon}
      handleDependantsModal={handleDependantsModal}
      backAnimatedStyle={backAnimatedStyle}
      frontAnimatedStyle={frontAnimatedStyle}
      homeCardData={homeCardData}
      claimData={claimData}
      loading={loading}
      homeCardDataLoading={homeCardDataLoading}
      handleAssociatedApps={handleAssociatedApps}
      handleCardDownload={handleCardDownload}
      showDependantModal={showDependantModal}
      maternityData={maternityData}
      maternityLoading={maternityLoading}
    />
  );
};

export default Home;
