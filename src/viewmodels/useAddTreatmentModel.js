import {useDispatch, useSelector} from 'react-redux';
import {setTreatments, updateTreatments} from '../redux/lodgeSlice';
import {useEffect, useMemo, useState} from 'react';
import useErrorHandlingHook from '../hooks/useErrorHandlingHook';

const useAddTreatmentModel = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {isError, selectedType} = useSelector(
    state => state?.lodge?.modules[state.lodge.activeModule],
  );
  const [confirmationModal, setConfirmationModal] = useState(false);
  const {treatmentIndex, treatmentData, claimType} = route?.params || {};

  const extractedData = {
    treatment: treatmentData?.treatment || 'Consultation',
    receiptNumber: treatmentData?.info?.[0]?.value || '12345',
    admissionDate: treatmentData?.info?.[1]?.value || '01-01-2023',
    amount: treatmentData?.info?.[2]?.value || '5000',
    description: treatmentData?.info?.[3]?.value || 'Routine checkup',
  };

  const {setterForApiData, apiData} = useErrorHandlingHook({
    treatment: extractedData.treatment,
    receiptNumber: extractedData.receiptNumber,
    admissionDate: extractedData.admissionDate,
    amount: extractedData.amount,
    description: extractedData.description,
  });

  const treatmentTypes = useMemo(() => {
    if (claimType === 'priorApproval') {
      return [
        {label: 'Surgery', value: 'SURG001'},
        {label: 'Hospitalization', value: 'HOSP001'},
      ];
    }
    if (selectedType?.label === 'IPD - Hospitalization') {
      return [
        {label: 'General Ward', value: 1},
        {label: 'Private Room', value: 2},
      ];
    }
    if (selectedType?.label === 'OPD - Outpatient') {
      return [
        {label: 'Consultation', value: 101},
        {label: 'Physiotherapy', value: 102},
      ];
    }
    return [
      {label: 'Antenatal Care', value: 201},
      {label: 'Delivery', value: 202},
    ];
  }, [selectedType?.label, claimType]);

  const loading = false;
  const error = null;
  const onPressAddTreatment = () => {
    const treatmentObj = {
      treatment: apiData?.treatment,
      receiptNumber: apiData?.receiptNumber,
      admissionDate: apiData?.admissionDate,
      claimType: claimType,
      amount: apiData?.amount,
      description: apiData?.description,
    };

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
  };

  return {
    states: {
      loading,
      treatmentTypes,
      apiData,
      treatmentIndex,
      isError,
      confirmationModal,
      claimType,
      error,
    },
    functions: {
      setterForApiData,
      onPressAddTreatment,
      setConfirmationModal,
    },
  };
};

export default useAddTreatmentModel;
