import {useState} from 'react';
import {useSelector} from 'react-redux';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';

const useAccountDetailsViewModel = () => {
  const {user} = useSelector(state => state.auth);
  const [data, setData] = useState([]);
  const {data: details, loading} = useApiHook({
    apiEndpoint: endpoints.account.getBankDetails(user?.cnic),
    method: 'get',
    onSuccess: res => {
      const formatted = res?.data?.flatMap((item, index) => [
        {label: 'Bank Name', value: item?.bankName?.trim() || '--'},
        {label: 'Full Name', value: item?.memberName?.trim() || '--'},
        {label: 'Account Number', value: item?.bankacckey?.trim() || '--'},
        {label: 'IBAN', value: item?.iban?.trim() || '--'},
        {type: 'divider', key: index},
      ]);

      setData(formatted);
    },
  });
  return {
    states: {data, loading},
  };
};

export default useAccountDetailsViewModel;
