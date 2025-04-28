import { View, Text } from 'react-native'
import React from 'react'
import LodgeClaimView from '../../views/LodgeClaimView'
import useLodgeClaimViewModel from '../../viewmodels/useLodgeClaimViewModel';

const LodgeClaim = () => {
    const {states,functions}= useLodgeClaimViewModel();
    const {steps,personalData} = states;
  return (
   <LodgeClaimView steps={steps} personalData={personalData}/>
  )
}

export default LodgeClaim