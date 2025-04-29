import { Image, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import { AileronBold, AileronSemiBold, CurvedView, TopView } from '../../components'
import { icons } from '../../assets'
import styles from './styles'



const renderNotifications = ({ item }: { item: Item, index: number }) => {
  return (
    <View style={[styles.notificationContainer,]}>
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

type Props = {
  data: Item[];
  selectData: SelectItem[];
}

type Item = {
  id: number;
  title: string;
  time: string;
}

type SelectItem = {
  id: number;
  name: string;
}



const NotificationView: React.FC<Props> = ({ data, selectData }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleSelect = (item: SelectItem) => {
    setSelectedItem(item.name);
    setDropdownVisible(false);
  };
  console.log('selectedItem', selectedItem)
  return (
    <>
      <TopView
        title="Notification"
        // onPressBack={goBack}
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
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNotifications}
        />
      </CurvedView>
    </>
  );
};

export default NotificationView;
