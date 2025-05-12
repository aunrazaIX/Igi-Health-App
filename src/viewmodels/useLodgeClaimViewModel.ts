import {icons} from '../assets';
import {useNavigation} from '@react-navigation/native';
import endpoints from '../api/endspoints';
import {pick} from '@react-native-documents/picker';
import useApiHook from '../hooks/useApiHook';

const useLodgeClaimViewModel = () => {
  const navigation = useNavigation();
  const {data: dependants, loading} = useApiHook({
    apiEndpoint: endpoints.dependants.getDependants,
    method: 'get',
    argsOrBody: {
      cnic: '14102-5322315-7',
      ClientCode: 'DEMO',
    },
  });

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

  const pickFile = async () => {
    try {
      const [pickResult, type] = await pick();
      // const [pickResult] = await pick({mode:'import'}) // equivalent
      // do something with the picked file
    } catch (err: unknown) {
      // see error handling
    }
  };

  return {
    states: {
      steps,
      personalData,
      claimsDetails,
      patientOptions,
      loading,
      dependants,
    },
    functions: {goBack, navigateTreatment, pickFile},
  };
};

export default useLodgeClaimViewModel;
