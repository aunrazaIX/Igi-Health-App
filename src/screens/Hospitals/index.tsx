import HospitalsView from '../../views/HospitalsView';
import useHospitalsViewModel from '../../viewmodels/useHospitalsViewModel';

const PanelHospitalList = () => {
  const {states, functions} = useHospitalsViewModel();

  const {onPressTab, onPressRightTab, onPressMapTab} = functions;
  const {selectedTab, selectedTabRight, selectedMapTab} = states;
  return (
    <HospitalsView
      selectedTabRight={selectedTabRight}
      selectedTab={selectedTab}
      selectedMapTab={selectedMapTab}
      onPressTab={onPressTab}
      onPressRightTab={onPressRightTab}
      onPressMapTab={onPressMapTab}
    />
  );
};

export default PanelHospitalList;
