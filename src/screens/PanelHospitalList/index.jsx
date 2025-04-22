import PanelHospitalListView from '../../views/PanelHospitalListView';
import usePanelHospitalListViewModel from '../../viewmodels/usePanelHospitalListViewModel';

const PanelHospitalList = () => {
  const {states, functions} = usePanelHospitalListViewModel();

  const {onPressTab, onPressRightTab} = functions;
  const {data, selectedTab, selectedTabRight} = states;
  return (
    <PanelHospitalListView
      selectedTabRight={selectedTabRight}
      selectedTab={selectedTab}
      onPressTab={onPressTab}
      onPressRightTab={onPressRightTab}
      data={data}
    />
  );
};

export default PanelHospitalList;
