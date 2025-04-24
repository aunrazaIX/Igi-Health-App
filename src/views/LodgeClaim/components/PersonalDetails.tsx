import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Select } from '../../../components'

const PersonalDetails = ({selectData}) => {
  return (
    <Select selectData={selectData} selectLabel={'Patient Information'} selectPlaceholder={'-- Select Patient From List --'} />
  )
}

export default PersonalDetails

const styles = StyleSheet.create({})