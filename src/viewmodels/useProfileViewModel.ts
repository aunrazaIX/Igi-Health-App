import {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

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

  const user = useSelector((state: RootState) => state.auth.user);

  const handleEdit = () => {
    setInputDisable(true);
    setEditable(true);
  };

  const handleSave = () => {
    setInputDisable(false);
    setEditable(false);
  };

  const ProfileData: Data[] = user
    ? [
        {
          label: 'Full Name',
          value: user.UserName,
          placeholder: 'Enter Name',
        },
        {
          label: 'CNIC Number',
          value: user.cnic,
          placeholder: 'Enter CNIC',
        },
        {
          label: 'Your Email',
          value: user.UserEmail,
          placeholder: 'Enter Email',
        },
      ]
    : [];

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
