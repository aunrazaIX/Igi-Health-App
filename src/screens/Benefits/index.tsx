import React from 'react';
import BenefitsView from '../../views/BenefitsView';
import useBenefitsViewModel from '../../viewmodels/useBenefitsViewModel';

const Benefits = () => {
  const {states} = useBenefitsViewModel();

  const {data} = states;
  return <BenefitsView data={data} />;
};

export default Benefits;
