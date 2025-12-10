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
    notificationCount,
    showDropDown,
    showDropdownButton,
    selectedPolicy,
  } = states;
  const {
    animateCard,
    toggleDrawer,
    onPressMenu,
    onPressHeaderIcon,
    handleAssociatedApps,
    handleCardDownload,
    handleDependantsModal,
    onPullToRefresh,
    setShowDropDown,
    onPressPolicy,
  } = functions;

  return (
    <HomeView
      cardData={cardData}
      animateCard={animateCard}
      toggleDrawer={toggleDrawer}
      onPressMenu={onPressMenu}
      onPressHeaderIcon={onPressHeaderIcon}
      handleDependantsModal={handleDependantsModal}
      onPullToRefresh={onPullToRefresh}
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
      notificationCount={notificationCount}
      maternityLoading={maternityLoading}
      showDropDown={showDropDown}
      showDropdownButton={showDropdownButton}
      setShowDropDown={setShowDropDown}
      selectedPolicy={selectedPolicy}
      onPressPolicy={onPressPolicy}
    />
  );
};

export default Home;
