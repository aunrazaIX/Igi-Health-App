import React from 'react';
import BenefitsView from '../../views/BenefitsView';
import useBenefitsViewModel from '../../viewmodels/useBenefitsViewModel';

const Benefits = () => {
  const {states, functions} = useBenefitsViewModel();
  const {data, benefitsloading, selectedTab} = states;
  const {goBack, onPressTab} = functions;

  return (
    <BenefitsView
      benefitsloading={benefitsloading}
      data={data}
      goBack={goBack}
      selectedTab={selectedTab}
      onPressTab={onPressTab}
    />
  );
};

export default Benefits;
