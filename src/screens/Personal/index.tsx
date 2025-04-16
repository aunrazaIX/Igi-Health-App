import React from 'react'
import PersonalView from '../../views/PersonalView'
import usePersonalViewModal from '../../viewmodels/usePersonalViewModel';
import usePersonalModalViewModel from '../../viewmodels/usePersonalModalViewModel';


const Personal = () => {
    const { states } = usePersonalViewModal();
    const { genderRelationStates } = usePersonalModalViewModel();

    const { data } = states;
    const { gender, relation } = genderRelationStates;


    return <PersonalView data={data} gender={gender} relation={relation} />
}

export default Personal