import {useState} from 'react';

const useAccountDetailsViewModel = () => {
  const [data, setData] = useState([
    {label: 'Bank Name', value: '--'},
    {label: 'Full Name', value: '--'},
    {label: 'Account Number', value: '--'},
    {label: 'IBAN', value: '--'},
  ]);

  return {
    states: {data},
    functions: {},
  };
};

export default useAccountDetailsViewModel;
