import { View, Text } from 'react-native'
import React from 'react'
import LodgeClaimView from '../../views/LodgeClaim'
import useLodgeClaimViewModel from '../../viewmodels/useLodgeClaimViewModel';

const LodgeClaim = () => {
    const {states,functions}= useLodgeClaimViewModel();
    const {steps} = states;
  return (
   <LodgeClaimView steps={steps}/>
  )
}

export default LodgeClaim