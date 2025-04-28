import React from 'react'
import useHelplineViewModel from '../../viewmodels/useHelplineViewModel';
import HelplineView from '../../views/HelplineView';

const Helpline = () => {
    const { states} = useHelplineViewModel();
    const {contactInfo, claimAssistance, hotlines} = states;
  return (
    <HelplineView contactInfo={contactInfo} claimAssistance={claimAssistance} hotlines={hotlines}/>
  )
}

export default Helpline