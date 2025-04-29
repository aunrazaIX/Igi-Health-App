import React from 'react'
import useHelplineViewModel from '../../viewmodels/useHelplineViewModel';
import HelplineView from '../../views/HelplineView';

const Helpline = () => {
    const { states , functions} = useHelplineViewModel();
    const {contactInfo, claimAssistance, hotlines} = states;
    const {goBack} = functions
  return (
    <HelplineView goBack = {goBack} contactInfo={contactInfo} claimAssistance={claimAssistance} hotlines={hotlines}/>
  )
}

export default Helpline