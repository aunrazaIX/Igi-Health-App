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
  selectedNotification,
  onPressMarkNotification,
  markLoading,
}) => {
  const renderNotifications = ({item, index}) => {
    const lastIndex = index === data.length - 1;
    return (
      <View
        style={[
          styles.notificationContainer,
          lastIndex && {borderBottomWidth: 0},
          !item?.isRead && {backgroundColor: COLORS.loginButtonLight + '22'},
        ]}>
        <View style={styles.notificationIconRow}>
          <View style={styles.circleView}>
            <Image
              style={styles.notificationIcon}
              source={icons.notification}
            />
          </View>
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
              <Fragment>
                {item?.PushNotificationID == selectedNotification &&
                markLoading ? (
                  <SimpleLoader
                    style={styles.simpleLoading}
                    color={COLORS.loginButton}
                    size={'small'}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      onPressMarkNotification(item?.PushNotificationID)
                    }
                    style={styles.markAsReadView}>
                    <AileronSemiBold
                      style={styles.markAseadText}
                      name={'Mark as Read'}
                    />
                  </TouchableOpacity>
                )}
              </Fragment>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <Fragment>
      <TopView title="Notifications" containerStyleIcon={styles.BellIcon} />
      <CurvedView>
        <View style={styles.notificationRow}>
          <View style={styles.notificationSelectRow}>
            <AileronBold name="Filter" style={styles.notificationTittle} />
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
                  indicatorStyle="black"
                  data={types}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => onSelectType(item)}>
                      <AileronRegular name={item} style={styles.listText} />
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
        </View>
        <FlatList
          indicatorStyle="black"
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
