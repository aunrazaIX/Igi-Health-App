import React from 'react';
import PersonalView from '../../views/PersonalView';
import usePersonalViewModal from '../../viewmodels/usePersonalViewModel';

const Personal = () => {
  const {states, functions} = usePersonalViewModal();

  const {data, modalVisible, confimationModalVisible, expandedIndex} = states;

  const {
    goBack,
    handleSubmit,
    manageUpdate,
    setModalVisible,
    deleteDepenedent,
    setConfimationModalVisible,
    toggleExpand,
    openAddDependent,
  } = functions;

  return (
    <>
      {console.log(data, 'dataaaa')}
      <PersonalView
        openAddDependent={openAddDependent}
        goBack={goBack}
        data={data}
        handleSubmit={handleSubmit}
        manageUpdate={manageUpdate}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        deleteDepenedent={deleteDepenedent}
        confimationModalVisible={confimationModalVisible}
        setConfimationModalVisible={setConfimationModalVisible}
        toggleExpand={toggleExpand}
        expandedIndex={expandedIndex}
      />
    </>
  );
};

export default Personal;
