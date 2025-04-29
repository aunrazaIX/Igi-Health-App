import {View, Text} from 'react-native';
import React from 'react';
import NotificationView from '../../views/NotificationView';
import {useNotificationViewModel} from '../../viewmodels/useNotificationViewModel';

const Notification = () => {
  const {functions} = useNotificationViewModel();
  const {goBack} = functions;

  return <NotificationView goBack={goBack} />;
};

export default Notification;
