import React from 'react'
import SettingsView from '../../views/SettingsView'
import useSettingsViewModel from '../../viewmodels/useSettingsViewModel';

const Settings = () => {
    const { states, functions} = useSettingsViewModel();
    const {data, isToggle} = states;
    const {toggleSwitch} = functions;
  return (
    <SettingsView data={data} isToggle={isToggle} toggleSwitch={toggleSwitch}/>
  )
}

export default Settings