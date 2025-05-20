import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';
import {useDispatch, useSelector} from 'react-redux';
import {setTreatments, updateTreatments} from '../redux/lodgeSlice';
import {useEffect, useMemo, useState} from 'react';
import {RootState} from '../redux/store';

const useAddTreatmentModel = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const dispatch = useDispatch();

  const isError = useSelector((state: RootState) => state.lodge.isError);
  console.log(isError, ' myeror');

  const [confirmationModal, setConfirmationModal] = useState(false);

  const {treatmentIndex, treatmentData} = route?.params || {};
  const extractedData = {
    treatment: treatmentData?.treatment,
    receiptNumber: treatmentData?.info?.[0].value,
    amount: treatmentData?.info?.[1].value,
    description: treatmentData?.info?.[2].value,
  };

  console.log('treatmentIndex', treatmentIndex);

  const {setterForApiData, apiData} = useErrorHandlingHook({
    treatment: extractedData.treatment ?? {},
    receiptNumber: extractedData.receiptNumber ?? '',
    amount: extractedData.amount ?? '',
    description: extractedData.description ?? '',
  });

  const apiParams = useMemo(
    () => ({
      apiEndpoint: endpoints.treatments.getTypes,
      method: 'get',
      transform: {
        keyToLoop: 'Data',
        label: 'ClaimsSubTypeName',
        value: 'ClaimsSubTypeID',
      },
    }),
    [],
  );

  const {loading, data: opdTypes} = useApiHook(apiParams);

  const onPressAddTreatment = () => {
    const treatmentObj = {
      treatment: apiData?.treatment,
      receiptNumber: apiData?.receiptNumber,
      amount: apiData?.amount,
      description: apiData?.description,
    };
    if (typeof treatmentIndex === 'number') {
      dispatch(updateTreatments({index: treatmentIndex, data: apiData}));
    } else {
      dispatch(setTreatments([treatmentObj]));
    }
    navigation.navigate('LodgeClaimProcess');
  };

  const openConfimationModal = () => {
    setConfirmationModal(true);
  };

  return {
    states: {
      loading,
      opdTypes,
      apiData,
      treatmentIndex,
      isError,
      confirmationModal,
    },
    functions: {
      setterForApiData,
      onPressAddTreatment,
      setConfirmationModal,
      openConfimationModal,
    },
  };
};

export default useAddTreatmentModel;
