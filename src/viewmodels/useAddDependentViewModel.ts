import {useDispatch, useSelector} from 'react-redux';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import {personalDetail, UsePersonalModalTypes} from '../types/personalTypes';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {RootState} from '../redux/store';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {setErrorModal} from '../redux/generalSlice';
import {DetailsContainer} from '../components';

const useAddDependentViewModal = ({route}): UsePersonalModalTypes => {
  let {user} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const {dependentData, dependentIndex, isUpdate} = route?.params || {};

  console.log(isUpdate, 'isu');

  const navigation = useNavigation();

  const [confirmationType, setConfirmatonType] = useState('');

  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);

  const formatAgeString = (rawDate: string | undefined): string | null => {
    if (!rawDate) return null;
    const digitsOnly = rawDate.replace(/\D/g, '');
    return digitsOnly;
  };

  const prefilledData = {
    dependentName: dependentData?.dependentDetail[0]?.value,
    gender: {
      label: dependentData?.dependentDetail[1]?.value,
      value: dependentData?.dependentDetail[1]?.value,
    },
    relationship: {
      label: dependentData?.dependentDetail[2]?.value,
      value: dependentData?.dependentDetail[2]?.value,
    },

    age: formatAgeString(dependentData?.dependentDetail[3]?.value),
  };

  console.log(prefilledData.age, 'ppppppppppppppppppppp');

  const formatAgeToDate = (raw: string): string => {
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
    dependentName: prefilledData.dependentName ?? null,
    cnic: user?.cnic,
    clientCode: user?.ClientCode,
    dependentTypeID: {label: prefilledData.relationship.label},
    dependentRequestTypesID: dependentIndex ? 2 : 1,
    dependentRequestID: 0,
    gender: {
      label: prefilledData.gender.label,
      Value: prefilledData.gender.value,
    },

    Age: prefilledData?.age?.toString() ?? null,
    dependentRequestStatus: true,
    createdBy: 1,
  });

  console.log(dependentApiData, 'dataaaaaa usman');

  const genderOptions: personalDetail[] = [
    {value: 'Male', label: 'Male'},
    {value: 'Female', label: 'Female'},
  ];

  const {data: relationsOptions} = useApiHook({
    apiEndpoint: endpoints.dependent.getDependentType,
    method: 'get',
    transform: {
      label: 'DependentTypeName',
      value: 'DependentTypeID',
    },
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
      console.log(error, 'Error');
    },
  });

  const handleSubmitRequest = () => {
    // const filled = dependentCheckForError();
    // if (!filled) return;

    let _apiData = {
      ...dependentApiData,
      dependentTypeID: dependentApiData?.dependentTypeID?.value,
      gender: dependentApiData?.gender?.label,
    };

    if (
      !dependentApiData?.dependentName ||
      !dependentApiData?.gender?.label ||
      !dependentApiData?.dependentTypeID?.value ||
      !dependentApiData?.Age
    ) {
      dispatch(
        setErrorModal({
          Show: true,
          message: `"Please fill all require feilds"`,
          detail:
            'An error has occurred, please fill all require feilds. If the problem persists, contact IGI Life',
        }),
      );
    } else {
      console.log('triggering updating');
      trigger(_apiData);
      // setConfirmatonType('update');
    }
  };
  const onPressSubmit = () => {
    const filled = dependentCheckForError();

    // if (!filled) return;

    let _apiData = {
      ...dependentApiData,
      dependentTypeID: dependentApiData?.dependentTypeID?.value,
      gender: dependentApiData?.gender?.label,
    };

    if (
      !dependentApiData?.dependentName ||
      !dependentApiData?.gender?.label ||
      !dependentApiData?.dependentTypeID?.value ||
      !dependentApiData?.Age
    ) {
      dispatch(
        setErrorModal({
          Show: true,
          message: `"Please fill all require feilds"`,
          detail:
            'An error has occurred, please fill all require feilds. If the problem persists, contact IGI Life',
        }),
      );
    } else {
      if (isUpdate) {
        // trigger(_apiData);
        setConfirmationModal(true);
        setConfirmatonType('update');
      } else {
        console.log('triggering updating');
        trigger(_apiData);
        // setConfirmationModal(true);
        // setConfirmatonType('update');
      }
    }
  };

  const handleCancel = () => {
    navigation.navigate('Personal');
  };

  const resetStates = () => {
    navigation.navigate('Personal');
  };

  return {
    states: {
      genderOptions,
      relationsOptions,
      dependentApiData,
      addDependentLoading,
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
