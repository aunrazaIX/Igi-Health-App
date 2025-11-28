import {useState} from 'react';

const useProfileViewModel = () => {
  const [inputDisable, setInputDisable] = useState(false);
  const [editable, setEditable] = useState(false);

  const handleEdit = () => {
    setInputDisable(true);
    setEditable(true);
  };

  const handleSave = () => {
    setInputDisable(false);
    setEditable(false);
  };

  const ProfileData = [
    {
      label: 'Full Name',
      value: 'abc abvc',
      placeholder: 'Enter Name',
    },
    {
      label: 'CNIC Number',
      value: 'abc abvc',
      placeholder: 'Enter CNIC',
    },
    {
      label: 'Your Email',
      value: 'abc abvc',
      placeholder: 'Enter Email',
    },
  ];

  return {
    states: {
      ProfileData,
      inputDisable,
      editable,
    },
    functions: {
      handleEdit,
      handleSave,
    },
  };
};

export default useProfileViewModel;
