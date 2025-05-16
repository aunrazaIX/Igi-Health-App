import {icons} from '../assets';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import {useCallback} from 'react';
import {
  useFocusEffect,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';
import {pick, types} from '@react-native-documents/picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  setTreatments,
  setSelectedPatient,
  setStep,
  setSelectedDocuments,
  onDeleteTreatment,
} from '../redux/lodgeSlice';
import moment from 'moment';

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

const useLodgeClaimViewModel = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const {selectedDocuments, currentStep, treatments, selectedPatient} =
    useSelector(state => state.lodge);

  const {
    loading: uploadLoading,
    data: claimObject,
    error: uploadError,
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
    onSuccess: res => {
      let apiData = {
        UserRelationCode: selectedPatient?.CLNTNUM?.toString(),
        CLNTNUM: selectedPatient?.CLNTNUM?.toString(),
        ClaimsData: treatments?.map(item => ({
          ClaimSNO: '0',
          ClaimID: res?.Data?.toString(),
          userId: '776',
          ClaimAmount: item?.amount?.toString(),
          ClaimDescriptions: item?.description,
          UserRelationCode: selectedPatient?.CLNTNUM?.toString(),
          ClaimReceipt: item?.receiptNumber,
          ClaimsComments: item?.description,
          ClaimsSubTypeID: item?.treatment?.value,
          ClaimAddedDateTime: moment().format('YYYY-MM-DD'),
          UUID: '1231231232131',
          ClientCode: 'DEMO',
        })),
        ClaimsComments: 'asdasdasda',
        userId: '776',
        claimId: res?.Data?.toString(),
      };
      console.log('apiData', apiData);
      claimTrigger(apiData);
    },
  });

  const {
    loading: claimLoading,
    trigger: claimTrigger,
    error: addClaimError,
  } = useApiHook({
    method: 'post',
    apiEndpoint: endpoints.claimLogde.lodge,
    onSuccess: res => {
      console.log('ASDAS@#QEQW', res);
    },
  });

  console.log(addClaimError);
  const resetStates = () => {
    dispatch(setTreatments([]));
    dispatch(setStep(1));
    dispatch(setSelectedDocuments([]));
    dispatch(setSelectedPatient(null));
  };

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

  const claimsDetails: ClaimDetail[] = treatments?.map((item: Treatment) => ({
    sectionTitle: item?.treatment?.label,
    icon: icons.stethoscope,
    info: [
      {label: 'Receipt Number:', value: item?.receiptNumber ?? '--'},
      {label: 'Amount:', value: item?.amount ?? '--', total: true},
      {label: 'Description:', value: item?.description ?? '--'},
    ],
  }));

  const goBack = () => {
    resetStates();
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };
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
    dispatch(setStep(step));
  };
  const navigateTreatment = () => {
    navigation.navigate('AddTreatment');
  };
  const onPressDelete = (index: number) => dispatch(onDeleteTreatment(index));

  const onSelectPatient = (patient: any) => {
    dispatch(setSelectedPatient(patient));
  };
  const onPressNext = () => {
    try {
      if (currentStep === 1) {
        if (!selectedPatient) {
          throw new Error('Please Select Patient');
        }
      }
      if (currentStep < 3) {
        dispatch(setStep(currentStep + 1));
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
      dispatch(setSelectedDocuments(documents));
    } catch (e) {
      console.log('Error', e);
    }
  };

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
      uploadLoading,
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
