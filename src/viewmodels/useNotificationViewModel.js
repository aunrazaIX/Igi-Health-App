import {useMemo, useState} from 'react';

const useNotificationsViewModel = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedNotification, setSelectedNotification] = useState(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      PushNotificationHead: 'Claim Approved',
      PushNotificationText: 'Your medical claim has been approved.',
      isRead: false,
      PushNotificationDate: '2025-01-05',
    },
    {
      id: 2,
      PushNotificationHead: 'New Hospital Added',
      PushNotificationText: 'A new panel hospital has been added to your network.',
      isRead: true,
      PushNotificationDate: '2025-01-02',
    },
    {
      id: 3,
      PushNotificationHead: 'Document Required',
      PushNotificationText: 'Please upload missing documents for your recent claim.',
      isRead: false,
      PushNotificationDate: '2025-01-01',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [markLoading, setMarkLoading] = useState(false);
  const types = useMemo(() => ['All', 'Read', 'Unread'], []);

  const filteredNotifications = useMemo(() => {
    if (selectedType === 'All') return notifications;
    if (selectedType === 'Read') return notifications.filter(n => n.isRead);
    if (selectedType === 'Unread') return notifications.filter(n => !n.isRead);
  }, [notifications, selectedType]);

  const onPressMarkNotification = notificationId => {
    setSelectedNotification(notificationId);
    setMarkLoading(true);

    setTimeout(() => {
      setNotifications(prev =>
        prev.map(item =>
          item.id === notificationId ? {...item, isRead: true} : item,
        ),
      );
      setMarkLoading(false);
    }, 600);
  };
  const onSelectType = type => {
    setSelectedType(type);
    setShowDropDown(false);
  };

  const onPressTypeDropDown = () => setShowDropDown(!showDropDown);

  return {
    states: {
      data: filteredNotifications,
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
