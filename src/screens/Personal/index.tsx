import React from 'react'
import PersonalView from '../../views/PersonalView'
import usePersonalViewModal from '../../viewmodels/usePersonalViewModel';
import usePersonalModalViewModel from '../../viewmodels/usePersonalModalViewModel';


const Personal = () => {
    const { states, functions } = usePersonalViewModal();
    const { genderRelationStates } = usePersonalModalViewModel();

    const { data, modalVisible, confimationModalVisible, expandedIndex } = states;
    const { gender, relation } = genderRelationStates;
    const { goBack, handleSubmit, manageUpdate, setModalVisible, deleteDepenedent, setConfimationModalVisible, toggleExpand } = functions


    return <PersonalView
        goBack={goBack}
        data={data}
        gender={gender}
        relation={relation}
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
}

export default Personal