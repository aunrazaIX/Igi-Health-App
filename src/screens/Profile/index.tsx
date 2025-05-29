import React from 'react'
import ProfileView from '../../views/Profile'
import useProfileViewModel from '../../viewmodels/useProfileViewModel';

const Profile = () => {
    const { states, functions } = useProfileViewModel();
    const { ProfileData, inputDisable, editable } = states;
    const { handleEdit, handleSave } = functions
    return (
        <ProfileView
            ProfileData={ProfileData}
            inputDisable={inputDisable}
            handleEdit={handleEdit}
            editable={editable}
            handleSave={handleSave}
        />
    )
}

export default Profile