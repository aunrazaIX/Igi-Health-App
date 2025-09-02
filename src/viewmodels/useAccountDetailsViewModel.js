import {useSelector} from 'react-redux';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import {useState} from 'react';

const useAccountDetailsViewModel = () => {
  const {user} = useSelector(state => state.auth);
  const [data, setData] = useState([]);

  const {
    data: details,
    loading,
    error,
  } = useApiHook({
    apiEndpoint: endpoints.bank.getBankDetails,
    method: 'get',
    argsOrBody: {
      cnic: user?.cnic,
      ClientCode: user?.ClientCode,
    },
    onSuccess: res =>
      setData([
        {label: 'Bank Name', value: res.Data?.Bankname?.trim() ?? '--'},
        {label: 'Full Name', value: res.Data?.lgivname?.trim() ?? '--'},
        {label: 'Account Number', value: res.Data?.bankacckey?.trim() ?? '--'},
        {label: 'IBAN', value: res.Data.IBAN?.trim() ?? '--'},
      ]),
  });

  return {
    states: {data, loading},
    functions: {},
  };
};

export default useAccountDetailsViewModel;
