import { useSelector } from 'react-redux';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import { personalDetail, UsePersonalModalTypes } from '../types/personalTypes';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import { RootState } from '../redux/store';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


const useAddDependentViewModal = (): UsePersonalModalTypes => {
  const { user } = useSelector((state: RootState) => state.auth);

  const navigation = useNavigation();

  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);

  const {
    setterForApiData: dependentSetterForApiData,
    apiData: dependentApiData,
    checkForError: dependentCheckForError,
  } = useErrorHandlingHook({
    dependentName: null,
    cnic: user?.cnic,
    clientCode: user?.ClientCode,
    dependentTypeID: null,
    dependentRequestTypesID: 1,
    dependentRequestID: 0,
    gender: null,
    Age: null,
    dependentRequestStatus: true,
    createdBy: 1,
  });

  const genderOptions: personalDetail[] = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  const { data: relationsOptions } = useApiHook({
    apiEndpoint: endpoints.dependent.getDependentType,
    method: 'get',
    transform: {
      label: 'DependentTypeName',
      value: 'DependentTypeID',
    },
  });

  const { trigger, loading: addDependentLoading } = useApiHook({
    apiEndpoint: endpoints.dependent.addDependentRequest,
    method: 'post',
    onSuccess: res => {
      setConfirmationModal(true),
        console.log("res", res)
    }
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


    navigation.navigate('Personal')

  }

  return {
    states: {
      genderOptions,
      relationsOptions,
      dependentApiData,
      addDependentLoading,
      confirmationModal
    },
    functions: {
      onPressSubmit,
      dependentSetterForApiData,
      setConfirmationModal,
      resetStates
    },
  };
};

export default useAddDependentViewModal;
