import {useState} from 'react';
import {useSelector} from 'react-redux';

type UseProfileViewModel = {
  states: {
    ProfileData: Data[];
    inputDisable: boolean;
    editable: boolean;
  };
  functions: {
    handleEdit: () => void;
    handleSave: () => void;
  };
};

type Data = {
  label: string;
  value: string;
  placeholder: string;
};

const useProfileViewModel = (): UseProfileViewModel => {
  const [inputDisable, setInputDisable] = useState(false);
  const [editable, setEditable] = useState(false);

  const {user} = useSelector(state => state.auth);

  const handleEdit = () => {
    setInputDisable(true);
    setEditable(true);
  };

  const handleSave = () => {
    setInputDisable(false);
    setEditable(false);
  };
  const ProfileData: Data[] = [
    {
      label: 'Full Name',
      value: user.UserName,
      placeholder: 'Enter Name',
    },
    {
      label: 'CNIC Number',
      value: user.cnic,
      placeholder: 'Enter cnin',
    },
    {
      label: 'Your Email',
      value: user.UserEmail,
      placeholder: 'Enter Email',
    },
    // {
    //   label: 'Mobile Number',
    //   value: '+920000000000',
    // },
    // {
    //   label: 'Gender',
    //   value: 'Male',
    // },
    // {
    //   label: 'Date of Birth',
    //   value: '23/12/1980',
    // },
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
