import React from 'react';
import BenefitsView from '../../views/BenefitsView';
import useBenefitsViewModel from '../../viewmodels/useBenefitsViewModel';

const Benefits = ({navigation}) => {
  const {states} = useBenefitsViewModel({navigation});

  const {data} = states;
  return <BenefitsView data={data} />;
};

export default Benefits;
