import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Select} from '../../../components';
import {vh} from '../../../assets/theme/dimension';
import ModalLoading from '../../../components/ModalLoading';

const PersonalDetails = ({
  selectedPatient,
  onSelectPatient,
  dependantLoading,
  dependants,
  hospitalList,
  onSelectHospital,
  selectedHospital,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Select
          value={selectedPatient?.label}
          onSelectOption={value => onSelectPatient(value)}
          selectData={dependants}
          selectLabel={'Patient Name'}
          selectPlaceholder={'Select Patient From List'}
        />
        <Select
          value={selectedHospital?.label}
          onSelectOption={value => {
            onSelectHospital(value);
          }}
          selectData={hospitalList}
          selectLabel={'Select Hospital'}
          selectPlaceholder={'Select Hospital From List'}
          isSearch={true}
        />
        <ModalLoading loading={dependantLoading} />
      </View>
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
