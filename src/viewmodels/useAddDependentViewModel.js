import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {setErrorModal} from '../redux/generalSlice';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {formatName} from '../utils';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';

const useAddDependentViewModal = ({route}) => {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {dependentData, dependentIndex, isUpdate} = route?.params || {};
  const [confirmationType, setConfirmatonType] = useState('');
  const [confirmationModal, setConfirmationModal] = useState(false);
  const {selectedPolicy} = useSelector(state => state.general);

  const relationsOptions = [
    {label: 'Husband', value: 1},
    {label: 'Wife', value: 2},
    {label: 'Sister', value: 3},
    {label: 'Brother', value: 4},
    {label: 'Son', value: 5},
    {label: 'Daughter', value: 6},
    {label: 'Father', value: 7},
    {label: 'Mother', value: 8},
  ];

  const genderOptions = [
    {value: 'Male', label: 'Male'},
    {value: 'Female', label: 'Female'},
  ];

  const prefilledData = dependentData
    ? {
        dependentName: formatName(dependentData?.dependentDetail[0]?.value),
        gender: {
          label: dependentData?.dependentDetail[1]?.value,
          value: dependentData?.dependentDetail[1]?.value,
        },
        relationship: {
          label: dependentData?.dependentDetail[2]?.value,
          value: relationsOptions.find(
            r => r.label === dependentData?.dependentDetail[2]?.value,
          ),
        },
        age: dependentData?.dependentDetail[3]?.value,
      }
    : {
        dependentName: '',
        gender: {label: '', value: ''},
        relationship: {label: '', value: null},
        age: '',
      };

  const {
    setterForApiData: dependentSetterForApiData,
    apiData: dependentApiData,
    checkForError: dependentCheckForError,
  } = useErrorHandlingHook({
    name: prefilledData?.dependentName,
    cnic: user?.cnic,
    relation: prefilledData?.relationship,
    gender: prefilledData?.gender,
    dob: prefilledData?.age,
    dependentReqType: isUpdate ? 2 : 1,
  });
  const {
    trigger,
    loading: addDependentLoading,
    error,
  } = useApiHook({
    apiEndpoint: endpoints.dependent.addDependentRequest,
    method: 'post',
    onSuccess: res => {
      if (!isUpdate) {
        setConfirmatonType('success');
        setConfirmationModal(true);
      }
    },
    onError: error => {
      setConfirmatonType('');
      setConfirmationModal(false);
      dispatch(
        setErrorModal({
          Show: true,
          message: 'Something Went Wrong',
          detail:
            'An error has occurred, please fill all require fields. If the problem persists, contact IGI Life',
        }),
      );
    },
  });
  const apiPayload = apiData => ({
    cnicNumber: apiData?.cnic,
    name: apiData?.name,
    relation: apiData?.relation?.label,
    gender: apiData?.gender?.value,
    dob: apiData?.dob,
    dependentReqType: apiData?.dependentReqType,
    policyNumber: selectedPolicy,
    ...(isUpdate && {clientNumber: dependentData?.clntnum}),
  });
  const handleSubmitRequest = () => {
    const filled = dependentCheckForError();
    if (!filled) {
      dispatch(
        setErrorModal({
          Show: true,
          message: 'Please fill all required fields',
          detail:
            'An error has occurred, please fill all required fields. If the problem persists, contact IGI Life',
        }),
      );
    } else {
      const payload = apiPayload(dependentApiData);
      trigger(payload);
    }
  };

  const onPressSubmit = () => {
    const filled = dependentCheckForError();
    if (!filled) {
      dispatch(
        setErrorModal({
          Show: true,
          message: 'Please fill all required fields',
          detail:
            'An error has occurred, please fill all required fields. If the problem persists, contact IGI Life',
        }),
      );
    } else {
      if (isUpdate) {
        setConfirmationModal(true);
        setConfirmatonType('success');
      }
      const payload = apiPayload(dependentApiData);
      trigger(payload);
    }
  };

  const handleCancel = () => navigation.navigate('Personal');
  const resetStates = () => {
    setConfirmationModal(false);
    navigation.goBack();
  }

  return {
    states: {
      genderOptions,
      relationsOptions,
      addDependentLoading,
      dependentApiData,
      confirmationModal,
      dependentData,
      dependentIndex,
      confirmationType,
      isUpdate,
    },
    functions: {
      onPressSubmit,
      dependentSetterForApiData,
      setConfirmationModal,
      resetStates,
      handleCancel,
      handleSubmitRequest,
    },
  };
};

export default useAddDependentViewModal;
