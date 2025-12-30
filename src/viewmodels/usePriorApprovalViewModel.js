import {icons} from '../assets';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {pick, types} from '@react-native-documents/picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  setSelectedPatient,
  setStep,
  setSelectedDocuments,
  onDeleteTreatment,
  onDeleteDocuments,
  setSelectedHospital,
  setSelectedType,
  setResetTreaments,
  _setTreatmentData,
} from '../redux/lodgeSlice';
import moment from 'moment';
import {setErrorModal} from '../redux/generalSlice';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {launchCamera} from 'react-native-image-picker';
import {InteractionManager} from 'react-native';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';

const usePriorApprovalViewModel = ({navigation, route}) => {
  const {type} = route?.params || {};
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmationType, setConfirmationType] = useState('');
  const [deletedIndex, setDeletedIndex] = useState(null);
  const [isView, setIsView] = useState(null);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [dependants, setDependants] = useState([]);
  const [hospitalList, setHospitalList] = useState([]);
  const [viewIndex, setViewIndex] = useState();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const {
    selectedDocuments,
    currentStep,
    treatments,
    selectedPatient,
    selectedType,
    selectedHospital,
  } = useSelector(
    state => state?.lodge?.modules?.[state?.lodge?.activeModule] || {},
  );
  const {user} = useSelector(state => state.auth);
  const {selectedPolicy} = useSelector(state => state.general);

  const {loading: dependantLoading} = useApiHook({
    apiEndpoint: endpoints.dependent.getDependents,
    method: 'get',
    argsOrBody: {
      PolicyNumber: selectedPolicy,
    },
    onSuccess: res => {
      if (res?.data) {
        const updatedDependants = res?.data?.map(dependent => ({
          label: dependent.memberName.trim(),
        }));
        const loggedInUserItem = {
          label: user?.memberName || user?.userName,
        };
        setDependants([loggedInUserItem, ...updatedDependants]);
      }
    },
  });

  const {trigger} = useApiHook({
    apiEndpoint: endpoints.discountedCenters.getDiscountedCenters(2),
    method: 'post',
    argsOrBody: {
      isAllRecord: true,
    },
    onSuccess: res => {
      const updatedHospitals = res?.data?.dataList?.map(i => ({
        label: i.name,
        value: i.id,
      }));
      setHospitalList(updatedHospitals);
    },
  });

  useFocusEffect(
    useCallback(() => {
      trigger();
    }, []),
  );
  // dispatch(setUserEmail(user?.UserEmail));

  const {setterForApiData: setterForclaimData, apiData: claimData} =
    useErrorHandlingHook({
      claimComments: '',
    });

  const resetStates = () => {
    dispatch(_setTreatmentData([]));
    dispatch(setSelectedDocuments([]));
    dispatch(setSelectedHospital(null));
    dispatch(setSelectedPatient(null));
    dispatch(setSelectedType(null));
    setterForclaimData('claimComments', '');
    dispatch(setStep(1));
  };

  const steps = [
    {
      label: 'Patient & Hospital',
      key: 'personalDetails',
    },
    {
      label: 'Treatment Information',
      key: 'claim',
    },
    {label: 'Upload Document', key: 'uploadDoc'},
  ];

  const claimsDetails = (treatments ?? []).map(item => ({
    sectionTitle: item?.treatment?.label,
    icon: icons.stethoscope,
    info: [
      {
        key: 'receiptNumber',
        label: 'Admission/M.R. No.',
        value: item?.receiptNumber ?? '--',
      },
      {
        key: 'admission_date',
        label: 'Admission/Procedure Date:',
        value: item?.admissionDate ?? '--',
      },
      {
        key: 'amount',
        label: 'Estimated Cost (PKR):',
        value: item?.amount || '--',
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

  const goBack = () => navigation.goBack();

  const onPressStep = step => {
    if (step === 1 && !selectedPatient) return;
    if (step === 2 && !(treatments?.length > 0)) return;
    if (step === 3 && !(selectedDocuments?.length > 0)) return;

    dispatch(setStep(step));
  };

  const navigateTreatment = () => {
    navigation.navigate('AddTreatment', {claimType: type});
  };

  const onPressDelete = index => {
    setConfirmationType('delete');
    setDeletedIndex({type: 'delete', index});
    setConfirmationModal(true);
  };
  const handleDeleteClaim = index => dispatch(onDeleteTreatment(index));
  const handleDeleteFile = index => dispatch(onDeleteDocuments(index));
  const handleCancelFile = index => {
    setConfirmationType('delete');
    setConfirmationModal(true);
    setDeletedIndex({type: 'file', index});
  };
  const handleConfirmDelete = () => {
    if (!deletedIndex) return;

    if (deletedIndex.type === 'delete') {
      handleDeleteClaim(deletedIndex.index);
    } else {
      handleDeleteFile(deletedIndex.index);
    }

    setConfirmationModal(false);
    setDeletedIndex(null);
  };

  const handleConfirm = () => {
    if (confirmationType === 'delete') {
      handleConfirmDelete();
    } else if (confirmationType === 'back') {
      goBack();
    } else if (confirmationType === 'submit') {
      onPressSubmitClaim();
    }
  };

  const onPressEdit = (data, index) => {
    navigation.navigate('AddTreatment', {
      treatmentData: data,
      treatmentIndex: index,
      claimType: type,
    });
  };
  const onSelectPatient = item => dispatch(setSelectedPatient(item));

  const onSelectType = item => {
    dispatch(setResetTreaments());
    dispatch(setSelectedType(item));
  };
  const onSelectHospital = item => dispatch(setSelectedHospital(item));

  const onPressNext = () => {
    if (currentStep === 1) {
      if (type === 'priorApproval') {
        if (!selectedPatient || !selectedHospital) {
          dispatch(
            setErrorModal({
              show: true,
              message: 'Please select all fields',
            }),
          );
          return;
        }
      } else {
        if (!selectedPatient || !selectedType) {
          dispatch(
            setErrorModal({
              show: true,
              message: 'Please select all fields',
            }),
          );
          return;
        }
      }
    }
    if (currentStep < 3) {
      dispatch(setStep(currentStep + 1));
    } else if (currentStep === 3) {
      setConfirmationType('submit');
      setConfirmationModal(true);
    }
  };
  const handleBackButton = () => dispatch(setStep(currentStep - 1));

  const handleGOBack = () => {
    setConfirmationType('back');
    setConfirmationModal(true);
  };

  const {trigger: uploadAttach} = useApiHook({
    method: 'post',
    isFormData: true,
    apiEndpoint: endpoints.UploadAttachment.UploadAttachment,
    argsOrBody: {
      files: selectedDocuments,
    },
    onSuccess: res => {
      const attachments = res?.data?.map(fileName => ({
        fileName,
      }));
      setUploadedFiles(prev => [...prev, ...attachments]);
    },
    onError: e => {
      dispatch(setSelectedDocuments([]));
      dispatch(
        setErrorModal({
          show: true,
          message: e?.message,
        }),
      );
    },
  });
  const uploadDocument = e => {
    setShowOptionModal(false);
    InteractionManager.runAfterInteractions(() => {
      if (e === 'file') onSelectDocument();
      else openCamera();
    });
  };
  const servicesPayload = treatments.map(item => ({
    serviceId: item?.treatment?.value,
    serviceName: item?.treatment?.label,
    description: item?.description,
    estimatedCost: Number(item?.amount),
    procedureDate: moment(item?.admissionDate, 'DD-MMM-YYYY').toISOString(),
  }));

  const {
    loading: uploadLoading,
    error: uploadError,
    trigger: triggerSubmit,
  } = useApiHook({
    method: 'post',
    apiEndpoint: endpoints.priorApproval.addPriorApproval,
    argsOrBody: {
      patientName: selectedPatient?.label,
      remarks: claimData?.claimComments,
      cnic: user?.cnic,
      policyNumber: selectedPolicy,
      hospitalId: selectedHospital?.value,
      services: servicesPayload,
      attachements: uploadedFiles,
    },
    onSuccess: res => {
      setConfirmationModal(true);
      setConfirmationType('success');
      resetStates();
    },
    onError: err => {
      dispatch(
        setErrorModal({
          show: true,
          message: err?.message,
        }),
      );
    },
  });
  const onPressSubmitClaim = () => {
    setConfirmationModal(false);
    triggerSubmit();
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
      let tempFileSize = 0;
      res?.forEach(item => {
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
            }),
          );
          return;
        }

        if (!isDuplicate) {
          documents.push({
            uri: item?.uri,
            type: item?.type,
            name: item?.name,
            fileSizeInMB,
          });
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
      });
      dispatch(setSelectedDocuments(documents));
    } catch (e) {
      console.log('Error', e);
    }
  };
  useEffect(() => {
    if (selectedDocuments?.length > 0) {
      setUploadedFiles([]);
      uploadAttach();
    }
  }, [selectedDocuments]);

  const openCamera = async () => {
    try {
      let options = {
        quality: 1,
        cameraType: 'back',
        selectionLimit: 1,
      };
      let result = await launchCamera(options);
      let res = result?.assets?.[0];

      let file = {
        uri: res?.uri,
        type: res?.type,
        name: `${Math.floor(1000000000 + Math.random() * 9000000000)}.${
          res?.type?.split('/')[1]
        }`,
        fileSizeInMB: res?.fileSize / (1000 * 1000),
      };

      if (file.fileSizeInMB > 25 - totalFileSize) {
        dispatch(
          setErrorModal({
            show: true,
            message: 'Upload Limit Exceeded',
          }),
        );
        return;
      }
      dispatch(setSelectedDocuments([file]));
    } catch (e) {
      console.log('Error from opending camera or image picker', e);
    }
  };

  const viewOptionModal = boolean => {
    setShowOptionModal(boolean);
  };

  const onView = index => {
    setViewIndex(index);
    setIsView(true);
  };

  return {
    states: {
      steps,
      claimsDetails,
      currentStep,
      selectedPatient,
      selectedType,
      selectedDocuments,
      confirmationModal,
      claimData,
      type,
      dependants,
      dependantLoading,
      hospitalList,
      confirmationType,
      isView,
      viewIndex,
      showOptionModal,
      selectedHospital,
      uploadLoading,
    },
    functions: {
      handleConfirm,
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
      setConfirmationType,
      handleBackButton,
      handleGOBack,
      onView,
      setIsView,
      uploadDocument,
      viewOptionModal,
      setShowOptionModal,
    },
  };
};

export default usePriorApprovalViewModel;
