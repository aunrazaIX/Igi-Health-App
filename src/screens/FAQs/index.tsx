import React from 'react'
import FAQsView from '../../views/FAQsView'
import useFAQsViewModel from '../../viewmodels/useFAQsViewModel'

const FAQs = () => {
    const {functions, states} = useFAQsViewModel();
    const {faqsData} = states;
    const {toggleAccordion} = functions;
  return (
    <FAQsView faqsData={faqsData} toggleAccordion={toggleAccordion}/>
  )
}

export default FAQs