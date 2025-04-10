import { View, Text } from 'react-native'
import React from 'react'
import PersonalView from '../../views/PersonalView'
import usePersonalViewModall from '../../viewmodels/useBenefitsViewModel';

const Personal = () => {
    const { states } = usePersonalViewModall();

    const { data } = states;
    return <PersonalView data={data} />
}

export default Personal