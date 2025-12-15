import {useState} from 'react';
import { useSelector } from 'react-redux';

const useProfileViewModel = () => {
  const [inputDisable, setInputDisable] = useState(false);
  const [editable, setEditable] = useState(false);
  const user = useSelector((state) => state.auth.user);
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
      value: user?.memberName,
      placeholder: 'Enter Name',
    },
    {
      label: 'CNIC Number',
      value: user?.cnic,
      placeholder: 'Enter CNIC',
    },
    {
      label: 'Your Email',
      value: user?.email,
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
