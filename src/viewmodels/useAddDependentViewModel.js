import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {setErrorModal} from '../redux/generalSlice';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {formatName} from '../utils';
import moment from 'moment';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';

const useAddDependentViewModal = ({route}) => {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {dependentData, dependentIndex, isUpdate} = route?.params || {};
  const [confirmationType, setConfirmatonType] = useState('');
  const [confirmationModal, setConfirmationModal] = useState(false);

  const relationsOptions = [
    {label: 'Spouse', value: 1},
    {label: 'Child', value: 2},
    {label: 'Sibling', value: 3},
    {label: 'Parent', value: 4},
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
        setConfirmatonType('');
        setConfirmationModal(true);
      }
      setConfirmatonType('');
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
        setConfirmatonType('update');
      } else {
        const payload = apiPayload(dependentApiData);
        trigger(payload);
      }
    }
  };

  const handleCancel = () => navigation.navigate('Personal');
  const resetStates = () => navigation.navigate('Personal');

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
