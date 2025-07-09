import PanelHospitalListView from '../../views/PanelHospitalListView';
import usePanelHospitalListViewModel from '../../viewmodels/usePanelHospitalListViewModel';

const PanelHospitalList = ({navigation}) => {
  const {states, functions} = usePanelHospitalListViewModel({navigation});
  const {position} = states;
  const {
    onPressTab,
    onPressRightTab,
    goBack,
    setSearchText,
    handleMapDirection,
  } = functions;

  const {data, selectedTab, selectedTabRight, searchText, loading} = states;
  return (
    <PanelHospitalListView
      selectedTabRight={selectedTabRight}
      selectedTab={selectedTab}
      onPressTab={onPressTab}
      onPressRightTab={onPressRightTab}
      data={data}
      goBack={goBack}
      searchText={searchText}
      setSearchText={setSearchText}
      loading={loading}
      handleMapDirection={handleMapDirection}
      position={position}
    />
  );
};

export default PanelHospitalList;
