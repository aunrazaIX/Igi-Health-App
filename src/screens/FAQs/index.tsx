import React from 'react';
import FAQsView from '../../views/FAQsView';
import useFAQsViewModel from '../../viewmodels/useFAQsViewModel';

const FAQs = () => {
  const {functions, states} = useFAQsViewModel();
  const {faqsData} = states;
  const {toggleAccordion, goBack} = functions;
  return <FAQsView goBack ={goBack} faqsData={faqsData} toggleAccordion={toggleAccordion} />;
};

export default FAQs;
