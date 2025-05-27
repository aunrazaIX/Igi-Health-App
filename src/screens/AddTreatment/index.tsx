import React from 'react';
import AddTreatmentView from '../../views/AddTreatmentView';
import useAddTreatmentModel from '../../viewmodels/useAddTreatmentModel';

import {NavigationProp} from '@react-navigation/native';

const AddTreatment = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: any;
}) => {
  const {states, functions} = useAddTreatmentModel({navigation, route});
  const {treatmentTypes, apiData, treatmentIndex, isError, confirmationModal} =
    states;
  const {
    setterForApiData,
    onPressAddTreatment,
    openConfimationModal,
    setConfirmationModal,
  } = functions;
  return (
    <AddTreatmentView
      apiData={apiData}
      setterForApiData={setterForApiData}
      onPressAddTreatment={onPressAddTreatment}
      treatmentIndex={treatmentIndex}
      isError={isError}
      treatmentTypes={treatmentTypes}
      confirmationModal={confirmationModal}
      openConfimationModal={openConfimationModal}
      setConfirmationModal={setConfirmationModal}
    />
  );
};

export default AddTreatment;
