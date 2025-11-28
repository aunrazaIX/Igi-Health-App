import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {setErrorModal} from '../redux/generalSlice';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {formatName} from '../utils';
import moment from 'moment';

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

  const formatAgeToDate = raw => {
    if (!raw) return '';
    const digits = raw.replace(/[^0-9]/g, '').padStart(8, '0');
    const day = digits.slice(0, 2);
    const month = digits.slice(2, 4);
    const year = digits.slice(4, 8);
    return `${day}-${month}-${year}`;
  };

  const {
    setterForApiData: dependentSetterForApiData,
    apiData: dependentApiData,
    checkForError: dependentCheckForError,
  } = useErrorHandlingHook({
    dependentName: prefilledData.dependentName,
    cnic: user?.cnic,
    clientCode: user?.ClientCode,
    dependentTypeID: {
      label: prefilledData.relationship.label,
      value: prefilledData.relationship.value?.value,
    },
    dependentRequestTypesID: dependentIndex ? 2 : 1,
    dependentRequestID: '0',
    gender: {
      label: prefilledData.gender.label,
      Value: prefilledData.gender.value,
    },
    Age: prefilledData.age?.toString() ?? null,
    dependentRequestStatus: true,
    createdBy: user?.UserId,
  });

  const genderOptions = [
    {value: 'Male', label: 'Male'},
    {value: 'Female', label: 'Female'},
  ];

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
    } else if (isUpdate) {
      setConfirmationModal(true);
      setConfirmatonType('update');
    }
  };

  const handleCancel = () => navigation.navigate('Personal');
  const resetStates = () => navigation.navigate('Personal');

  return {
    states: {
      genderOptions,
      relationsOptions,
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
      formatAgeToDate,
      handleSubmitRequest,
    },
  };
};

export default useAddDependentViewModal;
