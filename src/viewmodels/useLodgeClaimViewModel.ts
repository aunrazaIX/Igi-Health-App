import {icons} from '../assets';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
  setActiveModule,
} from '../redux/lodgeSlice';
import moment from 'moment';
import {setErrorModal} from '../redux/generalSlice';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {formatName} from '../utils';
import {InteractionManager} from 'react-native';

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
  const [dependants, setDependants] = useState<[]>([]);
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const [confirmationType, setConfirmationType] = useState<string>('');
  const [deletedIndex, setDeletedIndex] = useState<any>(null);
  const [deletedFileIndex, setDeletedFileIndex] = useState(null);
  const [isView, setIsView] = useState(null);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [viewIndex, setViewIndex] = useState();

  const [pickerLoading, setPickerLoading] = useState(false);
  const {
    selectedDocuments,
    currentStep,
    treatments,
    selectedPatient,
    selectedType,
    selectedHospital,
    userPassword,
  } = useSelector(
    state => state?.lodge?.modules?.[state?.lodge?.activeModule] || {},
  );

  const {user} = useSelector(state => state.auth);

  useFocusEffect(
    useCallback(() => {
      dispatch(setActiveModule(type));
    }, []),
  );

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
              claim_submit_type: 'MB',
              requestAddedDateTime: new Date().toISOString(),
            }))
          : {
              UserRelationCode: selectedPatient?.CLNTNUM?.toString(),
              CLNTNUM: selectedPatient?.CLNTNUM?.toString(),
              claim_submit_type: 'MB',
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
      resetStates();
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
    });

  const dependantsData = (covergaeTypesData ?? [])
    .filter((item: CoverageType) => item.isAllowed)
    .map((item: CoverageType) => ({
      label: item.CoverageType,
      value: item.CoverageId,
    }));

  const {data: _dependents, loading: dependantLoading} = useApiHook({
    apiEndpoint: endpoints.dependants.getDependants,
    method: 'get',
    argsOrBody: {
      cnic: user?.cnic,
      ClientCode: user?.ClientCode,
    },
    onSuccess: data => {
      setDependants(
        data?.Data.map((item: any) => ({
          ...item,
          label: formatName(item?.LGIVNAME),
          value: item?.CLNTNUM,
        })),
      );
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

  const {data: hospitalData, loading: hospitalLoading} = useApiHook({
    apiEndpoint: endpoints.panelHospital.getPanelHospitals,
    method: 'get',
    transform: {
      label: 'HospitalName',
      value: 'HospitalID',
    },
  });

  const steps: Step[] = [
    {
      label:
        type === 'priorApproval' ? 'Patient & Hospital' : 'Personal Details',
      key: 'personalDetails',
    },
    {
      label: type === 'priorApproval' ? 'Treatment Information' : 'Claim',
      key: 'claim',
    },
    {label: 'Upload Document', key: 'uploadDoc'},
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
    setConfirmationModal(false);
    trigger();
  };

  const totalFileSize = useMemo(() => {
    if (!selectedDocuments || selectedDocuments.length === 0) return 0;

    return selectedDocuments.reduce((total, item) => {
      return total + (item?.fileSizeInMB || 0);
    }, 0);
  }, [selectedDocuments]);

  const onSelectDocument = async () => {
    try {
      const res = await pick({
        allowMultiSelection: true,
        type: [types.docx, types.pdf, types.images],
      });
      let documents = [];
      let upload = false;
      let tempFileSize = 0;
      res?.forEach((item: any) => {
        const isDuplicate = selectedDocuments?.some(
          doc => doc?.name === item?.name,
        );
        const fileSizeInMB = item?.size / (1000 * 1000);
        tempFileSize += fileSizeInMB;

        if (
          fileSizeInMB > 25 ||
          fileSizeInMB > 25 - totalFileSize ||
          tempFileSize > 25
        ) {
          dispatch(
            setErrorModal({
              show: true,
              message: 'Upload Limit Exceeded',
              detail:
                'The total size of your selected file(s) must not exceed 25MB.Please adjust your selection',
            }),
          );
          upload = false;
          return;
        } else {
          if (!isDuplicate) {
            documents.push({
              uri: item?.uri,
              type: item?.type,
              name: item?.name,
              fileSizeInMB: fileSizeInMB,
            });
            upload = true;
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
      if (upload) {
        console.log(upload);
        dispatch(setSelectedDocuments(documents));
      }
    } catch (e) {
      console.log('Error', e);
    }
  };

  const openCamera = async () => {
    try {
      let options = {
        quality: 1,
        cameraType: 'back',
        selectionLimit: 1,
      };
      let result = await launchCamera(options);
      let res = result?.assets[0];
      let _img = {
        uri: res?.uri,
        type: res?.type,
        name: `${Math.floor(1000000000 + Math.random() * 9000000000)}.${
          res?.type?.split('/')[1]
        }`,
        fileSizeInMB: res?.fileSize / (1000 * 1000),
      };
      if (_img.fileSizeInMB > 25 - totalFileSize) {
      }
      dispatch(setSelectedDocuments([_img]));
    } catch (e) {
      console.log('Error from opending camera or image picker', e);
    }
  };

  const handleCancelFile = (item, index) => {
    setConfirmationType('fileDelete');
    setConfirmationModal(true);
    setDeletedFileIndex(index);

    // dispatch(onDeleteDocuments(index));
  };

  const onView = (index: string) => {
    setViewIndex(index);
    setIsView(true);
  };

  const viewOptionModal = boolean => {
    setShowOptionModal(boolean);
  };

  const handleDeleteFile = deletedFileIndex => {
    dispatch(onDeleteDocuments(deletedFileIndex));
  };
  const uploadDocument = e => {
    setShowOptionModal(false);
    InteractionManager.runAfterInteractions(() => {
      if (e === 'file') {
        onSelectDocument();
      } else {
        openCamera();
      }
    });
  };

  return {
    states: {
      steps,
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
      showOptionModal,
    },
    functions: {
      goBack,
      navigateTreatment,
      onPressNext,
      onPressDelete,
      onPressEdit,
      onPressStep,
      onSelectPatient,
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
      viewOptionModal,
      uploadDocument,
    },
  };
};

export default useLodgeClaimViewModel;
