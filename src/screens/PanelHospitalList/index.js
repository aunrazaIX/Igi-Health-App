import PanelHospitalListView from '../../views/PanelHospitalListView';
import usePanelHospitalListViewModel from '../../viewmodels/usePanelHospitalListViewModel';

const PanelHospitalList = ({navigation}) => {
  const {states, functions} = usePanelHospitalListViewModel({navigation});
  const {
    onPressRightTab,
    goBack,
    setSearchText,
    handleMapDirection,
    showModal,
  } = functions;

  const {
    data,
    selectedTabRight,
    searchText,
    loading,
    modalVisible,
  } = states;

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
    />
  );
};

export default PanelHospitalList;
