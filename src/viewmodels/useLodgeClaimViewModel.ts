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
import {useDispatch, useSelector} from 'react-redux';
import {
  setSelectedPatient,
  setStep,
  setSelectedDocuments,
  onDeleteTreatment,
  onDeleteDocuments,
  _setTreatmentData,
  _updateTreatmentData,
  setRemarks,
  setSelectedHospital,
  setSelectedType,
  setSelectedMaternityType,
  setTreatments,
  setResetTreaments,
} from '../redux/lodgeSlice';
import moment from 'moment';
import {setErrorModal} from '../redux/generalSlice';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';

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
  const {type} = route?.params || {};

  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);

  const {
    selectedDocuments,
    currentStep,
    treatments,
    selectedPatient,
    selectedType,
    selectedHospital,
  } = useSelector(state => state.lodge);
  const {user} = useSelector(state => state.auth);

  const resetStates = () => {
    dispatch(_setTreatmentData([]));

    navigation.navigate('HomeStack');
    dispatch(setSelectedDocuments([]));
    dispatch(setSelectedPatient(null));
    setterForclaimData('claimComments', '');

    dispatch(setStep(1));
  };

  const {setterForApiData: setterForclaimData, apiData: claimData} =
    useErrorHandlingHook({
      claimComments: '',
    });

  const {
    loading: uploadLoading,
    data: claimObject,
    error: uploadError,
    trigger,
  } = useApiHook({
    method: 'post',
    isFormData: true,
    apiEndpoint: endpoints.claimLogde.attachment(
      user?.UserId,
      '1231231232131',
      user?.ClientCode,
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
        ClaimsComments: claimData.claimComments,
        userId: '776',
        claimId: res?.Data?.toString(),
      };

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
      setConfirmationModal(true);
    },
    onError: e => {
      dispatch(
        setErrorModal({
          show: true,
          message: e?.Title ?? 'Something went wrong',
        }),
      );
    },
  });

  const {data: personalDetails, loading: personalDetailsLoading} = useApiHook({
    apiEndpoint: endpoints.bank.getBankDetails,
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

  const {data: hospitalData, loading: hospitalLoading} = useApiHook({
    apiEndpoint: endpoints.panelHospital.getPanelHospitals,
    method: 'get',
    transform: {
      label: 'HospitalName',
      value: 'HospitalID',
    },
  });

  const dependantsData = [
    {label: 'Ipd', value: 0},
    {label: 'Opd', value: 1},
    {label: 'Maternity', value: 2},
  ];

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
  ];

  const claimsDetails: ClaimDetail[] = treatments?.map((item: Treatment) => ({
    sectionTitle: item?.treatment?.label,
    icon: icons.stethoscope,
    info: [
      {
        key: 'receiptNumber',
        label: 'Receipt Number:',
        value: item?.receiptNumber ?? '--',
      },
      {
        key: 'amount',
        label: 'Amount:',
        value: item?.amount ?? '--',
        total: true,
      },
      {
        key: 'description',
        label: 'Description:',
        value: item?.description ?? '--',
      },
    ],
    treatment: item?.treatment,
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
    navigation.navigate('AddTreatment', {claimType: type});
  };

  const onPressDelete = (index: number) => dispatch(onDeleteTreatment(index));
  const onPressEdit = (data: object, index: number) => {
    navigation.navigate('AddTreatment', {
      treatmentData: data,
      treatmentIndex: index,
      claimType: type,
    });
  };
  const onSelectPatient = (patient: any) => {
    dispatch(setSelectedPatient(patient));
  };
  const onSelectType = (patient: any) => {
    if (patient?.value !== selectedType?.value) {
      dispatch(setResetTreaments());
      dispatch(setSelectedType(patient));
    }
  };

  const onSelectMaternityType = (patient: any) => {
    dispatch(setSelectedMaternityType(patient));
  };

  const onSelectHospital = (hospital: any) => {
    dispatch(setSelectedHospital(hospital));
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

      if (currentStep === 3) {
        trigger();
      }
    } catch (e) {
      console.log('Error', e);
    }
  };

  const onSelectDocument = async () => {
    try {
      const res = await pick({
        allowMultiSelection: true,
        type: [types.docx, types.pdf, types.images],
      });

      let documents = [];

      res?.forEach((item: any) => {
        const isDuplicate = selectedDocuments.some(
          doc => doc?.name === item?.name,
        );

        if (!isDuplicate) {
          documents.push({
            uri: item?.uri,
            type: item?.type,
            name: item?.name,
          });
          dispatch(setSelectedDocuments(documents));
        } else {
          dispatch(
            setErrorModal({
              show: true,
              message: "same file can't be selected again",
            }),
          );
          return;
        }
      });
    } catch (e) {
      console.log('Error', e);
    }
  };

  const handleCancelFile = (item, index) => {
    dispatch(onDeleteDocuments(index));
  };

  return {
    states: {
      steps,
      personalData,
      claimsDetails,
      dependantLoading,
      currentStep,
      dependantsData,
      selectedPatient,
      selectedType,
      selectedDocuments,
      uploadLoading,
      confirmationModal,
      claimData,
      claimLoading,
      type,
      personalDetails,
      personalDetailsLoading,
      dependants,
      hospitalList: hospitalData,
      selectedHospital,
    },
    functions: {
      goBack,
      navigateTreatment,
      onPressNext,
      onPressDelete,
      onPressEdit,
      onPressStep,
      onSelectPatient,
      onSelectDocument,
      handleCancelFile,
      setConfirmationModal,
      resetStates,
      setterForclaimData,
      onSelectHospital,
      onSelectType,
      onSelectMaternityType,
    },
  };
};

export default useLodgeClaimViewModel;
