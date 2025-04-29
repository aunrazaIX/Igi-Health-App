import React from 'react';
import BenefitsView from '../../views/BenefitsView';
import useBenefitsViewModel from '../../viewmodels/useBenefitsViewModel';

const Benefits = ({navigation}) => {
  const {states, functions} = useBenefitsViewModel();

  const {data} = states;
  const {goBack} = functions;

  return <BenefitsView data={data} goBack={goBack} />;
};

export default Benefits;
