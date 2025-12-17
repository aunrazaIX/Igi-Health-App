import {useCallback, useMemo, useState} from 'react';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import {useFocusEffect} from '@react-navigation/native';

const useNotificationsViewModel = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const types = useMemo(() => ['All', 'Read', 'Unread'], []);

  const {trigger, loading, data} = useApiHook({
    apiEndpoint: endpoints.notifications.getAll,
    method: 'post',
    argsOrBody: {
      pagination: {
        isAllRecord: true,
      },
    },
  });
  const apiData = data?.data?.dataList;
  useFocusEffect(
    useCallback(() => {
      trigger();
    }, []),
  );

  const {trigger: markRead, loading: markLoading} = useApiHook({
    apiEndpoint: endpoints.notifications.markAsRead(selectedNotification),
    method: 'post',
    onSuccess: () => {
      trigger();
      setSelectedNotification(null);
    },
  });

  const onPressMarkNotification = notificationId => {
    setSelectedNotification(notificationId);
    markRead();
  };

  const onSelectType = type => {
    setSelectedType(type);
    setShowDropDown(false);
  };

  const onPressTypeDropDown = () => setShowDropDown(!showDropDown);

  return {
    states: {
      data: apiData,
      loading,
      markLoading,
      types,
      showDropDown,
      selectedType,
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
