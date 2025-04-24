import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CurvedView, Stepper, TopView } from '../../components'
import Personal from '../../screens/Personal';
import { Claim, PersonalDetails, UploadDoc } from './components';

const LodgeClaimView = ({steps}) => {
  
  const renderStep = {
    personalDetails: <PersonalDetails />,
    claim: <Claim />,
    uploadDoc: <UploadDoc />,
  }
  return (
    <Stepper steps={steps} title={'Lodge A Claim'} componentList={renderStep} />
  
  )
}

export default LodgeClaimView

const styles = StyleSheet.create({})