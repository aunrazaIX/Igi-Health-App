import PanelHospitalListView from '../../views/PanelHospitalListView';
import usePanelHospitalListViewModel from '../../viewmodels/usePanelHospitalListViewModel';

const PanelHospitalList = ({navigation}) => {
  const {states, functions} = usePanelHospitalListViewModel({navigation});

  const {onPressTab, onPressRightTab , goBack} = functions;
  console.log("goBack" , goBack)
  const {data, selectedTab, selectedTabRight} = states;
  return (
    <PanelHospitalListView
      selectedTabRight={selectedTabRight}
      selectedTab={selectedTab}
      onPressTab={onPressTab}
      onPressRightTab={onPressRightTab}
      data={data}
      goBack={goBack}
    />
  );
};

export default PanelHospitalList;
