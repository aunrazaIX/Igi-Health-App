import PanelHospitalListView from '../../views/PanelHospitalListView';
import usePanelHospitalListViewModel from '../../viewmodels/usePanelHospitalListViewModel';
import AlertModal from '../../components/AlertModal';
import { useState } from 'react';

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

  const { data, selectedTab, selectedTabRight, searchText, loading } = states;
  
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <>
      <AlertModal
        title="Notice"
        description={
          'IGI Life Insurance reserves the right to de-panel any listed discount center without prior notice. Additionally, services or discounts at a discount center may be temporarily halted due to unforeseen circumstances.\n\nIf you encounter any issues with a discount center, please contact IGI Life Insurance at 042-34503333 for assistance.'
        }
        modalVisible={modalVisible}
        setModalVisible={modalVisible => setModalVisible(modalVisible)}
      />
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
    </>
  );
};

export default PanelHospitalList;
