import {Image, TouchableOpacity, View, FlatList} from 'react-native';
import {Fragment} from 'react';
import {
  AileronBold,
  AileronRegular,
  AileronSemiBold,
  CurvedView,
  TopView,
} from '../../components';
import {icons} from '../../assets';
import styles from './styles';
import moment from 'moment';
import NoDataView from '../../components/NoDataView';
import SimpleLoader from '../../components/SimpleLoader';
import {COLORS} from '../../assets/theme/colors';

const NotificationView = ({
  data,
  loading,
  selectedType,
  types,
  onSelectType,
  showDropDown,
  onPressTypeDropDown,
}) => {
  const renderNotifications = ({item, index}) => {
    const lastIndex = index === data.length - 1;
    return (
      <View
        style={[
          styles.notificationContainer,
          lastIndex && {borderBottomWidth: 0},
        ]}>
        <View style={styles.notificationIconRow}>
          <Image source={icons.notificationIcon} style={styles.icon} />
          <View>
            <AileronSemiBold
              style={styles.requestTittle}
              name={item.PushNotificationHead}
            />
            <AileronRegular
              style={styles.notificationBody}
              name={item?.PushNotificationText}
            />
            <AileronSemiBold
              style={styles.date}
              name={moment(item?.PushNotificationDate).format(
                'DD-MMM YYYY hh:mm',
              )}
            />
            {!item?.isRead && (
              <TouchableOpacity style={styles.markAsReadView}>
                <AileronSemiBold
                  style={styles.markAseadText}
                  name={'Mark as Read'}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View></View>
      </View>
    );
  };

  return (
    <Fragment>
      <TopView
        title="Notifications"
        TopViewFirstIcon={icons.notificationPlan}
        containerStyleIcon={styles.BellIcon}
      />
      <CurvedView>
        <View style={styles.notificationRow}>
          <View style={styles.notificationSelectRow}>
            <AileronBold
              name="Notifications"
              style={styles.notificationTittle}
            />
            <TouchableOpacity
              onPress={() => onPressTypeDropDown()}
              style={styles.unreadselectRow}>
              <AileronSemiBold name={selectedType} style={styles.unread} />
              <Image
                source={
                  showDropDown
                    ? icons.selectArrowUp
                    : icons.arrowDownNotification
                }
                style={styles.unreadArrow}
              />
            </TouchableOpacity>

            {showDropDown && (
              <View style={styles.dropdown}>
                <FlatList
                  data={types}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => onSelectType(item)}>
                      <AileronBold name={item} style={styles.listText} />
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
        </View>
        <FlatList
          data={
            selectedType == 'All'
              ? data
              : selectedType == 'Read'
              ? data?.filter(record => record?.isRead)
              : data?.filter(record => !record?.isRead)
          }
          ListFooterComponent={
            loading && <SimpleLoader color={COLORS.loginButton} />
          }
          ListEmptyComponent={
            !loading && <NoDataView name={'No Notification Found'} />
          }
          keyExtractor={item => item?.PushNotificationID?.toString()}
          renderItem={renderNotifications}
          contentContainerStyle={styles.notificationStyles}
        />
      </CurvedView>
    </Fragment>
  );
};

export default NotificationView;
