import HospitalsView from '../../views/HospitalsView';
import useHospitalsViewModel from '../../viewmodels/useHospitalsViewModel';

const Hospitals = () => {
  const {states, functions} = useHospitalsViewModel();
  const {
    onPressTab,
    onPressRightTab,
    onPressMapTab,
    goBack,
    setSearchText,
    handleMapDirection,
    setModalVisible,
    cleanCoordinate,
    openInGoogleMaps,
  } = functions;
  const {
    selectedTab,
    selectedTabRight,
    selectedMapTab,
    data,
    searchText,
    hospitalLoading,
    tabChanging,
    modalVisible,
    position,
  } = states;
  return (
    <>
      <HospitalsView
        selectedTabRight={selectedTabRight}
        selectedTab={selectedTab}
        selectedMapTab={selectedMapTab}
        onPressTab={onPressTab}
        onPressRightTab={onPressRightTab}
        onPressMapTab={onPressMapTab}
        goBack={goBack}
        data={data}
        searchText={searchText}
        setSearchText={setSearchText}
        hospitalLoading={hospitalLoading}
        tabChanging={tabChanging}
        handleMapDirection={handleMapDirection}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        position={position}
        cleanCoordinate={cleanCoordinate}
        openInGoogleMaps={openInGoogleMaps}
      />
    </>
  );
};

export default Hospitals;
