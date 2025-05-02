import { Image, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import { AileronBold, AileronSemiBold, CurvedView, TopView } from '../../components'
import { icons } from '../../assets'
import styles from './styles'





type Props = {
  NotificationData: Item[];
  selectData: SelectData[];
  goBack: () => void
}

type Item = {
  id: number;
  title: string;
  time: string;
}

type SelectData = {
  id: number;
  name: string;
}


const NotificationView: React.FC<Props> = ({ NotificationData, selectData, goBack }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);


  const renderNotifications = ({ item, index }: { item: Item, index: number }) => {
    const lastIndex = index === NotificationData.length - 1
    return (
      <View
        style={[styles.notificationContainer, lastIndex && { borderBottomWidth: 0 }]}

      >
        <View style={styles.notificationIconRow}>
          <Image source={icons.notificationIcon} style={styles.icon} />
          <View style={styles.claimRow}>
            <AileronSemiBold style={styles.requestTittle} name={item.title} />
          </View>
        </View>
        <View>
          <AileronSemiBold style={styles.date} name={item.time} />
        </View>
      </View>
    )
  }

  const handleSelect = (item: SelectData) => {
    setSelectedItem(item.name);
    setDropdownVisible(false);
  };

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
            <AileronBold name='Notifications' style={styles.notificationTittle} />
            <View style={{ position: 'relative' }}>
              <TouchableOpacity style={styles.unreadselectRow} onPress={() => setDropdownVisible(!isDropdownVisible)}>
                <AileronSemiBold name={selectedItem || 'Select'} style={styles.unread} />
                <Image source={isDropdownVisible ? icons.selectArrowUp : icons.arrowDownNotification} style={styles.unreadArrow} />
              </TouchableOpacity>

              {isDropdownVisible && (
                <View style={styles.dropdown}>
                  <FlatList
                    data={selectData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => handleSelect(item)}
                      >
                        <AileronBold name={item.name} style={styles.listText} />
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>
          </View>
          <View style={styles.markAsRow}>
            <AileronBold name='Mark all as read' style={styles.markAs} />
            <Image source={icons.notificationCheck} style={styles.checkIcon} />
          </View>
        </View>
        <FlatList
          data={NotificationData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNotifications}
        />
      </CurvedView>
    </>
  );
};

export default NotificationView;
