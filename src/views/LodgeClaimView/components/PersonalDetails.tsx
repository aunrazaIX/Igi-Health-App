import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Select} from '../../../components';
import {vh} from '../../../assets/theme/dimension';
import Box from './Box';
import {PersonelDataSection} from '../typeInterface';
import {icons} from '../../../assets';

type PersonalDetailsProps = {
  patientOptions: any[];
  personalData: PersonelDataSection[];
  type: string;
  personalDetails: any;
  dependants: any;
  onSelectType: any;
  hospitalList: any;
  onSelectHospital: () => void;
  selectedHospital: any;
};

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
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
  let data = [
    {
      sectionTitle: 'Personal Details',
      icon: icons.personalDetail,
      edit: false,
      delete: false,
      info: [
        {
          label: 'Name of Employee:',
          value: personalDetails?.Data?.lgivname.trim() ?? '--',
        },
        {
          label: 'Bank Name:',
          value:
            personalDetails?.Data?.Bankname?.trim() == ''
              ? '--'
              : personalDetails?.Data?.Bankname?.trim(),
        },
        {
          label: 'Account Number:',
          value: personalDetails?.Data?.accountNumber ?? '--',
        },
        {
          label: 'Bank IBAN:',
          value:
            personalDetails?.Data?.IBAN?.trim() == ''
              ? '--'
              : personalDetails?.Data?.IBAN?.trim(),
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <Select
        value={selectedPatient?.label}
        onSelectOption={value => onSelectPatient(value)}
        selectData={dependants}
        selectLabel={'Patient Information'}
        selectPlaceholder={'-- Select Patient From List --'}
      />
      {type !== 'priorApproval' && (
        <Select
          value={selectedType?.label}
          onSelectOption={value => onSelectType(value)}
          selectData={patientOptions}
          selectLabel={'Coverage Type'}
          selectPlaceholder={'-- Select Covergae Type  --'}
        />
      )}

      {type === 'priorApproval' && (
        <Select
          value={selectedHospital?.label}
          onSelectOption={value => onSelectHospital(value)}
          selectData={hospitalList}
          selectLabel={'Select Hospital'}
          selectPlaceholder={'-- Select Hospital From List --'}
        />
      )}

      {data?.map((data, index) => (
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
