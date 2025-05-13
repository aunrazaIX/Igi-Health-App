import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Select} from '../../../components';
import {vh} from '../../../assets/theme/dimension';
import Box from './Box';
import {DependantList, PersonelDataSection} from '../typeInterface';

type PersonalDetailsProps = {
  patientOptions: DependantList[];
  personalData: PersonelDataSection[];
};

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  patientOptions,
  personalData,
}) => {
  return (
    <View style={styles.container}>
      <Select
        selectData={patientOptions}
        selectLabel={'Patient Information'}
        selectPlaceholder={'-- Select Patient From List --'}
      />
      {personalData?.map((data, index) => (
        <Box data={data} key={index} />
      ))}
    </View>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    rowGap: vh * 1.25,
  },
});
