import {useSelector} from 'react-redux';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {useMemo, useState} from 'react';

const useNotificationsViewModel = () => {
  const {user} = useSelector(state => state.auth);
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedNotification, setSelectedNotification] = useState(null);

  const types = useMemo(() => {
    return ['All', 'Read', 'Unread'];
  }, []);
  const {
    data,
    loading,
    trigger: reftchAllNotifications,
  } = useApiHook({
    apiEndpoint: endpoints.notifications.getAll,
    method: 'get',
    argsOrBody: {
      cnic: user?.cnic,
      userid: user?.UserId,
    },
  });

  const {trigger, loading: markLoading} = useApiHook({
    apiEndpoint: endpoints.notifications.markAsRead,
    method: 'post',
    onSuccess: () => {
      reftchAllNotifications();
    },
  });

  const onPressMarkNotification = notificationId => {
    setSelectedNotification(notificationId);
    let apiData = {
      cnic: user?.cnic,
      userid: user?.UserId,
      id: notificationId,
    };
    trigger(apiData);
  };

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
      markLoading,
      selectedNotification,
    },
    functions: {
      onSelectType,
      onPressTypeDropDown,
      onPressMarkNotification,
    },
  };
};
export default useNotificationsViewModel;
