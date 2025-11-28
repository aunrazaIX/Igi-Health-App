import React from 'react';
import BenefitsView from '../../views/BenefitsView';
import useBenefitsViewModel from '../../viewmodels/useBenefitsViewModel';

const Benefits = () => {
  const {states, functions} = useBenefitsViewModel();
  const {data, benefitsloading, selectedTab, modalVisible} = states;
  const {goBack, onPressTab, setModalData} = functions;

  return (
    <BenefitsView
      benefitsloading={benefitsloading}
      data={data}
      goBack={goBack}
      selectedTab={selectedTab}
      onPressTab={onPressTab}
      modalVisible={modalVisible}
      setModalData={setModalData}
    />
  );
};

export default Benefits;
