import {useCallback, useState} from 'react';
import {icons} from '../assets';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {get, post} from '../api';
import endpoints from '../api/endspoints';

const useLodgeClaimViewModel = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState(null);

  // const fetchContactDetails = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await get(
  //       endpoints.bank.getBankDetails,
  //       (params = {
  //         CNIC: 14102 - 5322315 - 7,
  //       }),
  //     );
  //     if (res) {
  //     }
  //   } catch (e) {
  //     console.log('Error', e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useFocusEffect(
  //   useCallback(() => {
  //     fetchContactDetails();
  //   }, []),
  // );

  // const sendAttachments = async () => {
  //   let apiData = {
  //     IFormFile: files,
  //   };
  //   const userId = '';
  //   const myuuid = '';
  //   const ClientCode = '';
  //   try {
  //     setLoading(true);
  //     const res = await post(
  //       endpoints.claimLogde.attachment(userId, myuuid, ClientCode),
  //       apiData,
  //     );
  //   } catch (e) {
  //     console.log('Error', e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const steps = [
    {
      label: 'Personal Details',
      key: 'personalDetails',
    },
    {label: 'Claim', key: 'claim'},
    {label: 'Upload Doc', key: 'uploadDoc'},
  ];
  const personalData = [
    {
      sectionTitle: 'Personal Details',
      icon: icons.personalDetail,
      edit: false,
      delete: false,
      info: [
        {label: 'Name of Employee:', value: 'Imran Naveed Qureshi'},
        {label: 'Bank Name:', value: 'Bank Al Habib'},
        {label: 'Account Number:', value: '1234-5678-9101112-3'},
        {label: 'Bank IBAN:', value: 'PK47 XYZ 1234 5678 9101112 3 0'},
      ],
    },
    {
      sectionTitle: 'Claims Details',
      icon: icons.claimDetails,
      edit: false,
      delete: false,
      info: [
        {label: 'Services:', value: 'General OPD, Dental, Optical'},
        {label: 'Eligible Users:', value: 'Self, Spouse, Children'},
        {label: 'Reimbursement:', value: '28827'},
        {label: 'Total OPD:', value: '---'},
      ],
    },
  ];

  const claimsDetails = [
    {
      sectionTitle: 'Treatment Description',
      icon: icons.stethoscope,
      edit: true,
      delete: true,
      info: [
        {label: 'Patient Information:', value: 'Saad Imran Qureshi'},
        {label: 'Receipt Number:', value: '89876543'},
        {label: 'Claim Status:', value: 'Description:'},
        {label: 'Amount:', value: '28827', total: true},
      ],
    },
    {
      sectionTitle: 'Treatment Description',
      icon: icons.stethoscope,
      edit: true,
      delete: true,
      info: [
        {label: 'Patient Information:', value: 'Saad Imran Qureshi'},
        {label: 'Receipt Number:', value: '89876543'},
        {label: 'Claim Status:', value: 'Description:'},
        {label: 'Amount:', value: '28827', total: true},
      ],
    },
    {
      sectionTitle: 'Treatment Description',
      icon: icons.stethoscope,
      edit: true,
      delete: true,
      info: [
        {label: 'Patient Information:', value: 'Saad Imran Qureshi'},
        {label: 'Receipt Number:', value: '89876543'},
        {label: 'Claim Status:', value: 'Description:'},
        {label: 'Amount:', value: '28827', total: true},
      ],
    },
  ];

  const patientOptions = [
    {
      name: 'Imran Naveed Qureshi',
      value: 'Imran',
    },
  ];

  const goBack = () => {
    navigation.goBack();
  };

  const navigateTreatment = () => {
    navigation.navigate('AddTreatment');
  };

  return {
    states: {
      steps,
      personalData,
      claimsDetails,
      patientOptions,
      loading,
    },
    functions: {goBack, navigateTreatment},
  };
};

export default useLodgeClaimViewModel;
