import PanelHospitalListView from '../../views/PanelHospitalListView';
import usePanelHospitalListViewModel from '../../viewmodels/usePanelHospitalListViewModel';

const PanelHospitalList = ({navigation}) => {
  const {states, functions} = usePanelHospitalListViewModel({navigation});

  const {onPressTab, onPressRightTab, goBack, setSearchText} = functions;

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
    />
  );
};

export default PanelHospitalList;
