import {useSelector} from 'react-redux';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import {personalDetail, UsePersonalModalTypes} from '../types/personalTypes';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {RootState} from '../redux/store';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const useAddDependentViewModal = ({route}): UsePersonalModalTypes => {
  let {user} = useSelector((state: RootState) => state.auth);

  console.log(user, 'userrrrr');

  const {dependentData, dependentIndex} = route?.params || {};

  const navigation = useNavigation();

  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);

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

    age: dependentData?.dependentDetail[3]?.value,
  };

  const {
    setterForApiData: dependentSetterForApiData,
    apiData: dependentApiData,
    checkForError: dependentCheckForError,
  } = useErrorHandlingHook({
    dependentName: prefilledData.dependentName ?? '',
    cnic: user?.cnic,
    clientCode: user?.ClientCode,
    dependentTypeID: {label: prefilledData.relationship.label},

    dependentRequestTypesID: dependentIndex ? 2 : 1,
    dependentRequestID: 0,
    gender: {label: prefilledData.gender.label},
    Age: prefilledData.age ?? null,
    dependentRequestStatus: true,
    createdBy: 1,
  });

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

  const {trigger, loading: addDependentLoading} = useApiHook({
    apiEndpoint: endpoints.dependent.addDependentRequest,
    method: 'post',
  });

  const onPressSubmit = () => {
    const filled = dependentCheckForError();
    if (!filled) return;
    let _apiData = {
      ...dependentApiData,
      dependentTypeID: dependentApiData?.dependentTypeID?.value,
      gender: dependentApiData?.gender?.value,
    };
    trigger(_apiData);
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
    },
    functions: {
      onPressSubmit,
      dependentSetterForApiData,
      setConfirmationModal,
      resetStates,
    },
  };
};

export default useAddDependentViewModal;
