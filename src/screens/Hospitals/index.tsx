import HospitalsView from '../../views/HospitalsView';
import useHospitalsViewModel from '../../viewmodels/useHospitalsViewModel';

const Hospitals = () => {
  const {states, functions} = useHospitalsViewModel();

  const {onPressTab, onPressRightTab, onPressMapTab, goBack} = functions;
  const {selectedTab, selectedTabRight, selectedMapTab, data} = states;
  return (
    <HospitalsView
      selectedTabRight={selectedTabRight}
      selectedTab={selectedTab}
      selectedMapTab={selectedMapTab}
      onPressTab={onPressTab}
      onPressRightTab={onPressRightTab}
      onPressMapTab={onPressMapTab}
      goBack={goBack}
      data={data}
    />
  );
};

export default Hospitals;
