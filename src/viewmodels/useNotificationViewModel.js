import {useSelector} from 'react-redux';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {useMemo, useState} from 'react';

const useNotificationsViewModel = () => {
  const {user} = useSelector(state => state.auth);
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedType, setSelectedType] = useState('All');
  const types = useMemo(() => {
    return ['All', 'Read', 'Unread'];
  }, []);
  const {data, loading} = useApiHook({
    apiEndpoint: endpoints.notifications.getAll,
    argsOrBody: {
      cnic: '42301-6974801-1',
      userid: '906',
    },
  });

  const onSelectType = type => {
    setSelectedType(type);
    setShowDropDown(false);
  };

  const onPressTypeDropDown = () => setShowDropDown(!showDropDown);

  return {
    states: {
      data,
      loading,
      types,
      showDropDown,
      selectedType,
    },
    functions: {
      onSelectType,
      onPressTypeDropDown,
    },
  };
};
export default useNotificationsViewModel;
