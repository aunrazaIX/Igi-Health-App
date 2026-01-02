import {useState} from 'react';
import {useSelector} from 'react-redux';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';

const useAccountDetailsViewModel = () => {
  const {user} = useSelector(state => state.auth);
  const [data, setData] = useState(null);
  const {loading} = useApiHook({
    apiEndpoint: endpoints.account.getBankDetails(user?.cnic),
    method: 'get',
    onSuccess: res => {
      setData([
        {
          label: 'Bank Name',
          value: res?.data?.bankName
            ? res?.data?.bankName?.trim() || '--'
            : '--',
        },
        {
          label: 'Full Name',
          value: res?.data?.memberName
            ? res?.data?.memberName?.trim() || '--'
            : '--',
        },
        {
          label: 'Account Number',
          value: res?.data?.bankacckey
            ? res?.data?.bankacckey?.trim() || '--'
            : '--',
        },
        {
          label: 'IBAN',
          value: res?.data?.iban ? res?.data?.iban?.trim() || '--' : '--',
        },
      ]);
    },
  });

  return {
    states: {data, loading},
  };
};

export default useAccountDetailsViewModel;
