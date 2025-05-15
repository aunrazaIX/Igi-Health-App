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
  const {opdTypes, apiData} = states;
  const {setterForApiData, onPressAddTreatment} = functions;
  return (
    <AddTreatmentView
      apiData={apiData}
      setterForApiData={setterForApiData}
      onPressAddTreatment={onPressAddTreatment}
      opdTypes={opdTypes}
    />
  );
};

export default AddTreatment;
