import React from 'react';
import BenefitsView from '../../views/BenefitsView';
import useBenefitsViewModel from '../../viewmodels/useBenefitsViewModel';

const Benefits = () => {
  const {states, functions} = useBenefitsViewModel();
  const {data, benefitsloading} = states;
  const {goBack} = functions;

  return (
    <BenefitsView
      benefitsloading={benefitsloading}
      data={data}
      goBack={goBack}
    />
  );
};

export default Benefits;
