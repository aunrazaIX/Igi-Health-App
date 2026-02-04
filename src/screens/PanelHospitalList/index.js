import PanelHospitalListView from '../../views/PanelHospitalListView';
import usePanelHospitalListViewModel from '../../viewmodels/usePanelHospitalListViewModel';

const PanelHospitalList = ({navigation}) => {
  const {states, functions} = usePanelHospitalListViewModel({navigation});
  const {
    onPressRightTab,
    goBack,
    setSearchText,
    openInGoogleMaps,
    cleanCoordinate,
    handleMapDirection,
    showModal,
  } = functions;

  const {data, selectedTabRight, searchText, loading, modalVisible, position} =
    states;

  return (
    <PanelHospitalListView
      selectedTabRight={selectedTabRight}
      onPressRightTab={onPressRightTab}
      data={data}
      goBack={goBack}
      searchText={searchText}
      setSearchText={setSearchText}
      loading={loading}
      handleMapDirection={handleMapDirection}
      modalVisible={modalVisible}
      showModal={showModal}
      position={position}
      cleanCoordinate={cleanCoordinate}
      openInGoogleMaps={openInGoogleMaps}
    />
  );
};

export default PanelHospitalList;
