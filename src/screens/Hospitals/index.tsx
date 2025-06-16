import HospitalsView from '../../views/HospitalsView';
import useHospitalsViewModel from '../../viewmodels/useHospitalsViewModel';

const Hospitals = () => {
  const {states, functions} = useHospitalsViewModel();

  const {onPressTab, onPressRightTab, onPressMapTab, goBack, setSearchText} =
    functions;
  const {
    selectedTab,
    selectedTabRight,
    selectedMapTab,
    data,
    searchText,
    hospitalLoading,
  } = states;
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
      searchText={searchText}
      setSearchText={setSearchText}
      hospitalLoading={hospitalLoading}
    />
  );
};

export default Hospitals;
