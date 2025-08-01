import {icons} from '../assets';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import {useCallback, useEffect, useRef, useState} from 'react';
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
  setUserEmail,
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
  const randomId = Math.random().toString().substr(2, 6);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const [confirmationType, setConfirmationType] = useState<string>('');
  const [deletedIndex, setDeletedIndex] = useState<any>(null);
  const [deletedFileIndex, setDeletedFileIndex] = useState(null);
  const [isView, setIsView] = useState(null);
  const [viewIndex, setViewIndex] = useState();

  const {
    selectedDocuments,
    currentStep,
    treatments,
    selectedPatient,
    selectedType,
    selectedHospital,
    userPassword,
  } = useSelector(state => state.lodge);

  console.log(userPassword, 'userPPP');
  const {user} = useSelector(state => state.auth);

  console.log(user, 'useerr');

  console.log(selectedType, 'selectedType');

  const resetStates = () => {
    dispatch(_setTreatmentData([]));
    // navigation.navigate('HomeStack');
    dispatch(setSelectedDocuments([]));
    dispatch(setSelectedPatient(null));
    dispatch(setSelectedType(null));
    setterForclaimData('claimComments', '');
    dispatch(setStep(1));
  };

  dispatch(setUserEmail(user?.UserEmail));

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
    apiEndpoint: endpoints[
      type === 'priorAprroval' ? 'priorApproval' : 'claimLogde'
    ]?.attachment(user?.UserId, randomId, user?.ClientCode),
    argsOrBody: {
      files: selectedDocuments,
    },
    onSuccess: res => {
      let apiData =
        type === 'priorApproval'
          ? treatments?.map(item => ({
              requestSNO: 0,
              userId: user?.UserId,
              requestID: res?.Data,
              userRelationCode: selectedPatient?.CLNTNUM?.toString(),
              requestComments: item?.description,
              amount: item.amount,
              hospitalID: selectedHospital.value,
              treatmentTypeID: item?.treatment?.IPDTreatmentTypesID,
              dxcCode: item?.treatment?.value,
              uuid: randomId,
              clientCode: user?.ClientCode,
              requestAddedDateTime: new Date().toISOString(),
            }))
          : {
              UserRelationCode: selectedPatient?.CLNTNUM?.toString(),
              CLNTNUM: selectedPatient?.CLNTNUM?.toString(),
              ClaimsData: treatments?.map(item => ({
                ClaimSNO: '0',
                ClaimID: res?.Data?.toString(),
                userId: user?.UserId,
                ClaimAmount: item?.amount?.toString(),
                ClaimDescriptions: item?.description,
                UserRelationCode: selectedPatient?.CLNTNUM?.toString(),
                ClaimReceipt: item?.receiptNumber,
                ClaimsComments: item?.description,
                ClaimsSubTypeID: item?.treatment?.value,
                ClaimAddedDateTime: moment().format('YYYY-MM-DD'),
                UUID: randomId,
                ClientCode: user?.ClientCode,
              })),
              ClaimsComments: claimData.claimComments,
              userId: user?.UserId,
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
    apiEndpoint:
      type === 'priorApproval'
        ? endpoints.priorApproval.addPriorApproval
        : endpoints.claimLogde.lodge,
    onSuccess: res => {
      setConfirmationModal(true);
      setConfirmationType('');
    },
    onError: e => {
      console.log(e, 'error');
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
      cnic: user?.cnic,
      ClientCode: user?.ClientCode,
    },
    transform: {
      keyToLoop: 'Data',
      label: 'LGIVNAME',
      value: 'CLNTNUM',
    },
  });

  const {data: covergaeTypesData, loading: covergaeTypesDataLoading} =
    useApiHook({
      apiEndpoint: endpoints.coverage.getCoverage,
      method: 'get',
      argsOrBody: {
        ClientCode: user?.ClientCode,
        // ClientCode: 'PTC',
      },
      onSuccess: res => {
        console.log(res, 'coverage ka response');
      },
    });

  const dependantsData =
    covergaeTypesData?.map((item: any) => ({
      label: item?.CoverageType,
      value: item?.CoverageId,
    })) ?? [];

  const {data: dependants, loading: dependantLoading} = useApiHook({
    apiEndpoint: endpoints.dependants.getDependants,
    method: 'get',
    argsOrBody: {
      cnic: user?.cnic,
      ClientCode: user?.ClientCode,
    },
    transform: {
      keyToLoop: 'Data',
      label: 'LGIVNAME',
      value: 'CLNTNUM',
    },
    onUnmount: () => {
      const state = navigation.getState();
      const routes = state.routes;
      const currentRoute = routes[routes.length - 1];
      if (currentRoute?.name !== 'AddTreatment') {
        // resetStates();
      }
    },
  });

  console.log(dependants, 'dependants dataaa');
  const {data: hospitalData, loading: hospitalLoading} = useApiHook({
    apiEndpoint: endpoints.panelHospital.getPanelHospitals,
    method: 'get',
    transform: {
      label: 'HospitalName',
      value: 'HospitalID',
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
    // resetStates();
    navigation.goBack();
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

  const handleDeleteClaim = (index: number) =>
    dispatch(onDeleteTreatment(index));

  const onPressDelete = (index: number) => {
    setConfirmationType('delete');
    setDeletedIndex(index);
    setConfirmationModal(true);
  };

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
        setConfirmationType('submit');
        setConfirmationModal(true);
      }
    } catch (e) {
      console.log('Error', e);
    }
  };

  const handleBackButton = () => {
    dispatch(setStep(currentStep - 1));
  };

  const handleGOBack = () => {
    setConfirmationType('back');
    setConfirmationModal(true);
  };

  const onPressSubmitClaim = () => {
    trigger();
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

        const fileSizeInMB = item?.size / (1024 * 1024);

        if (fileSizeInMB > 25) {
          console.log(
            `File "${item?.name}" exceeds 25MB (${fileSizeInMB.toFixed(
              2,
            )} MB). Skipped.`,
          );
          dispatch(
            setErrorModal({
              show: true,
              message: 'File size should not exceed 25MB',
            }),
          );

          return;
        } else {
          if (!isDuplicate) {
            documents.push({
              uri: item?.uri,
              type: item?.type,
              name: item?.name,
              fileSizeInMB: fileSizeInMB,
            });
            dispatch(setSelectedDocuments(documents));
          } else {
            dispatch(
              setErrorModal({
                show: true,
                message: "same file can't be selected again",
                detail: "same file can't be selected multiples times",
              }),
            );
            return;
          }
        }
      });
    } catch (e) {
      console.log('Error', e);
    }
  };

  const handleCancelFile = (item, index) => {
    setConfirmationType('fileDelete');
    setConfirmationModal(true);
    setDeletedFileIndex(index);

    // dispatch(onDeleteDocuments(index));
  };

  const onView = (index: string) => {
    console.log(index, 'SAdadasd');

    setViewIndex(index);
    setIsView(true);
  };

  const handleDeleteFile = deletedFileIndex => {
    dispatch(onDeleteDocuments(deletedFileIndex));
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
      confirmationType,
      deletedIndex,
      deletedFileIndex,
      isView,
      viewIndex,
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
      handleDeleteClaim,
      setConfirmationType,
      onPressSubmitClaim,
      handleDeleteFile,
      handleBackButton,
      handleGOBack,
      onView,
      setIsView,
    },
  };
};

export default useLodgeClaimViewModel;
