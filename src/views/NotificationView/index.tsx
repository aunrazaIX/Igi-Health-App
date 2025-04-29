import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  AileronBold,
  AileronRegular,
  AileronSemiBold,
  CurvedView,
  TopView,
} from '../../components';
import {icons} from '../../assets';
import styles from './styles';

const NotificationView = ({goBack}: {goBack: () => void}) => {
  return (
    <>
      <TopView
        title="Notification"
        onPressBack={goBack}
        TopViewSideIcon={icons.notificationPlan}
        containerStyleIcon={styles.BellIcon}
      />
      <CurvedView>
        <View style={styles.notificationRow}>
          <View style={styles.notificationSelectRow}>
            <AileronBold
              name="Notifications"
              style={styles.notificationTittle}
            />
            <TouchableOpacity style={styles.unreadselectRow}>
              <AileronSemiBold name="Unread" style={styles.unread} />
              <Image
                source={icons.arrowDownNotification}
                style={styles.unreadArrow}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.markAsRow}>
            <AileronBold name="Mark all as read" style={styles.markAs} />
            <Image source={icons.notificationCheck} style={styles.checkIcon} />
          </View>
        </View>
      </CurvedView>
    </>
  );
};

export default NotificationView;
