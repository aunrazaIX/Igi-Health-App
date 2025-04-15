import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {AileronBold, CurvedView, TopView} from '../../components';
import {icons} from '../../assets';
import {styles} from './style';
import DetailsContainer from '../../components/DetailsContainer';
import {vh} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';

type HomeViewProps = {
  selectedTab: string;
  selectedTabRight: string;
  selectedMapTab: string;
  onPressTab: (tab: string) => void;
  onPressRightTab: (tab: string) => void;
  onPressMapTab: (tab: string) => void;
};

const PanelHospitalListView: React.FC<HomeViewProps> = ({
  selectedTab,
  onPressTab,
  onPressRightTab,
  selectedMapTab,
  selectedTabRight,
  onPressMapTab,
}) => {
  return (
    <>
      <TopView
        title="Hospitals"
        HeaderIcon={icons.search}
        HeaderSecondIcon={null}
      />

      <CurvedView>
        <View style={styles.infoContainerHeader}>
          <View style={styles.infoContainerHeaderRight}>
            <TouchableOpacity
              onPress={() => onPressRightTab('list')}
              style={[
                styles.rightTab,
                selectedTabRight === 'list' && styles.activeTabRight,
              ]}>
              {selectedTabRight === 'list' ? (
                <Image source={icons.listActive} />
              ) : (
                <Image source={icons.listIcon} />
              )}

              <AileronBold
                style={[
                  styles.infoContainerHeaderText,
                  selectedTabRight === 'list' && styles.activeTabRightText,
                ]}
                name="List"
                numberOfLines={1}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.rightTab,
                selectedTabRight === 'map' && styles.activeTabRight,
              ]}
              onPress={() => onPressRightTab('map')}>
              {selectedTabRight === 'map' ? (
                <Image source={icons.map} />
              ) : (
                <Image source={icons.mapInactive} />
              )}

              <AileronBold
                style={[
                  styles.infoContainerHeaderText,
                  selectedTabRight === 'map' && styles.activeTabRightText,
                ]}
                name="Map"
                numberOfLines={1}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainerHeaderTabs}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'Panel Hospitals' && styles.activeTab,
              ]}
              onPress={() => onPressTab('Panel Hospitals')}>
              {selectedTab === 'Panel Hospitals' ? (
                <Image source={icons.hospital} />
              ) : (
                <Image source={icons.hospitalInactive} />
              )}

              <AileronBold
                style={[
                  styles.tabText,
                  selectedTab === 'Panel Hospitals' && styles.activeTabText,
                ]}
                name="Panel Hospitals"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'Discounted Centers' && styles.activeTab,
              ]}
              onPress={() => onPressTab('Discounted Centers')}>
              {selectedTab === 'Discounted Centers' ? (
                <Image source={icons.labsActive} />
              ) : (
                <Image source={icons.labsInactive} />
              )}

              <AileronBold
                style={[
                  styles.tabText,
                  selectedTab === 'Discounted Centers' && styles.activeTabText,
                ]}
                name="Discounted Centers"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.mapTextContainer}>
            <AileronBold style={style.mapText} name="Search By">
              {' '}
            </AileronBold>
            <AileronBold style={style.mapTextColor} name="Province">
              {' '}
            </AileronBold>
          </View>

          <View style={styles.mapTabsContainer}>
            <TouchableOpacity
              onPress={() => onPressMapTab('Sindh')}
              style={
                selectedMapTab === 'Sindh' ? styles.mapTabActive : styles.mapTab
              }>
              <View>
                {selectedMapTab === 'Sindh' ? (
                  <Image
                    style={styles.mapTabIcon}
                    source={icons.mapLoacationActive}
                  />
                ) : (
                  <Image
                    style={styles.mapTabIcon}
                    source={icons.mapLoacationInActive}
                  />
                )}
              </View>

              <View>
                {selectedMapTab === 'Sindh' ? (
                  <AileronBold style={style.mapTabTextActive} name="Sindh">
                    {' '}
                  </AileronBold>
                ) : (
                  <AileronBold style={style.mapTabText} name="Sindh">
                    {' '}
                  </AileronBold>
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onPressMapTab('Punjab')}
              style={
                selectedMapTab === 'Punjab'
                  ? styles.mapTabActive
                  : styles.mapTab
              }>
              <View>
                {selectedMapTab === 'Punjab' ? (
                  <Image
                    style={styles.mapTabIcon}
                    source={icons.mapLoacationActive}
                  />
                ) : (
                  <Image
                    style={styles.mapTabIcon}
                    source={icons.mapLoacationInActive}
                  />
                )}
              </View>

              <View>
                {selectedMapTab === 'Punjab' ? (
                  <AileronBold style={style.mapTabTextActive} name="Punjab">
                    {' '}
                  </AileronBold>
                ) : (
                  <AileronBold style={style.mapTabText} name="Punjab">
                    {' '}
                  </AileronBold>
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onPressMapTab('Balochistan')}
              style={
                selectedMapTab === 'Balochistan'
                  ? styles.mapTabActive
                  : styles.mapTab
              }>
              <View>
                {selectedMapTab === 'Balochistan' ? (
                  <Image
                    style={styles.mapTabIcon}
                    source={icons.mapLoacationActive}
                  />
                ) : (
                  <Image
                    style={styles.mapTabIcon}
                    source={icons.mapLoacationInActive}
                  />
                )}
              </View>

              <View>
                {selectedMapTab === 'Balochistan' ? (
                  <AileronBold
                    style={style.mapTabTextActive}
                    name="Balochistan">
                    {' '}
                  </AileronBold>
                ) : (
                  <AileronBold style={style.mapTabText} name="Baluchistan">
                    {' '}
                  </AileronBold>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </CurvedView>
    </>
  );
};

export default PanelHospitalListView;

const style = StyleSheet.create({
  detailsTextLabel: {
    width: '20%',
    textAlign: 'left',
  },

  detailsTextValue: {
    width: '60%',
    textAlign: 'right',
  },

  detailsText: {},
  mapText: {
    fontSize: vh * 2.5,
    color: COLORS.black,
  },
  mapTextColor: {
    color: COLORS.cardBackgroundRed,
    fontSize: vh * 2.5,
  },
  mapTabText: {
    fontSize: vh * 1.3,
    color: COLORS.black,
  },
  mapTabTextActive: {
    fontSize: vh * 1.3,
    color: COLORS.white,
  },
});
