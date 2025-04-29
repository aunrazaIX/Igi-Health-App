import React from 'react'
import PersonalView from '../../views/PersonalView'
import usePersonalViewModal from '../../viewmodels/usePersonalViewModel';
import usePersonalModalViewModel from '../../viewmodels/usePersonalModalViewModel';


const Personal = () => {
    const { states , functions } = usePersonalViewModal();
    const { genderRelationStates } = usePersonalModalViewModel();

    const { data } = states;
    const { gender, relation } = genderRelationStates;
    const {goBack} = functions


    return <PersonalView goBack={goBack} data={data} gender={gender} relation={relation} />
}

export default Personal