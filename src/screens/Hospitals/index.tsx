import HospitalsView from '../../views/HospitalsView';
import useHospitalsViewModel from '../../viewmodels/useHospitalsViewModel';
import AlertModal from '../../components/AlertModal';
import {useState} from 'react';

const Hospitals = () => {
  const {states, functions} = useHospitalsViewModel();

  const [modalVisible, setModalVisible] = useState(true);
  const {
    onPressTab,
    onPressRightTab,
    onPressMapTab,
    goBack,
    setSearchText,
    handleMapDirection,
  } = functions;
  const {
    selectedTab,
    selectedTabRight,
    selectedMapTab,
    data,
    searchText,
    hospitalLoading,
    tabChanging,
    position,
  } = states;
  return (
    <>
      <AlertModal
        title="Notice"
        description={
          'IGI Life Insurance reserves the right to de-panel any listed network hospital without prior notice. Additionally, services at a network hospital may be temporarily halted due to unforeseen circumstances.\n\nIf you encounter any issues with a network hospital, please contact IGI Life Insurance at 042-34503333 for assistance.'
        }
        modalVisible={modalVisible}
        setModalVisible={modalVisible => setModalVisible(modalVisible)}
      />
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
        position={position}
      />
    </>
  );
};

export default Hospitals;
