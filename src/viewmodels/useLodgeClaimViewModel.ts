import {icons} from '../assets';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import {useCallback, useState} from 'react';
import {
  useFocusEffect,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';

interface Treatment {
  receiptNumber?: string;
  description?: string;
  amount?: string;
  treatment?: {label: string; value: string};
}

interface ClaimDetail {
  sectionTitle?: string;
  icon: string;
  info: {
    label: string;
    value: string;
    total?: boolean;
  }[];
}

interface Step {
  label: string;
  key: string;
}

interface PersonalInfoSection {
  sectionTitle: string;
  icon: string;
  edit: boolean;
  delete: boolean;
  info: {
    label: string;
    value: string;
  }[];
}

interface Props {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

const useLodgeClaimViewModel = ({navigation, route}: Props) => {
  const {treatments, stepFromTreatment} = route?.params || {};
  const [_treatments, setTreatments] = useState<Treatment[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);

  useFocusEffect(
    useCallback(() => {
      if (stepFromTreatment) {
        setCurrentStep(stepFromTreatment);
      }
      if (treatments) {
        setTreatments(treatments);
      }

      return () => {
        setCurrentStep(1);
        setTreatments([]);
        setSelectedPatient(null);
      };
    }, [treatments, stepFromTreatment]),
  );

  const {data: dependants, loading} = useApiHook({
    apiEndpoint: endpoints.dependants.getDependants,
    method: 'get',
    argsOrBody: {
      cnic: '14102-5322315-7',
      ClientCode: 'DEMO',
    },
    transform: {
      keyToLoop: 'Data',
      label: 'LGIVNAME',
      value: 'CLNTNUM',
    },
  });

  const steps: Step[] = [
    {label: 'Personal Details', key: 'personalDetails'},
    {label: 'Claim', key: 'claim'},
    {label: 'Upload Doc', key: 'uploadDoc'},
  ];

  const personalData: PersonalInfoSection[] = [
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

  const claimsDetails: ClaimDetail[] = _treatments?.map((item: Treatment) => ({
    sectionTitle: item?.treatment?.label,
    icon: icons.stethoscope,
    info: [
      {label: 'Receipt Number:', value: item?.receiptNumber ?? '--'},
      {label: 'Amount:', value: item?.amount ?? '--', total: true},
      {label: 'Description:', value: item?.description ?? '--'},
    ],
  }));

  const goBack = () => navigation.goBack();
  const onPressStep = (step: number) => setCurrentStep(step);
  const navigateTreatment = () => {
    navigation.navigate('AddTreatment', {allTreatments: _treatments});
  };
  const onPressDelete = (index: number) => {
    const temp = [..._treatments];
    temp.splice(index, 1);
    setTreatments(temp);
  };
  const onSelectPatient = (patient: any) => setSelectedPatient(patient);
  const onPressNext = () => setCurrentStep(currentStep + 1);

  return {
    states: {
      steps,
      personalData,
      claimsDetails,
      loading,
      currentStep,
      dependants,
      selectedPatient,
    },
    functions: {
      goBack,
      navigateTreatment,
      onPressNext,
      onPressDelete,
      onPressStep,
      onSelectPatient,
    },
  };
};

export default useLodgeClaimViewModel;
