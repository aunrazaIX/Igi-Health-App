import PanelHospitalListView from '../../views/PanelHospitalListView';
import usePanelHospitalListViewModel from '../../viewmodels/usePanelHospitalListViewModel';
import AlertModal from '../../components/AlertModal';
import {useState} from 'react';

const PanelHospitalList = ({navigation}) => {
  const {states, functions} = usePanelHospitalListViewModel({navigation});
  const {position} = states;
  const {
    onPressTab,
    onPressRightTab,
    goBack,
    setSearchText,
    handleMapDirection,
    showModal,
  } = functions;

  const {
    data,
    selectedTab,
    selectedTabRight,
    searchText,
    loading,
    modalVisible,
  } = states;

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
      modalVisible={modalVisible}
      showModal={showModal}
    />
  );
};

export default PanelHospitalList;
