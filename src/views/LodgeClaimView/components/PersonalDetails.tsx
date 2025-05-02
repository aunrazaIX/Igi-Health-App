import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  AileronBold,
  AileronSemiBold,
  DependentBox,
  Select,
} from '../../../components';
import {vh, vw} from '../../../assets/theme/dimension';
import {COLORS} from '../../../assets/theme/colors';
import Box from './Box';

type PersonalDetailsProps = {
  selectData: any[];
  personalData: [];
};

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  selectData,
  personalData,
}) => {
  return (
    <View style={styles.container}>
      <Select
        selectData={selectData}
        selectLabel={'Patient Information'}
        selectPlaceholder={'-- Select Patient From List --'}
      />
      {personalData?.map((data,index) => (
        <Box data={data} key={index}/>
      ))}
    </View>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    rowGap:vh*1.25
  },
});
