import {icons} from '../assets';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import {useCallback, useState} from 'react';
import {
  useFocusEffect,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';
import {pick, types} from '@react-native-documents/picker';

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
  const {
    loading: uploadLoading,
    data: claimObject,
    trigger,
  } = useApiHook({
    method: 'post',
    isFormData: true,
    apiEndpoint: endpoints.claimLogde.attachment(
      '776',
      '1231231232131',
      'DEMO',
    ),
    argsOrBody: {
      files: selectedDocuments,
    },
  });
  const {treatments, stepFromTreatment} = route?.params || {};
  const [_treatments, setTreatments] = useState<Treatment[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
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

  const {data: dependants, loading: dependantLoading} = useApiHook({
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
  const onPressStep = (step: number) => {
    if (step === 1) {
      if (!selectedPatient) {
        return;
      }
    }
    if (step === 2) {
      if (!treatments?.length > 0) {
        return;
      }
    }
    if (step === 3) {
      if (!selectedDocuments?.length > 0) {
        return;
      }
    }
    setCurrentStep(step);
  };
  const navigateTreatment = () => {
    navigation.navigate('AddTreatment', {allTreatments: _treatments});
  };
  const onPressDelete = (index: number) => {
    const temp = [..._treatments];
    temp.splice(index, 1);
    setTreatments(temp);
  };
  const onSelectPatient = (patient: any) => setSelectedPatient(patient);
  const onPressNext = () => {
    try {
      if (currentStep === 1) {
        if (!selectedPatient) {
          throw new Error('Please Select Patient');
        }
      }
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      }
    } catch (e) {
      console.log('Error', e);
    }
  };

  const onSelectDocument = async () => {
    try {
      const res = await pick({
        allowMultiSelection: true,
        type: [types.docx, types.pdf],
      });
      let documents = [];
      res?.forEach((item: any) => {
        console.log(item);
        documents.push({
          uri: item?.uri,
          type: item?.type,
          name: item?.name,
        });
      });
      setSelectedDocuments(documents);
    } catch (e) {
      console.log('Error', e);
    }
  };

  console.log('claimObject', claimObject, uploadLoading);

  const onPressUpload = () => {
    trigger();
  };

  return {
    states: {
      steps,
      personalData,
      claimsDetails,
      dependantLoading,
      currentStep,
      dependants,
      selectedPatient,
      selectedDocuments,
    },
    functions: {
      goBack,
      navigateTreatment,
      onPressNext,
      onPressDelete,
      onPressStep,
      onSelectPatient,
      onSelectDocument,
      onPressUpload,
    },
  };
};

export default useLodgeClaimViewModel;
