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
    showDependantModal,
    notificationCount,
    showDropDown,
    showDropdownButton,
    selectedPolicy,
    dependantLoading,
  } = states;
  const {
    animateCard,
    dependentsList,
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
      dependentsList={dependentsList}
      animateCard={animateCard}
      toggleDrawer={toggleDrawer}
      onPressMenu={onPressMenu}
      onPressHeaderIcon={onPressHeaderIcon}
      handleDependantsModal={handleDependantsModal}
      onPullToRefresh={onPullToRefresh}
      dependantLoading={dependantLoading}
      backAnimatedStyle={backAnimatedStyle}
      frontAnimatedStyle={frontAnimatedStyle}
      homeCardData={homeCardData}
      claimData={claimData}
      loading={loading}
      handleAssociatedApps={handleAssociatedApps}
      handleCardDownload={handleCardDownload}
      showDependantModal={showDependantModal}
      notificationCount={notificationCount}
      showDropDown={showDropDown}
      showDropdownButton={showDropdownButton}
      setShowDropDown={setShowDropDown}
      selectedPolicy={selectedPolicy}
      onPressPolicy={onPressPolicy}
    />
  );
};

export default Home;
