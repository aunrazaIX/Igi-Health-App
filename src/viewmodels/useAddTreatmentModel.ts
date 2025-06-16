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

  const selectedType = useSelector(state => state.lodge.selectedType);

  const [confirmationModal, setConfirmationModal] = useState(false);

  const {treatmentIndex, treatmentData, claimType} = route?.params || {};

  const extractedData = {
    treatment: treatmentData?.treatment,
    receiptNumber: treatmentData?.info?.[0].value,
    amount: treatmentData?.info?.[1].value,
    description: treatmentData?.info?.[2].value,
  };

  const {setterForApiData, apiData} = useErrorHandlingHook({
    treatment: extractedData.treatment ?? {},
    receiptNumber: extractedData.receiptNumber ?? '',
    amount: extractedData.amount ?? '',
    description: extractedData.description ?? '',
  });

  const apiParams = useMemo(() => {
    const typeValue = selectedType?.value;

    const endpointKey =
      claimType === 'priorApproval'
        ? 'IPDTypesForPriorApproval'
        : typeValue === 2
        ? 'getIPDTypes'
        : typeValue === 1
        ? 'getTypes'
        : 'getMATTypes';

    return {
      apiEndpoint: endpoints.treatments[endpointKey],
      method: 'get',
      transform: {
        keyToLoop: claimType === 'priorApproval' ? null : 'Data',
        label:
          claimType === 'priorApproval' ? 'TreatmentName' : 'ClaimsSubTypeName',
        value: claimType === 'priorApproval' ? 'DXCCode' : 'ClaimsSubTypeID',
      },
    };
  }, [selectedType?.value]);

  const {loading, data: treatmentTypes, error} = useApiHook(apiParams);

  const onPressAddTreatment = () => {
    const treatmentObj = {
      treatment: apiData?.treatment,
      receiptNumber: apiData?.receiptNumber,
      amount: apiData?.amount,
      description: apiData?.description,
    };

    if (selectedType === 'Opd') {
    }
    if (typeof treatmentIndex === 'number') {
      dispatch(
        updateTreatments({
          index: treatmentIndex,
          data: apiData,
          navigateOnSuccess: () => {
            navigation.goBack();
          },
        }),
      );
    } else {
      dispatch(
        setTreatments({
          ...treatmentObj,
          navigateOnSuccess: () => {
            navigation.goBack();
          },
        }),
      );
    }
    // navigation.navigate('LodgeClaimProcess');
  };

  return {
    states: {
      loading,
      treatmentTypes,
      apiData,
      treatmentIndex,
      isError,
      confirmationModal,
    },
    functions: {
      setterForApiData,
      onPressAddTreatment,
      setConfirmationModal,
    },
  };
};

export default useAddTreatmentModel;
