import {icons} from '../assets';
import {useCallback, useMemo, useState} from 'react';
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
  setSelectedMaternityType,
  setResetTreaments,
  setUserEmail,
  setActiveModule,
} from '../redux/lodgeSlice';
import moment from 'moment';
import {setErrorModal} from '../redux/generalSlice';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {launchCamera} from 'react-native-image-picker';
import {InteractionManager} from 'react-native';

const mockDependants = [
  {label: 'John Doe', value: '101', CLNTNUM: '101'},
  {label: 'Jane Doe', value: '102', CLNTNUM: '102'},
];

const mockHospitals = [
  {label: 'City Hospital', value: '1'},
  {label: 'National Medical Center', value: '2'},
];

const mockPersonalDetails = [
  {LGIVNAME: 'John Doe', CLNTNUM: '101'},
  {LGIVNAME: 'Jane Doe', CLNTNUM: '102'},
];

const mockCoverageTypes = [
  {label: 'Self', value: 'self'},
  {label: 'Family', value: 'family'},
];

const useLodgeClaimViewModel = ({navigation, route}) => {
  const {type} = route?.params || {};
  const randomId = Math.random().toString().substr(2, 6);
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [confirmationType, setConfirmationType] = useState('');
  const [deletedIndex, setDeletedIndex] = useState(null);
  const [deletedFileIndex, setDeletedFileIndex] = useState(null);
  const [isView, setIsView] = useState(null);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [dependants, setDependants] = useState(mockDependants);
  const [viewIndex, setViewIndex] = useState();

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

  useFocusEffect(
    useCallback(() => {
      dispatch(setActiveModule(type));
    }, []),
  );
  dispatch(setUserEmail(user?.UserEmail));

  const {setterForApiData: setterForclaimData, apiData: claimData} =
    useErrorHandlingHook({
      claimComments: '',
    });

  const resetStates = () => {
    dispatch(setSelectedDocuments([]));
    dispatch(setSelectedHospital(null));
    dispatch(setSelectedPatient(null));
    dispatch(setSelectedType(null));
    setterForclaimData('claimComments', '');
    dispatch(setStep(1));
  };

  const steps = [
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

  const claimsDetails = (treatments ?? []).map(item => ({
    sectionTitle: item?.treatment?.label,
    icon: icons.stethoscope,
    info: [
      {
        key: 'receiptNumber',
        label: type === 'lodgeClaim' ? 'Receipt Number:' : 'Admission/M.R. No.',
        value: item?.receiptNumber ?? '--',
      },
      {
        key: 'admission_date',
        label:
          type === 'lodgeClaim' ? 'Reciept Date:' : 'Admission/Procedure Date:',
        value: item?.admissionDate ?? '--',
      },
      {
        key: 'amount',
        label:
          type === 'lodgeClaim' ? 'Amount (PKR):' : 'Estimated Cost (PKR):',
        value: item?.amount ? item?.amount : '--',
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
    setDeletedIndex(index);
    setConfirmationModal(true);
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

  const onSelectMaternityType = item =>
    dispatch(setSelectedMaternityType(item));

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

  const onPressSubmitClaim = () => {
    setConfirmationModal(false);
    setTimeout(() => {
      setConfirmationModal(true);
      setConfirmationType('submitted');
      resetStates();
    }, 800);
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
        }
      });

      dispatch(setSelectedDocuments(documents));
    } catch (e) {
      console.log('Error selecting file:', e);
    }
  };

  const openCamera = async () => {
    try {
      let result = await launchCamera({quality: 1});
      let res = result?.assets?.[0];

      let file = {
        uri: res?.uri,
        type: res?.type,
        name: `${Date.now()}.${res?.type?.split('/')[1]}`,
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
      console.log('Camera error:', e);
    }
  };

  const handleCancelFile = (item, index) => {
    setConfirmationType('fileDelete');
    setConfirmationModal(true);
    setDeletedFileIndex(index);
  };

  const handleDeleteFile = index => dispatch(onDeleteDocuments(index));

  const viewOptionModal = boolean => {
    setShowOptionModal(boolean);
  };

  const onView = index => {
    setViewIndex(index);
    setIsView(true);
  };

  const uploadDocument = e => {
    setShowOptionModal(false);
    InteractionManager.runAfterInteractions(() => {
      if (e === 'file') onSelectDocument();
      else openCamera();
    });
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
      personalDetails: mockPersonalDetails,
      dependants,
      hospitalList: mockHospitals,
      confirmationType,
      deletedIndex,
      deletedFileIndex,
      isView,
      viewIndex,
      showOptionModal,
      dependantsData: mockCoverageTypes,
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
      setConfirmationType,
      onPressSubmitClaim,
      handleDeleteFile,
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

export default useLodgeClaimViewModel;
