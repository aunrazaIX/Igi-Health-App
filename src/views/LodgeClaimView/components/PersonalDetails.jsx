import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Select} from '../../../components';
import {vh} from '../../../assets/theme/dimension';

const PersonalDetails = ({
  patientOptions,
  selectedPatient,
  selectedType,
  onSelectPatient,
  personalDetails,
  type,
  dependants,
  onSelectType,
  hospitalList,
  onSelectHospital,
  selectedHospital,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Select
          value={selectedPatient?.label.trim('')}
          onSelectOption={value => onSelectPatient(value)}
          selectData={dependants}
          selectLabel={'Patient Name'}
          selectPlaceholder={'Select Patient From List'}
        />
        {type !== 'priorApproval' && (
          <Select
            value={selectedType?.label}
            onSelectOption={value => onSelectType(value)}
            selectData={patientOptions}
            selectLabel={'Nature of Claim'}
            selectPlaceholder={'Select Coverage Type'}
          />
        )}

        {type === 'priorApproval' && (
          <Select
            value={selectedHospital?.label}
            onSelectOption={value => onSelectHospital(value)}
            selectData={hospitalList}
            selectLabel={'Select Hospital'}
            selectPlaceholder={'Select Hospital From List'}
            isSearch={true}
          />
        )}
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
